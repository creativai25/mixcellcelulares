// Função serverless (Vercel) — busca preço e fotos AO VIVO no Mercado Livre.
// Uso: GET /api/ml-item?id=MLB1040287808  (ou ?ids=MLB1,MLB2,...)
//
// Variáveis de ambiente necessárias (Vercel → Settings → Environment Variables):
//   ML_CLIENT_ID      = App ID do app de desenvolvedor do Mercado Livre
//   ML_CLIENT_SECRET  = Client Secret do mesmo app
//
// Usa o fluxo Client Credentials (sem login de usuário) para acessar dados
// públicos do item. O segredo NUNCA vai para o navegador — fica só aqui no servidor.

const TOKEN_URL = 'https://api.mercadolibre.com/oauth/token';
const ITEM_URL = (id) => `https://api.mercadolibre.com/items/${id}`;

// Cache em memória (sobrevive entre chamadas enquanto a função fica "quente")
let tokenCache = { value: null, exp: 0 };
const itemCache = new Map(); // id -> { data, exp }
const ITEM_TTL_MS = 10 * 60 * 1000; // 10 min

async function getToken() {
  const now = Date.now();
  if (tokenCache.value && now < tokenCache.exp) return tokenCache.value;

  const id = process.env.ML_CLIENT_ID;
  const secret = process.env.ML_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error('ML_CLIENT_ID/ML_CLIENT_SECRET não configurados nas variáveis de ambiente.');
  }

  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: id,
    client_secret: secret,
  });

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', accept: 'application/json' },
    body,
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Falha ao obter token (${res.status}): ${txt}`);
  }
  const json = await res.json();
  tokenCache = {
    value: json.access_token,
    exp: now + (json.expires_in ? (json.expires_in - 60) * 1000 : 5 * 60 * 1000),
  };
  return tokenCache.value;
}

async function fetchItem(id, token) {
  const cached = itemCache.get(id);
  if (cached && Date.now() < cached.exp) return cached.data;

  const res = await fetch(ITEM_URL(id), {
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
  });
  if (!res.ok) {
    let body = null;
    try { body = await res.json(); } catch { try { body = await res.text(); } catch {} }
    return { id, error: true, status: res.status, ml: body };
  }
  const it = await res.json();
  const data = {
    id: it.id,
    title: it.title,
    price: it.price,
    original_price: it.original_price ?? null,
    available_quantity: it.available_quantity ?? null,
    condition: it.condition ?? null,
    permalink: it.permalink ?? null,
    thumbnail: (it.thumbnail || '').replace('http://', 'https://'),
    pictures: Array.isArray(it.pictures)
      ? it.pictures.map((p) => (p.secure_url || p.url || '').replace('http://', 'https://')).filter(Boolean)
      : [],
  };
  itemCache.set(id, { data, exp: Date.now() + ITEM_TTL_MS });
  return data;
}

export default async function handler(req, res) {
  try {
    // Diagnóstico seguro: /api/ml-item?debug=1 — mostra se as chaves estão
    // presentes e o tamanho delas, SEM expor o segredo.
    if (req.query.debug) {
      const cid = process.env.ML_CLIENT_ID || '';
      const sec = process.env.ML_CLIENT_SECRET || '';
      res.status(200).json({
        client_id_value: cid, // App ID não é segredo
        client_id_len: cid.length,
        client_id_tem_espaco: cid !== cid.trim(),
        client_secret_presente: !!sec,
        client_secret_len: sec.length,
        client_secret_tem_espaco: sec !== sec.trim(),
        client_secret_preview: sec ? `${sec.slice(0, 3)}…${sec.slice(-2)}` : null,
      });
      return;
    }

    // Sonda: /api/ml-item?probe=MLBxxxx — testa vários endpoints e mostra
    // qual o ML libera (status + chaves do retorno), pra achar o caminho certo.
    if (req.query.probe) {
      const pid = String(req.query.probe);
      const token = await getToken();
      const endpoints = [
        `https://api.mercadolibre.com/items/${pid}`,
        `https://api.mercadolibre.com/products/${pid}`,
        `https://api.mercadolibre.com/products/${pid}/items`,
      ];
      const out = [];
      for (const u of endpoints) {
        try {
          const r = await fetch(u, { headers: { Authorization: `Bearer ${token}`, accept: 'application/json' } });
          let b = null;
          try { b = await r.json(); } catch {}
          out.push({
            url: u.replace(`/${pid}`, '/{id}'),
            status: r.status,
            keys: b && typeof b === 'object' && !Array.isArray(b) ? Object.keys(b).slice(0, 10) : Array.isArray(b) ? `array[${b.length}]` : null,
            msg: b && b.message ? b.message : null,
            price: b && (b.price ?? (b.buy_box_winner && b.buy_box_winner.price)) || null,
            pics: b && Array.isArray(b.pictures) ? b.pictures.length : null,
          });
        } catch (e) {
          out.push({ url: u, err: String(e.message || e) });
        }
      }
      res.status(200).json(out);
      return;
    }

    // Extrai a foto oficial (og:image) de um anúncio do ML, rodando no IP da
    // Vercel (que não está bloqueado). Uso: /api/ml-item?og=<url do anúncio>
    if (req.query.og) {
      const target = String(req.query.og);
      if (!/^https:\/\/(www\.mercadolivre\.com\.br|meli\.la)\//.test(target)) {
        res.status(400).json({ error: 'URL não permitida (só Mercado Livre).' });
        return;
      }
      const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
      const r = await fetch(target, { headers: { 'User-Agent': UA, accept: 'text/html' }, redirect: 'follow' });
      const html = await r.text();
      const og = (html.match(/og:image"\s+content="([^"]+)"/i) || [])[1] || null;
      const title = (html.match(/og:title"\s+content="([^"]+)"/i) || [])[1] || null;
      // pega também algumas imagens 2X da galeria (D_Q_NP_2X) como bônus
      const gallery = [...new Set((html.match(/https:\/\/http2\.mlstatic\.com\/D_Q_NP_2X_[A-Za-z0-9_-]+\.(?:webp|jpg)/g) || []))].slice(0, 8);
      res.status(200).json({ og, title, gallery });
      return;
    }

    const { id, ids } = req.query;
    const list = (ids ? String(ids).split(',') : id ? [String(id)] : [])
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 30);

    if (list.length === 0) {
      res.status(400).json({ error: 'Informe ?id=MLBxxxx ou ?ids=MLB1,MLB2' });
      return;
    }

    const token = await getToken();
    const results = await Promise.all(list.map((x) => fetchItem(x, token)));

    // Cache no edge/navegador por 10 min, revalidando em background por 1h
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=3600');
    res.status(200).json(list.length === 1 ? results[0] : results);
  } catch (err) {
    res.status(500).json({ error: String(err.message || err) });
  }
}

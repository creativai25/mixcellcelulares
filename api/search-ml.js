// Serverless function — busca na API do Mercado Livre com OAuth2 Client Credentials
// Uso: GET /api/search-ml?q=iphone+16&limit=12

const ML_AFF_TAG  = '9E98NU-BAUS';
const SEARCH_URL  = 'https://api.mercadolibre.com/sites/MLB/search';
const TOKEN_URL   = 'https://api.mercadolibre.com/oauth/token';

// Cache de resultados (5 min)
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000;

// Cache do access token e refresh token atualizado
let cachedToken = null;
let tokenExpiry = 0;
let currentRefreshToken = process.env.ML_REFRESH_TOKEN;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiry - 60_000) return cachedToken;

  const refreshToken = currentRefreshToken || process.env.ML_REFRESH_TOKEN;

  const params = refreshToken
    ? {
        grant_type: 'refresh_token',
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
        refresh_token: refreshToken,
      }
    : {
        grant_type: 'client_credentials',
        client_id: process.env.ML_CLIENT_ID,
        client_secret: process.env.ML_CLIENT_SECRET,
      };

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(params),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Token ML (${res.status}): ${errText}`);
  }

  const data = await res.json();
  cachedToken = data.access_token;
  tokenExpiry = Date.now() + data.expires_in * 1000;
  if (data.refresh_token) {
    currentRefreshToken = data.refresh_token;
  }
  return cachedToken;
}

function makeAffLink(permalink) {
  if (!permalink) return '#';
  try {
    const u = new URL(permalink);
    u.searchParams.set('from', 'affiliates');
    u.searchParams.set('affId', ML_AFF_TAG);
    return u.toString();
  } catch {
    return `${permalink}?from=affiliates&affId=${ML_AFF_TAG}`;
  }
}

function deliveryLabel(shipping) {
  if (!shipping) return null;
  const tags = shipping.tags || [];
  if (tags.includes('same_day')) return '⚡ Chegada hoje';
  if (tags.includes('next_day')) return '🚀 Chegada amanhã';
  if (tags.includes('fulfillment')) return '📦 Envio rápido';
  return null;
}

export default async function handler(req, res) {
  const q = String(req.query.q || '').trim();
  const limit = Math.min(Number(req.query.limit) || 12, 24);

  if (!q) {
    return res.status(400).json({ error: 'Parâmetro q é obrigatório.' });
  }

  const cacheKey = `${q}|${limit}`;
  const hit = cache.get(cacheKey);
  if (hit && Date.now() < hit.exp) {
    res.setHeader('X-Cache', 'HIT');
    return res.json(hit.data);
  }

  let json;
  try {
    const token = await getAccessToken();

    // Tenta com Authorization header (padrão OAuth2)
    let url = `${SEARCH_URL}?q=${encodeURIComponent(q)}&limit=${limit}&sort=relevance`;
    let mlRes = await fetch(url, {
      headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
    });

    // Fallback: passa o token como query param (padrão legado ML)
    if (mlRes.status === 403) {
      url = `${SEARCH_URL}?q=${encodeURIComponent(q)}&limit=${limit}&sort=relevance&access_token=${token}`;
      mlRes = await fetch(url, { headers: { accept: 'application/json' } });
    }

    if (!mlRes.ok) {
      json = { results: [] };
    } else {
      json = await mlRes.json();
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }

  const items = (json.results || []).map((it) => ({
    id: it.id,
    title: it.title,
    price: it.price,
    originalPrice: it.original_price ?? null,
    currency: it.currency_id ?? 'BRL',
    thumbnail: (it.thumbnail || '').replace('http://', 'https://').replace(/\/I\//, '/O/'),
    permalink: makeAffLink(it.permalink),
    freeShipping: it.shipping?.free_shipping ?? false,
    delivery: deliveryLabel(it.shipping),
    condition: it.condition === 'new' ? 'Novo' : it.condition === 'used' ? 'Usado' : null,
    soldQuantity: it.sold_quantity ?? 0,
    seller: it.seller?.nickname ?? '',
    installments: it.installments
      ? { quantity: it.installments.quantity, amount: it.installments.amount }
      : null,
  }));

  const payload = { items, total: json.paging?.total ?? 0, query: q };
  cache.set(cacheKey, { data: payload, exp: Date.now() + CACHE_TTL });

  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.setHeader('X-Cache', 'MISS');
  return res.json(payload);
}

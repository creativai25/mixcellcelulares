import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const ML_AFF_TAG     = '9E98NU-BAUS';
const ML_CLIENT_ID   = process.env.ML_CLIENT_ID     || '5746889296795765';
const ML_CLIENT_SECRET = process.env.ML_CLIENT_SECRET || '5Ip0zhbxbHMWETVfV2M3VsLk5uAhatF2';
const TOKEN_URL      = 'https://api.mercadolibre.com/oauth/token';

let _devToken  = null;
let _devExpiry = 0;

async function getDevToken() {
  if (_devToken && Date.now() < _devExpiry - 60_000) return _devToken;
  const r = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: ML_CLIENT_ID,
      client_secret: ML_CLIENT_SECRET,
    }),
  });
  if (!r.ok) throw new Error(`Token ML dev: ${r.status}`);
  const d = await r.json();
  _devToken  = d.access_token;
  _devExpiry = Date.now() + d.expires_in * 1000;
  return _devToken;
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

// Plugin que simula as Vercel serverless functions no dev
function apiPlugin() {
  return {
    name: 'api-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url, 'http://localhost');

        if (url.pathname === '/api/debug-token') {
          try {
            const token = await getDevToken();
            const mlRes = await fetch('https://api.mercadolibre.com/sites/MLB/search?q=celular&limit=1', {
              headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
            });
            const body = await mlRes.text();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ tokenOk: !!token, mlStatus: mlRes.status, mlBody: body.substring(0, 300) }));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        if (url.pathname === '/api/search-ml') {
          const q = url.searchParams.get('q') || '';
          const limit = Math.min(Number(url.searchParams.get('limit')) || 12, 24);

          if (!q) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Parâmetro q é obrigatório.' }));
            return;
          }

          try {
            const token = await getDevToken();
            const mlUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURIComponent(q)}&limit=${limit}&sort=relevance`;
            const mlRes = await fetch(mlUrl, {
              headers: { accept: 'application/json', Authorization: `Bearer ${token}` },
            });
            const json = await mlRes.json();

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
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(payload));
          } catch (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), apiPlugin()],
})

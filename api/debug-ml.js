// Endpoint temporário de diagnóstico — REMOVER após resolver
export default async function handler(req, res) {
  const clientId     = process.env.ML_CLIENT_ID     || '';
  const clientSecret = process.env.ML_CLIENT_SECRET || '';

  const info = {
    clientIdSet:     !!clientId,
    clientIdLength:  clientId.length,
    clientIdPreview: clientId.substring(0, 4) + '...',
    secretSet:       !!clientSecret,
    secretLength:    clientSecret.length,
    secretPreview:   clientSecret.substring(0, 4) + '...',
  };

  try {
    const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     clientId,
        client_secret: clientSecret,
      }),
    });
    const tokenBody = await tokenRes.text();
    return res.json({ info, tokenStatus: tokenRes.status, tokenBody });
  } catch (err) {
    return res.status(500).json({ info, error: err.message });
  }
}

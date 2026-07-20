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
    // 1. Pega o token
    const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     clientId,
        client_secret: clientSecret,
      }),
    });
    const tokenData = await tokenRes.json();
    const token = tokenData.access_token || '';

    // 2. Testa busca com Authorization header
    const s1 = await fetch(
      'https://api.mercadolibre.com/sites/MLB/search?q=celular&limit=1',
      { headers: { accept: 'application/json', Authorization: `Bearer ${token}` } }
    );
    const b1 = await s1.text();

    // 3. Testa busca com access_token na query
    const s2 = await fetch(
      `https://api.mercadolibre.com/sites/MLB/search?q=celular&limit=1&access_token=${token}`,
      { headers: { accept: 'application/json' } }
    );
    const b2 = await s2.text();

    return res.json({
      info,
      tokenStatus:   tokenRes.status,
      tokenOk:       !!token,
      search1_header: { status: s1.status, body: b1.substring(0, 200) },
      search2_query:  { status: s2.status, body: b2.substring(0, 200) },
    });
  } catch (err) {
    return res.status(500).json({ info, error: err.message });
  }
}

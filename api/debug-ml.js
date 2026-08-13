// Endpoint temporário de diagnóstico — REMOVER após resolver
export default async function handler(req, res) {
  const clientId      = process.env.ML_CLIENT_ID      || '';
  const clientSecret  = process.env.ML_CLIENT_SECRET  || '';
  const refreshToken  = process.env.ML_REFRESH_TOKEN  || '';

  const info = {
    clientIdSet:      !!clientId,
    clientIdPreview:  clientId.substring(0, 6) + '...',
    secretSet:        !!clientSecret,
    secretPreview:    clientSecret.substring(0, 4) + '...',
    refreshTokenSet:  !!refreshToken,
    refreshPreview:   refreshToken.substring(0, 10) + '...',
  };

  try {
    // 1a. Token via refresh_token (user token — tem mais permissões)
    const rtRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'refresh_token',
        client_id:     clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
      }),
    });
    const rtData  = await rtRes.json();
    const rtToken = rtData.access_token || '';

    // 1b. Token via client_credentials (app token — controle)
    const ccRes = await fetch('https://api.mercadolibre.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     clientId,
        client_secret: clientSecret,
      }),
    });
    const ccData  = await ccRes.json();
    const ccToken = ccData.access_token || '';

    // 2. Busca com user token (refresh)
    const s1 = await fetch(
      'https://api.mercadolibre.com/sites/MLB/search?q=celular&limit=1',
      { headers: { accept: 'application/json', Authorization: `Bearer ${rtToken}` } }
    );
    const b1 = await s1.text();

    // 3. Busca com app token (client_credentials)
    const s2 = await fetch(
      'https://api.mercadolibre.com/sites/MLB/search?q=celular&limit=1',
      { headers: { accept: 'application/json', Authorization: `Bearer ${ccToken}` } }
    );
    const b2 = await s2.text();

    // 4. User info do token de refresh (para confirmar identidade)
    const meRes = rtToken
      ? await fetch('https://api.mercadolibre.com/users/me', {
          headers: { Authorization: `Bearer ${rtToken}` },
        })
      : null;
    const meBody = meRes ? await meRes.text() : 'sem token';

    return res.json({
      info,
      userToken:  { status: rtRes.status, preview: rtToken.substring(0, 20) + '...' },
      appToken:   { status: ccRes.status, preview: ccToken.substring(0, 20) + '...' },
      search_userToken: { status: s1.status, body: b1.substring(0, 300) },
      search_appToken:  { status: s2.status, body: b2.substring(0, 300) },
      userMe: { status: meRes?.status, body: meBody.substring(0, 200) },
    });
  } catch (err) {
    return res.status(500).json({ info, error: err.message });
  }
}

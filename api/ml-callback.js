// Endpoint temporário para capturar o authorization code e trocar por tokens
// Acesse este endpoint UMA VEZ após autorizar o app no ML
// REMOVER após salvar o refresh_token nas env vars da Vercel

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const code = req.query.code;

  if (!code) {
    const redirectUri = encodeURIComponent('https://mixcellcelulares.shop/api/ml-callback');
    const authUrl = `https://auth.mercadolivre.com.br/authorization?response_type=code&client_id=${process.env.ML_CLIENT_ID}&redirect_uri=${redirectUri}`;
    return res.send(`
      <h2>Setup ML Auth</h2>
      <p>Clique no link abaixo para autorizar o app com sua conta do Mercado Livre:</p>
      <a href="${authUrl}" style="font-size:18px;font-weight:bold;color:#2968c8;">
        👉 Autorizar no Mercado Livre
      </a>
      <p style="margin-top:20px;font-size:12px;color:#666;">
        URL de Redirecionamento configurada: <code>https://mixcellcelulares.shop/api/ml-callback</code>
      </p>
    `);
  }

  // Troca o code pelo access_token + refresh_token
  const tokenRes = await fetch('https://api.mercadolibre.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     process.env.ML_CLIENT_ID,
      client_secret: process.env.ML_CLIENT_SECRET,
      code,
      redirect_uri:  'https://mixcellcelulares.shop/api/ml-callback',
    }),
  });

  const data = await tokenRes.json();

  if (!data.refresh_token) {
    return res.status(400).json({ error: 'Falhou', data });
  }

  return res.send(`
    <h2>✅ Autorização concluída!</h2>
    <p><strong>Copie o refresh_token abaixo</strong> e adicione na Vercel como variável de ambiente <code>ML_REFRESH_TOKEN</code>:</p>
    <textarea rows="4" cols="80" onclick="this.select()">${data.refresh_token}</textarea>
    <br><br>
    <p>access_token (expira em ${data.expires_in}s): <code>${data.access_token?.substring(0, 40)}...</code></p>
    <p>user_id: ${data.user_id}</p>
  `);
}

// GET /api/catalog — produtos adicionados via Telegram/n8n
// Lê da tabela catalog_afiliados no Supabase e retorna no mesmo formato
// que src/data/products.js espera.
export default async function handler(req, res) {
  const SUPA_URL = process.env.SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!SUPA_URL || !SUPA_KEY) {
    return res.status(500).json({ error: 'Supabase não configurado.' });
  }

  try {
    const r = await fetch(
      `${SUPA_URL}/rest/v1/catalog_afiliados?ativo=eq.true&order=created_at.desc`,
      {
        headers: {
          apikey: SUPA_KEY,
          Authorization: `Bearer ${SUPA_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!r.ok) throw new Error(`Supabase ${r.status}`);

    const rows = await r.json();

    const labelToSlug = {
      'Acessórios em Geral': 'acessorios',
      'Acessórios':          'acessorios',
      'Áudio':               'fones',
      'Carregadores':        'cabos',
      'Suportes':            'suportes',
      'Smartwatches':        'acessorios',
      'Câmeras':             'cameras',
      'Smartphones':         'celulares',
      'Películas':           'peliculas',
      'Capinhas':            'capinhas',
    };

    const products = rows.map((row) => ({
      id: row.id,
      slug: row.slug,
      name: row.nome,
      category: labelToSlug[row.categoria] || row.categoria,
      brand: row.marca || '',
      model: row.modelo || '',
      mlId: row.ml_id || null,
      specs: row.specs || [],
      description: row.descricao || '',
      badge: row.badge || 'Mix Cell indica',
      featured: row.destaque || false,
      image: row.imagem_url || null,
      imageAlt: row.nome,
      marketplaces: {
        [row.marketplace || 'mercadolivre']: {
          url: row.link_afiliado,
          preco: row.preco || 0,
          frete: 0,
          prazo: '',
          nota: row.nota || 0,
          best: true,
        },
      },
      crossSell: [],
      createdAt: row.created_at,
      active: row.ativo,
    }));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.json({ products, total: products.length });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

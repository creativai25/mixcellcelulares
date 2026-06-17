// Cada produto tem `mlId` (ID do item no Mercado Livre) usado pela API
// (api/ml-item) para buscar preço e fotos ao vivo. O campo `preco` é apenas
// um fallback usado quando a API não está disponível (ex.: dev local).
export const products = [
  {
    id: 1,
    slug: 'motorola-moto-g06',
    name: 'Motorola Moto G06 128GB',
    category: 'celulares',
    brand: 'Motorola',
    model: 'Moto G06',
    mlId: 'MLB4515672567',
    linha: 'motorola-g',
    specs: ['128GB', '4GB RAM (+8GB Boost)', 'Tela 6.9"', 'Câmera 50MP com IA', 'Bateria 5200mAh'],
    description: 'Entrada com bateria gigante de 5200mAh e tela grande de 6.9". Ótimo para quem quer um aparelho durável para o dia a dia sem gastar muito. Câmera de 50MP com IA que entrega bem em ambientes iluminados.',
    badge: 'Oferta',
    featured: false,
    image: null,
    imageAlt: 'Motorola Moto G06 na cor verde',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/1rWo5EC', preco: 630.00, frete: 0, prazo: 'Full', nota: 4.6, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 2,
    slug: 'samsung-galaxy-a17-5g',
    name: 'Samsung Galaxy A17 5G 256GB',
    category: 'celulares',
    brand: 'Samsung',
    model: 'Galaxy A17 5G',
    mlId: 'MLB54961626',
    linha: 'samsung-a',
    specs: ['256GB', '8GB RAM', 'Tela 6.7"', 'Câmera 50MP', '5G · NFC · IP54'],
    description: 'Intermediário 5G com bastante armazenamento (256GB) e proteção IP54 contra poeira e respingos. Tem NFC para pagamentos por aproximação. Nossa equipe gosta da linha A da Samsung pela facilidade de manutenção e durabilidade.',
    badge: 'Mix Cell indica',
    featured: true,
    image: 'https://http2.mlstatic.com/D_NQ_NP_702537-MLA100077733515_122025-O.webp',
    imageAlt: 'Samsung Galaxy A17 5G na cor cinza',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/21HNGDt', preco: 1556.00, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 3,
    slug: 'motorola-moto-g35-5g',
    name: 'Motorola Moto G35 5G 256GB',
    category: 'celulares',
    brand: 'Motorola',
    model: 'Moto G35 5G',
    mlId: 'MLB41540860',
    linha: 'motorola-g',
    specs: ['256GB', '4GB RAM (+8GB Boost)', 'Tela 6.7" Super Brilho', 'Câmera 50MP com IA', '5G · NFC'],
    description: 'Conexão 5G, NFC e acabamento em couro vegano. Tela de 6.7" com modo Super Brilho que ajuda na visualização ao sol. Excelente custo-benefício para quem quer entrar no 5G com bastante espaço.',
    badge: 'Mix Cell indica',
    featured: true,
    image: 'https://http2.mlstatic.com/D_NQ_NP_637143-MLA100031537749_122025-O.webp',
    imageAlt: 'Motorola Moto G35 5G na cor coral',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/1rND7j1', preco: 1174.00, frete: 0, prazo: 'Full', nota: 4.6, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 4,
    slug: 'positivo-p51-idoso',
    name: 'Celular para Idoso Positivo P51 (Flip)',
    category: '60-mais',
    brand: 'Positivo',
    model: 'P51',
    mlId: 'MLB4726715521',
    specs: ['Formato Flip (abre e fecha)', 'Teclas grandes', '4G', 'Som alto', 'Fácil de usar'],
    description: 'Celular flip ideal para idosos: abre e fecha, teclas grandes e som alto. Simples de usar, perfeito para quem só quer ligar e atender com facilidade. Indicado pela Mix Cell para a terceira idade.',
    badge: 'Mix Cell indica',
    featured: true,
    image: null,
    imageAlt: 'Celular flip Positivo P51 na cor preta',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/2B7P3F1', preco: 449.00, frete: 0, prazo: 'Full', nota: 4.5, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 5,
    slug: 'positivo-p26-simples',
    name: 'Celular Simples Positivo P26 4G',
    category: '60-mais',
    brand: 'Positivo',
    model: 'P26',
    mlId: 'MLB39444841',
    specs: ['Dual Chip', '4G', 'Rádio FM', 'MP3', 'Teclas grandes'],
    description: 'Celular simples e barato, com rádio FM e MP3. Dois chips e teclas grandes facilitam o uso. Ótima opção de segundo aparelho ou para quem prefere o básico que funciona.',
    badge: 'Mix Cell indica',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_840784-MLA95533700206_102025-O.webp',
    imageAlt: 'Celular simples Positivo P26 na cor preta',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/2hMcncL', preco: 219.00, frete: 0, prazo: 'Full', nota: 4.4, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 6,
    slug: 'xiaomi-poco-c71',
    name: 'Xiaomi Poco C71 128GB',
    category: 'celulares',
    brand: 'Xiaomi',
    model: 'Poco C71',
    mlId: 'MLB4297951291',
    linha: 'poco',
    specs: ['128GB', '4GB RAM', 'Dual SIM', 'Tela grande', 'Acompanha brindes'],
    description: 'Entrada da Xiaomi com bom espaço (128GB) e preço camarada. Dual SIM e tela ampla para o dia a dia. Boa escolha para primeiro smartphone ou presente.',
    badge: 'Oferta',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_619992-MLB107379326086_032026-O.webp',
    imageAlt: 'Xiaomi Poco C71 na cor preta',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/1vPpms6', preco: 849.00, frete: 0, prazo: 'Full', nota: 4.5, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 7,
    slug: 'iphone-15',
    name: 'Apple iPhone 15 128GB',
    category: 'celulares',
    brand: 'Apple',
    model: 'iPhone 15',
    mlId: 'MLB1027172667',
    linha: 'iphone',
    specs: ['128GB', 'Chip A16 Bionic', 'Tela 6.1" OLED', 'Câmera 48MP', 'USB-C · Dynamic Island'],
    description: 'O iPhone 15 trouxe a porta USB-C e a Dynamic Island para a linha padrão. Câmera de 48MP excelente e desempenho de sobra. Distribuidor autorizado. Um dos aparelhos que mais consertamos — e sabemos que dura.',
    badge: 'Premium',
    featured: true,
    image: 'https://http2.mlstatic.com/D_NQ_NP_831434-MLA96401363339_102025-O.webp',
    imageAlt: 'Apple iPhone 15 na cor azul',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/2XzkcFB', preco: 4548.00, frete: 0, prazo: 'Full', nota: 4.9, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 8,
    slug: 'iphone-16e',
    name: 'Apple iPhone 16e 128GB',
    category: 'celulares',
    brand: 'Apple',
    model: 'iPhone 16e',
    mlId: 'MLB1046215784',
    linha: 'iphone',
    specs: ['128GB', 'Chip A18', 'Tela 6.1" OLED', 'Câmera avançada', 'USB-C'],
    description: 'A porta de entrada mais acessível para a linha iPhone 16, com o moderno chip A18. Performance de ponta por um preço mais amigável. Distribuidor autorizado.',
    badge: 'Novo',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_961264-MLA95713213402_102025-O.webp',
    imageAlt: 'Apple iPhone 16e na cor preta',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/2oVGGXA', preco: 3749.00, frete: 0, prazo: 'Full', nota: 4.8, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 9,
    slug: 'iphone-16',
    name: 'Apple iPhone 16 128GB',
    category: 'celulares',
    brand: 'Apple',
    model: 'iPhone 16',
    mlId: 'MLB1040287808',
    linha: 'iphone',
    specs: ['128GB', 'Chip A18', 'Tela 6.1" OLED', 'Câmera 48MP Fusion', 'Botão de Ação · USB-C'],
    description: 'A geração atual com chip A18, botão de Ação e câmera Fusion de 48MP. Topo da linha padrão da Apple, ideal para quem quer o que há de mais novo. Distribuidor autorizado.',
    badge: 'Premium',
    featured: true,
    image: 'https://http2.mlstatic.com/D_NQ_NP_673808-MLA99443133132_112025-O.webp',
    imageAlt: 'Apple iPhone 16 na cor preta',
    marketplaces: {
      mercadolivre: { url: 'https://meli.la/1JFWF1c', preco: 5098.00, frete: 0, prazo: 'Full', nota: 4.9, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 10,
    slug: 'pelicula-paperlike-ipad-11',
    name: "Película Paperlike Cerâmica iPad 11 (A16 2025) 10.9\"",
    category: 'peliculas',
    brand: 'Apple',
    model: 'Película',
    mlId: 'MLB4344547619',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Película estilo Paperlike: textura fosca que imita papel, ótima para escrever e desenhar com a Apple Pencil. Reduz reflexos e marca menos digitais.",
    badge: 'Mix Cell indica',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_976271-MLB100340406237_122025-O.webp',
    imageAlt: "Película Paperlike para iPad 11",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BOrdc2QeZRLZkVOzyRdAlMXe7z9IscQ%2BDz8jcQwYkXZFIbRhgeVW3uFadMtIFK8rkjUAdHTRwFzFjva8l0SbQPTMyiYJG8il7%2FnpPc%2FFmhCovheema6zi5rJXaPVH23D%2FTm0Tjy8DO8vyt8%2FotlENCIOA86VamLauxkaViFlxPuTiwTEHabLNqS%2BQ1waNoZMogo%2BgA%3D%3D', preco: 59.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 11,
    slug: 'pelicula-hidrogel-ipad-a16',
    name: "Película Hidrogel iPad A16 2025 (Transparente/Fosca)",
    category: 'peliculas',
    brand: 'Apple',
    model: 'Película',
    mlId: 'MLB105406421530',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Película de hidrogel flexível, autorregenerativa e com toque suave. Disponível transparente ou fosca, protege contra riscos do dia a dia.",
    badge: 'Oferta',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_947405-MLB105406421530_012026-O.webp',
    imageAlt: "Película de hidrogel para iPad A16 2025",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BDHxPnxp5bNbU63PMaHvhITa8l%2FNQkfjHQoaRzqPKHU8mPiqr5qmJP1Ri7lzY0AZlpq0H%2BKnQpiMKp%2B5nIkQg%2FV8mc%2FH3mkJazvtbNEE%2B7jq9iBlq4PnTLnlFa8lLB5fishRIyzE7gFPwuGYTZTBr6YVatS9ALVf4k0TjobBEBnlMfAj2HFasJsY2ygkLS0yjHjMAg%3D%3D', preco: 34.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 12,
    slug: 'pelicula-paperlike-ipad-10',
    name: "Película Paperlike Cerâmica iPad 10ª Geração 10.9\" Fosca",
    category: 'peliculas',
    brand: 'Apple',
    model: 'Película',
    mlId: 'MLB3924333997',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Acabamento fosco cerâmico que dá a sensação de papel ao escrever. Antirreflexo e resistente, ideal para quem usa a Apple Pencil.",
    badge: 'Mix Cell indica',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_823275-MLB82355552146_022025-O.webp',
    imageAlt: "Película Paperlike fosca para iPad 10ª geração",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BGrjb17hyNJhQK2B%2F8e0Bp4oc1lUhEhCHdW08VIJwIdg%2BhzOe3ugu%2BNe37cTPnKkwQt0FSr6o7z8uUv7A2Ut5Qp9hfs6jfjO0WE%2F3o8Mk1YnuyAdr5yAu7OcYr0MFWQomhtvXdQpX7Tl0EZeLY5ixC5kiI0KQsb6krn3HFQkHc9h5xjHdSnfFFESyi0YQw%2F1i%2FmKaA%3D%3D', preco: 54.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 13,
    slug: 'pelicula-hidrogel-ipad-air-11',
    name: "Película Hidrogel iPad Air 11\" 2026 M4 (Transparente)",
    category: 'peliculas',
    brand: 'Apple',
    model: 'Película',
    mlId: 'MLB4520811959',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Hidrogel transparente de alta transparência para o iPad Air 11\" M4. Flexível, fina e com cicatrização de micro-riscos.",
    badge: 'Novo',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_824425-MLB107746442902_032026-O.webp',
    imageAlt: "Película de hidrogel para iPad Air 11 2026 M4",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BB1WHudkg6ExbuxZnvrGtnwzyc1dnKXsXQuufXEdh%2FXZ%2Fi%2BQdZ12JDWi%2BGIp2DRLOtKOpNfswg2n19IUICW33DJ0kKbx3yyYNObRwDEkAhskN%2FLWENi%2BcaA6V0fnp5MZQn%2FpQtRWfoJrk%2FXhq4vOuK7uuoBYWhyefaCikffAf59V34XtAshctqxYEX22iB8s6mRShQ%3D%3D', preco: 34.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 14,
    slug: 'pelicula-hidrogel-galaxy-tab-s11',
    name: "Película Hidrogel Samsung Galaxy Tab S11 (Transparente)",
    category: 'peliculas',
    brand: 'Samsung',
    model: 'Película',
    mlId: 'MLB99414001579',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Proteção em hidrogel transparente para o Galaxy Tab S11. Toque sensível preservado e proteção contra riscos.",
    badge: 'Novo',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_993932-MLB99414001579_112025-O.webp',
    imageAlt: "Película de hidrogel para Galaxy Tab S11",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BOsIGLXfWFe6GKMFvKamET7h3ZH1KACmCVgEujaMcKjcX9Pp23M4N3jrboINyRbkRJvK%2FA5A6SP%2Bu2PEMgI4Wgn%2Bpkv0qP%2F9zA6GHz8BUJ3X2PPh%2FF9tfroz7r8G0jDOFRrByzNN0edY1axQ860Rzx825xT2UUONL3iou1TBpwpMSHkZRbeWeuNXSSolHFt0hM9PZA%3D%3D', preco: 34.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 15,
    slug: 'pelicula-hidrogel-galaxy-tab-s10-lite',
    name: "Película Hidrogel Samsung Galaxy Tab S10 Lite (Transparente)",
    category: 'peliculas',
    brand: 'Samsung',
    model: 'Película',
    mlId: 'MLB59030642',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Hidrogel flexível para o Galaxy Tab S10 Lite. Fina, transparente e fácil de aplicar, sem bolhas.",
    badge: 'Oferta',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_952860-MLA108027566501_032026-O.webp',
    imageAlt: "Película de hidrogel para Galaxy Tab S10 Lite",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BBZ13s6Ws4FjurxIev74OXFtKGr0JF9FZG5JwdO8oqRCqe6Eo3RpHLYzFpLDmFp3P6pet0OFnP%2FvG0K81tXAqVGCsgSiujVOqNHZQuUmwGZAXHcHwsuXZKEQxjRS3FmIGDK7gWtSduvFL15egLX16Pz8KpcFxM5XcpS4aKqHNIwZ6%2FWBG%2BW87HT3gbLU7XQAPobxRIs%3D', preco: 29.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  },
  {
    id: 16,
    slug: 'pelicula-galaxy-tab-s10-fe',
    name: "Película Samsung Galaxy Tab S10 FE 10.9\"",
    category: 'peliculas',
    brand: 'Samsung',
    model: 'Película',
    mlId: 'MLB6288981520',
    specs: ['Proteção de tela', 'Toque sensível', 'Antirrisco'],
    description: "Proteção de tela para o Galaxy Tab S10 FE, mantendo a sensibilidade ao toque e protegendo contra riscos do uso diário.",
    badge: 'Mix Cell indica',
    featured: false,
    image: 'https://http2.mlstatic.com/D_NQ_NP_721320-MLB107469086677_022026-O.webp',
    imageAlt: "Película para Galaxy Tab S10 FE 10.9",
    marketplaces: {
      mercadolivre: { url: 'https://www.mercadolivre.com.br/social/ma20260611182113?matt_word=ma20260611182113&matt_tool=22646735&forceInApp=true&ref=BMPhZPcAVnHfqVwrQW0VgxSV9EXPdpYkbsGdyOFxauvhdXKXSdeenk7eNMDzWJCSOeWOSga9ICRoL4bri7VUF1qI0QqnTnU0VK8nlxXL8SSpYc6FUCdsF1yzC%2F6icbda1ziwQXFJbq76u5JS9W0%2BGj8OuC%2BgzMEu1FcUt375Q%2FUckSRQRWL04uxRNvmGP0N4sheJIQ%3D%3D', preco: 39.9, frete: 0, prazo: 'Full', nota: 4.7, best: true }
    },
    crossSell: [],
    createdAt: '2026-06-12T12:00:00Z',
    active: true
  }
];

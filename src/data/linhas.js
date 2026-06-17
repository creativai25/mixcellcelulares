// Linhas de smartphones — texto educativo para ajudar o cliente a escolher.
// Cada produto em products.js aponta para uma destas pela propriedade `linha`.
// `bestFor` = resumo curto (1 linha). `description` = explicação completa.
export const linhas = [
  {
    id: 'motorola-g',
    brand: 'Motorola',
    label: 'Motorola — Linha G',
    slug: 'motorola-g',
    bestFor: 'Custo-benefício e bateria para o dia a dia',
    description: 'A linha Moto G é a mais popular da Motorola: equilíbrio entre preço, bateria que dura o dia inteiro e tela grande. É a escolha certa para quem quer um celular confiável para o uso comum — WhatsApp, redes sociais, fotos do dia a dia e vídeos — sem pagar caro. A Mix Cell recomenda a linha G pela facilidade de manutenção e durabilidade.',
  },
  {
    id: 'motorola-e',
    brand: 'Motorola',
    label: 'Motorola — Linha E',
    slug: 'motorola-e',
    bestFor: 'O básico que funciona, pelo menor preço',
    description: 'A linha Moto E é a porta de entrada da Motorola: os modelos mais baratos, ideais para quem quer um primeiro smartphone, um segundo aparelho ou um presente econômico. Faz o essencial bem — ligações, mensagens e apps leves — com bateria de sobra.',
  },
  {
    id: 'motorola-edge',
    brand: 'Motorola',
    label: 'Motorola — Linha Edge',
    slug: 'motorola-edge',
    bestFor: 'Topo de linha da Motorola: tela curva e desempenho',
    description: 'A linha Edge é o premium da Motorola: telas curvas de alta taxa de atualização, câmeras avançadas e processadores potentes. Para quem quer desempenho de ponta, jogos pesados e fotografia de qualidade dentro do ecossistema Motorola.',
  },
  {
    id: 'samsung-a',
    brand: 'Samsung',
    label: 'Samsung — Linha A',
    slug: 'samsung-a',
    bestFor: 'Intermediário equilibrado com a confiança Samsung',
    description: 'A linha Galaxy A é o intermediário mais vendido da Samsung: bom conjunto de câmeras, tela AMOLED na maioria dos modelos, atualizações por vários anos e ótima revenda. Perfeita para quem quer a marca Samsung com preço acessível e durabilidade. Modelos com 5G e NFC para pagamento por aproximação.',
  },
  {
    id: 'samsung-m',
    brand: 'Samsung',
    label: 'Samsung — Linha M',
    slug: 'samsung-m',
    bestFor: 'Bateria gigante e maior autonomia',
    description: 'A linha Galaxy M é focada em bateria: são os Samsung com maior autonomia, ideais para quem fica muito tempo longe da tomada ou usa o celular intensamente o dia todo. Bom custo-benefício, com hardware parecido com a linha A mas otimizado para durar mais na bateria.',
  },
  {
    id: 'samsung-s',
    brand: 'Samsung',
    label: 'Samsung — Linha S',
    slug: 'samsung-s',
    bestFor: 'Topo de linha absoluto da Samsung',
    description: 'A linha Galaxy S é o premium da Samsung: as melhores câmeras, telas e processadores do Android. Para quem quer o que há de mais avançado — fotografia profissional, desempenho máximo e recursos de IA. Inclui também os modelos com S Pen (Ultra).',
  },
  {
    id: 'iphone',
    brand: 'Apple',
    label: 'iPhones (Apple)',
    slug: 'iphone',
    bestFor: 'iOS, longevidade e excelente revenda',
    description: 'Os iPhones se destacam pela fluidez do iOS, anos de atualização garantidos, câmeras consistentes e a melhor revenda do mercado. Quem entra no ecossistema Apple ganha integração com outros aparelhos da marca e um aparelho que se mantém atual por muito tempo. A Mix Cell conserta iPhones todos os dias e atesta a durabilidade.',
  },
  {
    id: 'redmi',
    brand: 'Xiaomi',
    label: 'Xiaomi — Redmi',
    slug: 'redmi',
    bestFor: 'Muito hardware por pouco dinheiro',
    description: 'A linha Redmi da Xiaomi é conhecida por entregar muita ficha técnica por um preço baixo: boas baterias, telas grandes e desempenho acima da média na faixa de entrada. Para quem quer aproveitar ao máximo cada real investido.',
  },
  {
    id: 'redmi-note',
    brand: 'Xiaomi',
    label: 'Xiaomi — Redmi Note',
    slug: 'redmi-note',
    bestFor: 'O intermediário "queridinho" do custo-benefício',
    description: 'A linha Redmi Note é a mais elogiada em custo-benefício intermediário: telas AMOLED de alta taxa de atualização, câmeras de alta resolução e carregamento rápido — recursos de celular caro por um preço intermediário. Ótima escolha para quem quer destaque sem pagar de topo de linha.',
  },
  {
    id: 'poco',
    brand: 'Xiaomi',
    label: 'Xiaomi — Poco',
    slug: 'poco',
    bestFor: 'Desempenho bruto pelo menor preço',
    description: 'A linha Poco (da Xiaomi) é focada em desempenho: entrega processadores fortes por preços agressivos, sendo muito procurada por quem joga e quer fluidez gastando pouco. Excelente para gamers de orçamento enxuto.',
  },
];

// Helper: retorna a linha de um produto
export const getLinha = (linhaId) => linhas.find((l) => l.id === linhaId) || null;

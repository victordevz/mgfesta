export type CategoryId = 'flor-e-borboleta' | 'topos-de-bolo';
export type Product = { id: string; category: CategoryId; name: string; color: string; swatch: string; images: string[]; minimum: number; description: string };
const colors = [
  ['rosa-claro', 'Rosa-claro', '#edacc3'], ['azul-claro', 'Azul-claro', '#97c8df'],
  ['lilas', 'Lilás', '#c8a7d9'], ['lavanda', 'Lavanda', '#b4b0d3'],
  ['pessego', 'Pêssego', '#efb69e'], ['verde-menta', 'Verde-menta', '#a5d1b7'],
  ['amarelo-vivo', 'Amarelo-vivo', '#f2d54f'], ['amarelo-ouro', 'Amarelo-ouro', '#ddae46'],
  ['amarelo-oliva', 'Amarelo-oliva', '#c5bb75'], ['oliva', 'Oliva', '#93985c'],
  ['laranja', 'Laranja', '#ed914d'], ['vermelho', 'Vermelho', '#cc5058'],
  ['fucsia', 'Fúcsia', '#d45aa6'], ['roxo', 'Roxo', '#9455b0'], ['azul-royal', 'Azul-royal', '#4d6bc2'],
];
const flowerKits: Product[] = colors.map(([id, color, swatch]) => ({
  id, category: 'flor-e-borboleta', name: 'Kit Flor e Borboleta', color, swatch,
  images: [`/images/products/${id}-01.webp`, `/images/products/${id}-02.webp`], minimum: 10,
  description: 'Flores de papel em camadas e borboletas delicadas para dar vida à decoração do seu bolo.',
}));
const cakeToppers: Product[] = [
  {
    "id": "topo-de-bolo-felicidades-azul-claro-metalizado-e-dourado-coracoes",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Felicidades",
    "color": "Azul-claro metalizado e dourado · Corações",
    "swatch": "#93c6df",
    "images": [
      "/images/products/topo-de-bolo-felicidades-azul-claro-metalizado-e-dourado-coracoes.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Felicidades”, em azul-claro metalizado e dourado, acompanhado de corações. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-felicidades-dourado-e-branco-flores-rosa-claro-e-borboletas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Felicidades",
    "color": "Dourado e branco · Flores rosa-claro e borboletas",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-felicidades-dourado-e-branco-flores-rosa-claro-e-borboletas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Felicidades”, em dourado e branco, acompanhado de flores rosa-claro e borboletas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-felicidades-rosa-metalizado-e-dourado-coracoes",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Felicidades",
    "color": "Rosa metalizado e dourado · Corações",
    "swatch": "#ed0d94",
    "images": [
      "/images/products/topo-de-bolo-felicidades-rosa-metalizado-e-dourado-coracoes.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Felicidades”, em rosa metalizado e dourado, acompanhado de corações. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-aniversario-azul-claro-metalizado-e-dourado-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Aniversário",
    "color": "Azul-claro metalizado e dourado · Estrelas",
    "swatch": "#93c6df",
    "images": [
      "/images/products/topo-de-bolo-feliz-aniversario-azul-claro-metalizado-e-dourado-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Aniversário”, em azul-claro metalizado e dourado, acompanhado de estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-aniversario-azul-royal-metalizado-e-dourado-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Aniversário",
    "color": "Azul-royal metalizado e dourado · Estrelas",
    "swatch": "#3459b5",
    "images": [
      "/images/products/topo-de-bolo-feliz-aniversario-azul-royal-metalizado-e-dourado-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Aniversário”, em azul-royal metalizado e dourado, acompanhado de estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-aniversario-dourado-e-branco-flores-rosa-claro",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Aniversário",
    "color": "Dourado e branco · Flores rosa-claro",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-feliz-aniversario-dourado-e-branco-flores-rosa-claro.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Aniversário”, em dourado e branco, acompanhado de flores rosa-claro. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-aniversario-rosa-metalizado-e-dourado-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Aniversário",
    "color": "Rosa metalizado e dourado · Estrelas",
    "swatch": "#ed0d94",
    "images": [
      "/images/products/topo-de-bolo-feliz-aniversario-rosa-metalizado-e-dourado-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Aniversário”, em rosa metalizado e dourado, acompanhado de estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-natal-dourado-e-vermelho-com-verde-letras-de-forma",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Natal",
    "color": "Dourado e vermelho com verde · Letras de forma",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-feliz-natal-dourado-e-vermelho-com-verde-letras-de-forma.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Natal”, em dourado e vermelho com verde, acompanhado de letras de forma. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-natal-verde-e-vermelho-com-dourado-gorro-natalino",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Natal",
    "color": "Verde e vermelho com dourado · Gorro natalino",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-feliz-natal-verde-e-vermelho-com-dourado-gorro-natalino.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Natal”, em verde e vermelho com dourado, acompanhado de gorro natalino. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-feliz-natal-vermelho-e-verde-com-dourado-letras-cursivas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Feliz Natal",
    "color": "Vermelho e verde com dourado · Letras cursivas",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-feliz-natal-vermelho-e-verde-com-dourado-letras-cursivas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Feliz Natal”, em vermelho e verde com dourado, acompanhado de letras cursivas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-amarelo-e-dourado-flores-amarelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Amarelo e dourado · Flores amarelas",
    "swatch": "#efc62c",
    "images": [
      "/images/products/topo-de-bolo-gratidao-amarelo-e-dourado-flores-amarelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em amarelo e dourado, acompanhado de flores amarelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-azul-claro-metalizado-e-dourado-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Azul-claro metalizado e dourado · Estrelas",
    "swatch": "#93c6df",
    "images": [
      "/images/products/topo-de-bolo-gratidao-azul-claro-metalizado-e-dourado-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em azul-claro metalizado e dourado, acompanhado de estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-azul-royal-e-dourado-flores-azul-royal",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Azul-royal e dourado · Flores azul-royal",
    "swatch": "#3459b5",
    "images": [
      "/images/products/topo-de-bolo-gratidao-azul-royal-e-dourado-flores-azul-royal.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em azul-royal e dourado, acompanhado de flores azul-royal. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-azul-royal-metalizado-e-dourado-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Azul-royal metalizado e dourado · Estrelas",
    "swatch": "#3459b5",
    "images": [
      "/images/products/topo-de-bolo-gratidao-azul-royal-metalizado-e-dourado-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em azul-royal metalizado e dourado, acompanhado de estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-branco-e-dourado-flores-lilas-e-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Branco e dourado · Flores lilás e estrelas",
    "swatch": "#f0e9ec",
    "images": [
      "/images/products/topo-de-bolo-gratidao-branco-e-dourado-flores-lilas-e-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em branco e dourado, acompanhado de flores lilás e estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-dourado-e-branco-estrelas-rosa-claro-e-douradas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Dourado e branco · Estrelas rosa-claro e douradas",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-gratidao-dourado-e-branco-estrelas-rosa-claro-e-douradas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em dourado e branco, acompanhado de estrelas rosa-claro e douradas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-pink-e-dourado-flores-pink",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Pink e dourado · Flores pink",
    "swatch": "#ed0d94",
    "images": [
      "/images/products/topo-de-bolo-gratidao-pink-e-dourado-flores-pink.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em pink e dourado, acompanhado de flores pink. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-gratidao-rosa-metalizado-e-dourado-estrelas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Gratidão",
    "color": "Rosa metalizado e dourado · Estrelas",
    "swatch": "#ed0d94",
    "images": [
      "/images/products/topo-de-bolo-gratidao-rosa-metalizado-e-dourado-estrelas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Gratidão”, em rosa metalizado e dourado, acompanhado de estrelas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-parabens-amarelo-e-dourado-flores-amarelas-e-borboletas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Parabéns",
    "color": "Amarelo e dourado · Flores amarelas e borboletas",
    "swatch": "#efc62c",
    "images": [
      "/images/products/topo-de-bolo-parabens-amarelo-e-dourado-flores-amarelas-e-borboletas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Parabéns”, em amarelo e dourado, acompanhado de flores amarelas e borboletas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-parabens-branco-e-dourado-flores-lilas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Parabéns",
    "color": "Branco e dourado · Flores lilás",
    "swatch": "#f0e9ec",
    "images": [
      "/images/products/topo-de-bolo-parabens-branco-e-dourado-flores-lilas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Parabéns”, em branco e dourado, acompanhado de flores lilás. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-parabens-branco-e-dourado-flores-rosa-claro-e-borboletas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Parabéns",
    "color": "Branco e dourado · Flores rosa-claro e borboletas",
    "swatch": "#f0e9ec",
    "images": [
      "/images/products/topo-de-bolo-parabens-branco-e-dourado-flores-rosa-claro-e-borboletas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Parabéns”, em branco e dourado, acompanhado de flores rosa-claro e borboletas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-parabens-dourado-e-branco-flores-brancas-e-borboletas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Parabéns",
    "color": "Dourado e branco · Flores brancas e borboletas",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-parabens-dourado-e-branco-flores-brancas-e-borboletas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Parabéns”, em dourado e branco, acompanhado de flores brancas e borboletas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  },
  {
    "id": "topo-de-bolo-parabens-dourado-e-branco-com-pink-flores-pink-e-borboletas",
    "category": "topos-de-bolo",
    "name": "Topo de bolo Parabéns",
    "color": "Dourado e branco com pink · Flores pink e borboletas",
    "swatch": "#d1b044",
    "images": [
      "/images/products/topo-de-bolo-parabens-dourado-e-branco-com-pink-flores-pink-e-borboletas.webp"
    ],
    "minimum": 10,
    "description": "Topo de bolo com a mensagem “Parabéns”, em dourado e branco com pink, acompanhado de flores pink e borboletas. Confira na fotografia os recortes, as cores e todos os detalhes do conjunto."
  }
];
export const products: Product[] = [...flowerKits, ...cakeToppers];
export const categories: { id: CategoryId; name: string; detail: string; image: string }[] = [
  { id: 'flor-e-borboleta', name: 'Flor e Borboleta Kit', detail: '15 cores para escolher', image: flowerKits[0].images[0] },
  { id: 'topos-de-bolo', name: 'Topos de bolo', detail: '23 modelos para celebrar', image: cakeToppers.find(p => p.name === 'Topo de bolo Parabéns')!.images[0] },
];
export const productLabel = (product: Product) => `${product.name} — ${product.color}`;
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

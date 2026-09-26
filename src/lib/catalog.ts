export type Product = { id: string; color: string; swatch: string; images: [string, string]; price: number; minimum: number };
const colors = [
  ['rosa-claro', 'Rosa-claro', '#edacc3'], ['azul-claro', 'Azul-claro', '#97c8df'],
  ['lilas', 'Lilás', '#c8a7d9'], ['lavanda', 'Lavanda', '#b4b0d3'],
  ['pessego', 'Pêssego', '#efb69e'], ['verde-menta', 'Verde-menta', '#a5d1b7'],
  ['amarelo-vivo', 'Amarelo-vivo', '#f2d54f'], ['amarelo-ouro', 'Amarelo-ouro', '#ddae46'],
  ['amarelo-oliva', 'Amarelo-oliva', '#c5bb75'], ['oliva', 'Oliva', '#93985c'],
  ['laranja', 'Laranja', '#ed914d'], ['vermelho', 'Vermelho', '#cc5058'],
  ['fucsia', 'Fúcsia', '#d45aa6'], ['roxo', 'Roxo', '#9455b0'], ['azul-royal', 'Azul-royal', '#4d6bc2'],
];
export const products: Product[] = colors.map(([id, color, swatch]) => ({ id, color, swatch, images: [`/images/products/${id}-01.webp`, `/images/products/${id}-02.webp`], price: 400, minimum: 10 }));
export const money = (cents: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100);
export const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

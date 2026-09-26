import { products, money } from './catalog.ts';
export type Cart = Record<string, number>;
export const STORAGE_KEY = 'mg-festas-cart-v1';
export function validQuantity(value: number): boolean { return Number.isSafeInteger(value) && value >= 10 && value <= 999999; }
export function sanitizeCart(value: unknown): Cart {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  return Object.fromEntries(products.flatMap(p => {
    const qty = (value as Record<string, unknown>)[p.id];
    return typeof qty === 'number' && validQuantity(qty) ? [[p.id, qty]] : [];
  }));
}
export function cartTotals(cart: Cart) {
  return products.reduce((total, p) => ({ units: total.units + (cart[p.id] || 0), cents: total.cents + (cart[p.id] || 0) * p.price }), { units: 0, cents: 0 });
}
export function whatsappLink(phone: string, cart: Cart): string | null {
  const clean = sanitizeCart(cart);
  if (!/^[1-9]\d{9,14}$/.test(phone) || !Object.keys(clean).length) return null;
  const { units, cents } = cartTotals(clean);
  const lines = products.filter(p => clean[p.id]).map(p => `• Kit Flor e Borboleta — ${p.color}: ${clean[p.id]} kits × ${money(p.price)} = ${money(clean[p.id] * p.price)}`);
  const message = ['Olá, MG FESTAS! Gostaria de fazer este pedido:', '', ...lines, '', `Quantidade total: ${units} kits`, `Subtotal dos produtos: ${money(cents)}`, '', 'Podem confirmar a disponibilidade e o valor do frete?'].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

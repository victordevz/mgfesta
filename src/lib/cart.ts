import { products, productLabel } from './catalog.ts';
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
  return products.reduce((total, p) => ({ units: total.units + (cart[p.id] || 0) }), { units: 0 });
}
export function whatsappLink(phone: string, cart: Cart): string | null {
  const clean = sanitizeCart(cart);
  if (!/^[1-9]\d{9,14}$/.test(phone) || !Object.keys(clean).length) return null;
  const { units } = cartTotals(clean);
  const lines = products.filter(p => clean[p.id]).map(p => `• ${productLabel(p)}: ${clean[p.id]} unidades`);
  const message = ['Olá, MG FESTAS! Gostaria de consultar este pedido:', '', ...lines, '', `Quantidade total: ${units} unidades`, '', 'Podem informar os valores, a disponibilidade e o frete?'].join('\n');
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'MG FESTAS | Kit Flor e Borboleta em 15 cores',
  description: 'Um toque de encanto para sua festa. Conheça o Kit Flor e Borboleta MG FESTAS: 15 cores, R$ 4,00 por kit e pedidos a partir de 10 kits por cor.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

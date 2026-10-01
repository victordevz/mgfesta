import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'MG FESTAS | Topos de bolo, flores e borboletas',
  description: 'Um toque de encanto para sua festa. Conheça 23 modelos de topos de bolo e o Kit Flor e Borboleta em 15 cores. Monte seu pedido e consulte pelo WhatsApp.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}

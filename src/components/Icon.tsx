import type { CSSProperties } from 'react';
export default function Icon({ name, size = 20, style }: { name: 'cart' | 'search' | 'arrow' | 'close' | 'plus' | 'minus' | 'help' | 'check' | 'bag' | 'zoom' | 'trash' | 'instagram'; size?: number; style?: CSSProperties }) {
  const paths: Record<typeof name, React.ReactNode> = {
    cart: <><path d="M2 3h3l3 13h11l3-10H6"/><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    arrow: <path d="M4 12h16m-6-6 6 6-6 6"/>, close: <path d="m6 6 12 12M6 18 18 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>, minus: <path d="M5 12h14"/>,
    help: <><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 2-2.5 2-2.5 4m0 3h.01"/></>,
    check: <path d="m5 12 4 4L19 6"/>, bag: <><path d="M5 7h14l1 14H4L5 7Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></>,
    zoom: <><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6m-3-3v6"/></>,
    trash: <><path d="M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={style}>{paths[name]}</svg>;
}

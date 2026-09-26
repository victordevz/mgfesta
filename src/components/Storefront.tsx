'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from 'react';
import { products, money, normalize, type Product } from '@/lib/catalog';
import { cartTotals, sanitizeCart, STORAGE_KEY, validQuantity, whatsappLink, type Cart } from '@/lib/cart';
import { store } from '@/lib/config';
import Dialog from './Dialog';
import Quantity from './Quantity';
import Icon from './Icon';
import s from './Storefront.module.css';

let memoryCartSnapshot = '{}';
function readCartSnapshot() {
  try { memoryCartSnapshot = localStorage.getItem(STORAGE_KEY) || '{}'; } catch { /* Use the in-memory cart if storage is unavailable. */ }
  return memoryCartSnapshot;
}
function subscribeToCart(onChange: () => void) {
  window.addEventListener('storage', onChange);
  window.addEventListener('mg-festas-cart-change', onChange);
  return () => { window.removeEventListener('storage', onChange); window.removeEventListener('mg-festas-cart-change', onChange); };
}

function ProductModal({ product, onClose, add }: { product: Product; onClose: () => void; add: (p: Product, qty: number) => void }) {
  const [angle, setAngle] = useState(0); const [zoom, setZoom] = useState(false); const [qty, setQty] = useState(10); const [valid, setValid] = useState(true);
  return <Dialog title={`Kit Flor e Borboleta · ${product.color}`} onClose={onClose} wide>
    <div className={s.productDetail}>
      <div className={s.gallery}><button className={`${s.mainPhoto} ${zoom ? s.zoomed : ''}`} aria-label={zoom ? 'Reduzir fotografia' : 'Ampliar fotografia'} aria-pressed={zoom} onClick={() => setZoom(!zoom)}><Image src={product.images[angle]} alt={`Kit ${product.color}, ângulo ${angle + 1}`} fill sizes="(max-width: 700px) 90vw, 480px"/><span className={s.zoomBadge}><Icon name="zoom"/>{zoom ? 'Reduzir' : 'Ampliar'}</span></button>
        <div className={s.thumbnails}>{product.images.map((src, i) => <button key={src} aria-label={`Ver ângulo ${i + 1}`} aria-pressed={angle === i} className={angle === i ? s.chosenThumb : ''} onClick={() => { setAngle(i); setZoom(false); }}><Image src={src} alt={`Ângulo ${i + 1}`} width={60} height={80}/></button>)}<span>Dois ângulos.<br/>Cada detalhe de perto.</span></div>
      </div>
      <div className={s.productInfo}><span className={s.eyebrow}>FLOR E BORBOLETA KIT</span><h3>Um toque de encanto<br/>{' '}em {product.color.toLowerCase()}.</h3><p className={s.description}>Flores de papel em camadas e borboletas delicadas para dar vida à decoração do seu bolo.</p><div className={s.colorLabel}><span style={{ background: product.swatch }}/>{product.color}</div><div className={s.detailPrice}>{money(product.price)} <small>/ kit</small></div><p className={s.minimum}>Mínimo de 10 kits desta cor. Depois, escolha de 1 em 1.</p><label className={s.qtyLabel}>Quantidade de kits</label><Quantity label={product.color} value={qty} onChange={setQty} onValidity={setValid}/><p className={s.subtotal}>Subtotal <strong>{money(qty * product.price)}</strong></p><div className={s.detailAction}><button className={s.primary} disabled={!valid} onClick={() => add(product, qty)}><Icon name="bag"/>Adicionar ao carrinho<Icon name="arrow" size={18}/></button></div><p className={s.note}>As cores podem variar um pouco conforme a sua tela.</p></div>
    </div>
    <div className={s.mobileAction}><div><span>{qty} kits</span><strong>{money(qty * product.price)}</strong></div><button className={s.primary} disabled={!valid} onClick={() => add(product, qty)}><Icon name="bag"/>Adicionar ao carrinho</button></div>
  </Dialog>;
}

export default function Storefront() {
  const [query, setQuery] = useState(''); const [selected, setSelected] = useState<Product | null>(null);
  const cartSnapshot = useSyncExternalStore(subscribeToCart, readCartSnapshot, () => '{}');
  const cart = useMemo(() => { try { return sanitizeCart(JSON.parse(cartSnapshot)); } catch { return {}; } }, [cartSnapshot]);
  const setCart: Dispatch<SetStateAction<Cart>> = update => {
    const current = sanitizeCart(JSON.parse(readCartSnapshot()));
    const next = typeof update === 'function' ? update(current) : update;
    memoryCartSnapshot = JSON.stringify(sanitizeCart(next));
    try { localStorage.setItem(STORAGE_KEY, memoryCartSnapshot); } catch { /* Keep the cart in memory if storage is unavailable. */ }
    window.dispatchEvent(new Event('mg-festas-cart-change'));
  };
  const [cartOpen, setCartOpen] = useState(false); const [helpOpen, setHelpOpen] = useState(false); const [toast, setToast] = useState(''); const [invalidRows, setInvalidRows] = useState<Record<string, boolean>>({});
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 4500); return () => clearTimeout(timer); }, [toast]);
  const filtered = products.filter(p => normalize(`Kit Flor e Borboleta ${p.color}`).includes(normalize(query)));
  const totals = cartTotals(cart); const checkout = whatsappLink(store.whatsapp, cart); const anyInvalid = Object.values(invalidRows).some(Boolean);
  function add(product: Product, qty: number) {
    if (!validQuantity(qty)) return;
    if (!validQuantity((cart[product.id] || 0) + qty)) { setToast('Quantidade máxima atingida para esta cor.'); return; }
    setCart(current => ({ ...current, [product.id]: (current[product.id] || 0) + qty })); setSelected(null); setToast(`${qty} kits ${product.color.toLowerCase()} adicionados ao carrinho.`);
  }
  function browse() { setQuery(''); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }); }
  function remove(id: string) { setCart(current => { const next = { ...current }; delete next[id]; return next; }); setInvalidRows(current => { const next = { ...current }; delete next[id]; return next; }); }
  return <>
    <a className={s.skip} href="#produtos">Ir para os produtos</a>
    <div className={s.topbar}><div>{store.instagram ? <a href={store.instagram} target="_blank" rel="noreferrer">Siga a MG FESTAS <Icon name="instagram" size={14}/></a> : <span>Pequenos detalhes, grandes comemorações.</span>}</div><button onClick={() => setHelpOpen(true)}><Icon name="help" size={14}/>Precisa de ajuda?</button></div>
    <header className={s.header}><a href="#" className={s.brand} aria-label="MG FESTAS — início"><Image src="/images/logo.webp" alt="MG FESTAS" width={112} height={112} priority/></a><form className={s.search} role="search" onSubmit={e => { e.preventDefault(); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }); }}><input aria-label="Buscar produtos" placeholder="Busque uma cor ou produto..." value={query} onChange={e => setQuery(e.target.value)}/>{query && <button type="button" className={s.clearSearch} aria-label="Limpar busca" onClick={() => setQuery('')}><Icon name="close" size={16}/></button>}<button className={s.searchButton} aria-label="Pesquisar"><Icon name="search"/></button></form><button className={s.cartButton} onClick={() => { setInvalidRows({}); setCartOpen(true); }} aria-label={`Abrir carrinho, ${totals.units} kits`}><span className={s.cartIcon}><Icon name="cart" size={28}/>{totals.units > 0 && <span className={s.badge}>{totals.units}</span>}</span><span className={s.cartText}>Meu carrinho<strong>{money(totals.cents)}</strong></span></button></header>
    <main className={s.main}>
      <section className={s.banners} aria-label="Novidades MG FESTAS"><div className={s.hero}><div className={s.heroCopy}><span className={s.eyebrow}><span className={s.newDot}/> NOVIDADE · MG FESTAS</span><h1>Sua festa,<br/>com um toque<br/>{' '}de encanto.</h1><p>Conheça o <strong>Kit Flor e Borboleta.</strong><br/>15 cores para florescer suas ideias.</p><button className={s.primary} onClick={browse}>Explorar os kits <Icon name="arrow" size={17}/></button><span className={s.heroPrice}>R$ 4,00 / kit <span>· mínimo de 10 por cor</span></span></div><div className={s.heroImage}><Image src="/images/hero-cake.webp" alt="Aplicação ilustrativa: bolo com flores de papel e borboletas rosa-claro" fill sizes="(max-width: 700px) 90vw, 42vw" priority/><span>Aplicação ilustrativa</span></div></div>
        <div className={s.sideBanners}><button className={`${s.smallBanner} ${s.peach}`} onClick={() => setSelected(products[0])}><div><span className={s.eyebrow}>DELICADEZA EM CADA DETALHE</span><h2>Um clássico<br/>para celebrar.</h2><span className={s.bannerLink}>Ver rosa-claro <Icon name="arrow" size={14}/></span></div><div className={s.smallPhoto}><Image src={products[0].images[0]} alt="Kit rosa-claro" fill sizes="(max-width: 700px) 30vw, 13vw"/></div></button><button className={`${s.smallBanner} ${s.lavender}`} onClick={() => setSelected(products[1])}><div><span className={s.eyebrow}>COR PARA SE ENCANTAR</span><h2>Leveza que<br/>vira festa.</h2><span className={s.bannerLink}>Ver azul-claro <Icon name="arrow" size={14}/></span></div><div className={s.smallPhoto}><Image src={products[1].images[0]} alt="Kit azul-claro" fill sizes="(max-width: 700px) 30vw, 13vw"/></div></button></div>
      </section>
      <section className={s.categories} aria-labelledby="categories-title"><h2 id="categories-title" className={s.sectionLabel}>CATEGORIAS</h2><button className={s.category} aria-pressed="true" onClick={browse}><span className={s.categoryPhoto}><Image src={products[0].images[0]} alt="" width={66} height={88}/></span><span>Flor e Borboleta Kit<small>15 cores para escolher</small></span><span className={s.categoryCheck}><Icon name="check" size={14}/></span></button></section>
      <section id="produtos" className={s.productsSection} aria-labelledby="products-title"><div className={s.sectionHeading}><h2 id="products-title">PRODUTOS DE FESTA</h2><span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'cor disponível' : 'cores disponíveis'}</span></div>{filtered.length ? <div className={s.grid}>{filtered.map(p => <article key={p.id} className={s.card}><button className={s.cardPhoto} onClick={() => setSelected(p)} aria-label={`Ver Kit Flor e Borboleta ${p.color}`}><Image src={p.images[0]} alt={`Kit Flor e Borboleta ${p.color}`} fill sizes="(max-width: 600px) 45vw, (max-width: 1100px) 29vw, 15vw"/><span className={s.photoColor} style={{ background: p.swatch }}/></button><div className={s.cardBody}><h3>Kit Flor e Borboleta<span>{p.color}</span></h3><div className={s.cardPrice}>{money(p.price)}<small>/ kit</small></div><p>Mínimo: 10 kits por cor</p><button className={s.cardCta} onClick={() => setSelected(p)}>Ver produto <Icon name="plus" size={15}/></button></div></article>)}</div> : <div className={s.empty}><Icon name="search" size={30}/><h3>Nenhuma cor encontrada</h3><p>Tente buscar por “rosa”, “azul” ou “lilás”.</p><button className={s.primary} onClick={() => setQuery('')}>Ver todas as cores</button></div>}</section>
      <div className={s.bottomNote}><span><Icon name="bag"/>Seu pedido, do seu jeito</span><p>A partir de 10 kits por cor. Combine as suas favoritas e finalize pelo WhatsApp.</p></div>
    </main>
    <footer className={s.footer}><strong>MG FESTAS</strong><span>Feito para celebrar os seus momentos.</span><button onClick={() => setHelpOpen(true)}>Como comprar <Icon name="arrow" size={15}/></button></footer>
    {selected && <ProductModal key={selected.id} product={selected} onClose={() => setSelected(null)} add={add}/>}
    {cartOpen && <Dialog title="Meu carrinho" drawer onClose={() => setCartOpen(false)}><div className={s.cartContent}>{totals.units ? <><p className={s.cartIntro}>{totals.units} kits para deixar a festa do seu jeito.</p>{products.filter(p => cart[p.id]).map(p => <div key={p.id} className={s.cartRow}><Image src={p.images[0]} alt={`Kit ${p.color}`} width={76} height={102}/><div className={s.cartRowInfo}><h3>{p.color}</h3><p>Kit Flor e Borboleta · {money(p.price)}</p><Quantity label={p.color} value={cart[p.id]} onChange={qty => setCart(current => ({ ...current, [p.id]: qty }))} onValidity={valid => setInvalidRows(current => ({ ...current, [p.id]: !valid }))}/><strong>{money(cart[p.id] * p.price)}</strong></div><button className={s.remove} aria-label={`Remover ${p.color}`} onClick={() => remove(p.id)}><Icon name="trash" size={18}/></button></div>)}</> : <div className={s.empty}><Icon name="bag" size={40}/><h3>Sua festa começa por aqui</h3><p>Escolha suas cores favoritas e adicione ao carrinho.</p><button className={s.primary} onClick={() => { setCartOpen(false); browse(); }}>Explorar os kits</button></div>}</div>{totals.units > 0 && <div className={s.cartSummary}><div><span>Subtotal · {totals.units} kits</span><strong>{money(totals.cents)}</strong></div><p>Disponibilidade e frete confirmados pelo WhatsApp.</p>{checkout && !anyInvalid ? <a className={s.primary} href={checkout} target="_blank" rel="noopener noreferrer">Finalizar pelo WhatsApp <Icon name="arrow" size={18}/></a> : <button className={s.primary} disabled>{anyInvalid ? 'Confira as quantidades' : 'Pedidos pelo WhatsApp em breve'}</button>}<button className={s.continue} onClick={() => setCartOpen(false)}>Continuar escolhendo</button></div>}</Dialog>}
    {helpOpen && <Dialog title="Como comprar na MG FESTAS" onClose={() => setHelpOpen(false)}><div className={s.help}><p>Escolha as cores que combinam com sua festa.</p><ol><li>Abra o produto para conferir os dois ângulos.</li><li>Selecione pelo menos 10 kits de cada cor. Você pode pedir 11, 12, 13…</li><li>Confira seu carrinho. Cada kit custa R$ 4,00.</li><li>Finalize pelo WhatsApp para confirmar disponibilidade e frete com a MG FESTAS.</li></ol><p>Não há pagamento pelo site. Seu pedido é combinado diretamente no atendimento.</p></div></Dialog>}
    <div role="status" aria-live="polite" className={toast ? s.toast : s.srOnly}>{toast && <><Icon name="check"/>{toast}<button onClick={() => { setToast(''); setInvalidRows({}); setCartOpen(true); }}>Ver carrinho</button></>}</div>
  </>;
}

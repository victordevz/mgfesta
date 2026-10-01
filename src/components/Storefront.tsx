'use client';
import Image from 'next/image';
import { useEffect, useMemo, useState, useSyncExternalStore, type Dispatch, type SetStateAction } from 'react';
import { products, categories, productLabel, normalize, type Product, type CategoryId } from '@/lib/catalog';
import { cartTotals, sanitizeCart, STORAGE_KEY, validQuantity, whatsappLink, type Cart } from '@/lib/cart';
import { store } from '@/lib/config';
import Dialog from './Dialog';
import Quantity from './Quantity';
import Icon from './Icon';
import PromoSlider from './PromoSlider';
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
const quantityLabel = (product: Product) => product.category === 'flor-e-borboleta' ? product.color : productLabel(product);

function ProductModal({ product, onClose, add }: { product: Product; onClose: () => void; add: (p: Product, qty: number) => void }) {
  const [angle, setAngle] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [qty, setQty] = useState(product.minimum);
  const [valid, setValid] = useState(true);
  const flowerKit = product.category === 'flor-e-borboleta';
  return <Dialog title={productLabel(product)} onClose={onClose} wide>
    <div className={s.productDetail}>
      <div className={s.gallery}>
        <button className={`${s.mainPhoto} ${zoom ? s.zoomed : ''}`} aria-label={zoom ? 'Reduzir fotografia' : 'Ampliar fotografia'} aria-pressed={zoom} onClick={() => setZoom(!zoom)}>
          <Image src={product.images[angle]} alt={`${productLabel(product)}, fotografia ${angle + 1}`} fill sizes="(max-width: 700px) 90vw, 480px"/>
          <span className={s.zoomBadge}><Icon name="zoom"/>{zoom ? 'Reduzir' : 'Ampliar'}</span>
        </button>
        <div className={s.thumbnails}>{product.images.map((src, i) => <button key={src} aria-label={`Ver fotografia ${i + 1}`} aria-pressed={angle === i} className={angle === i ? s.chosenThumb : ''} onClick={() => { setAngle(i); setZoom(false); }}><Image src={src} alt={`Fotografia ${i + 1}`} width={60} height={80}/></button>)}<span>{product.images.length > 1 ? 'Dois ângulos.' : 'Conheça o conjunto.'}<br/>Cada detalhe de perto.</span></div>
      </div>
      <div className={s.productInfo}>
        <span className={s.eyebrow}>{flowerKit ? 'FLOR E BORBOLETA KIT' : 'TOPOS DE BOLO'}</span>
        <h3>{flowerKit ? <>Um toque de encanto<br/> em {product.color.toLowerCase()}.</> : product.name}</h3>
        <p className={s.description}>{product.description}</p>
        <div className={s.colorLabel}><span style={{ background: product.swatch }}/>{product.color}</div>
        <p className={s.minimum}>Mínimo de {product.minimum} unidades {flowerKit ? 'desta cor' : 'deste modelo'}. Depois, escolha de 1 em 1.</p>
        <label className={s.qtyLabel}>Quantidade de {flowerKit ? 'kits' : 'topos'}</label>
        <Quantity label={quantityLabel(product)} value={qty} onChange={setQty} onValidity={setValid}/>
        <div className={s.detailAction}><button className={s.primary} disabled={!valid} onClick={() => add(product, qty)}><Icon name="bag"/>Adicionar ao carrinho<Icon name="arrow" size={18}/></button></div>
        <p className={s.note}>As cores podem variar um pouco conforme a sua tela.</p>
      </div>
    </div>
    <div className={s.mobileAction}><div><strong>{qty}</strong><span>unidades</span></div><button className={s.primary} disabled={!valid} onClick={() => add(product, qty)}><Icon name="bag"/>Adicionar ao carrinho</button></div>
  </Dialog>;
}

export default function Storefront() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryId | 'all'>('all');
  const [selected, setSelected] = useState<Product | null>(null);
  const cartSnapshot = useSyncExternalStore(subscribeToCart, readCartSnapshot, () => '{}');
  const cart = useMemo(() => { try { return sanitizeCart(JSON.parse(cartSnapshot)); } catch { return {}; } }, [cartSnapshot]);
  const setCart: Dispatch<SetStateAction<Cart>> = update => {
    let current: Cart = {};
    try { current = sanitizeCart(JSON.parse(readCartSnapshot())); } catch { /* Recover from malformed storage. */ }
    const next = typeof update === 'function' ? update(current) : update;
    memoryCartSnapshot = JSON.stringify(sanitizeCart(next));
    try { localStorage.setItem(STORAGE_KEY, memoryCartSnapshot); } catch { /* Keep the cart in memory if storage is unavailable. */ }
    window.dispatchEvent(new Event('mg-festas-cart-change'));
  };
  const [cartOpen, setCartOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [invalidRows, setInvalidRows] = useState<Record<string, boolean>>({});
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 4500); return () => clearTimeout(timer); }, [toast]);
  const filtered = products.filter(p => (category === 'all' || p.category === category) && normalize(productLabel(p)).includes(normalize(query)));
  const totals = cartTotals(cart);
  const checkout = whatsappLink(store.whatsapp, cart);
  const anyInvalid = Object.values(invalidRows).some(Boolean);
  function add(product: Product, qty: number) {
    if (!validQuantity(qty)) return;
    if (!validQuantity((cart[product.id] || 0) + qty)) { setToast('Quantidade máxima atingida para este produto.'); return; }
    setCart(current => ({ ...current, [product.id]: (current[product.id] || 0) + qty }));
    setSelected(null);
    setToast(`${qty} unidades de ${product.name} adicionadas ao carrinho.`);
  }
  function browse(nextCategory: CategoryId | 'all' = 'all') { setQuery(''); setCategory(nextCategory); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }); }
  function remove(id: string) { setCart(current => { const next = { ...current }; delete next[id]; return next; }); setInvalidRows(current => { const next = { ...current }; delete next[id]; return next; }); }
  return <>
    <a className={s.skip} href="#produtos">Ir para os produtos</a>
    <div className={s.topbar}><div>{store.instagram ? <a href={store.instagram} target="_blank" rel="noreferrer">Siga a MG FESTAS <Icon name="instagram" size={14}/></a> : <span>Pequenos detalhes, grandes comemorações.</span>}</div><button onClick={() => setHelpOpen(true)}><Icon name="help" size={14}/>Precisa de ajuda?</button></div>
    <header className={s.header}>
      <a href="#" className={s.brand} aria-label="MG FESTAS — início"><Image src="/images/logo.webp" alt="MG FESTAS" width={112} height={112} priority/></a>
      <form className={s.search} role="search" onSubmit={e => { e.preventDefault(); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }); }}><input aria-label="Buscar produtos" placeholder="Busque uma cor ou produto..." value={query} onChange={e => setQuery(e.target.value)}/>{query && <button type="button" className={s.clearSearch} aria-label="Limpar busca" onClick={() => setQuery('')}><Icon name="close" size={16}/></button>}<button className={s.searchButton} aria-label="Pesquisar"><Icon name="search"/></button></form>
      <button className={s.cartButton} onClick={() => { setInvalidRows({}); setCartOpen(true); }} aria-label={`Abrir carrinho, ${totals.units} unidades`}><span className={s.cartIcon}><Icon name="cart" size={28}/>{totals.units > 0 && <span className={s.badge}>{totals.units}</span>}</span><span className={s.cartText}>Meu carrinho<strong>{totals.units} unidades</strong></span></button>
    </header>
    <main className={s.main}>
      <PromoSlider onBrowse={() => browse()} onChristmas={() => { setCategory('topos-de-bolo'); setQuery('Feliz Natal'); document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth' }); }} onSelect={setSelected}/>
      <section className={s.categories} aria-labelledby="categories-title">
        <h2 id="categories-title" className={s.sectionLabel}>CATEGORIAS</h2>
        <div className={s.categoryList}>
          <button className={s.category} aria-pressed={category === 'all'} onClick={() => browse()}><span className={s.categoryPhoto}><Icon name="bag" size={28}/></span><span>Todos os produtos<small>38 opções para sua festa</small></span><span className={s.categoryCheck}>{category === 'all' && <Icon name="check" size={14}/>}</span></button>
          {categories.map(c => <button key={c.id} className={s.category} aria-pressed={category === c.id} onClick={() => browse(c.id)}><span className={s.categoryPhoto}><Image src={c.image} alt="" width={66} height={88}/></span><span>{c.name}<small>{c.detail}</small></span><span className={s.categoryCheck}>{category === c.id && <Icon name="check" size={14}/>}</span></button>)}
        </div>
      </section>
      <section id="produtos" className={s.productsSection} aria-labelledby="products-title">
        <div className={s.sectionHeading}><h2 id="products-title">{category === 'topos-de-bolo' ? 'TOPOS DE BOLO' : category === 'flor-e-borboleta' ? 'FLOR E BORBOLETA KIT' : 'PRODUTOS DE FESTA'}</h2><span aria-live="polite">{filtered.length} {filtered.length === 1 ? 'produto disponível' : 'produtos disponíveis'}</span></div>
        {filtered.length ? <div className={s.grid}>{filtered.map(p => <article key={p.id} className={s.card}><button className={s.cardPhoto} onClick={() => setSelected(p)} aria-label={`Ver ${productLabel(p)}`}><Image src={p.images[0]} alt={productLabel(p)} fill sizes="(max-width: 700px) 45vw, (max-width: 1100px) 29vw, 15vw"/><span className={s.photoColor} style={{ background: p.swatch }}/></button><div className={s.cardBody}><h3>{p.name}<span>{p.color}</span></h3><p>Mínimo: {p.minimum} unidades {p.category === 'flor-e-borboleta' ? 'por cor' : 'por modelo'}</p><button className={s.cardCta} onClick={() => setSelected(p)}>Ver produto <Icon name="plus" size={15}/></button></div></article>)}</div> : <div className={s.empty}><Icon name="search" size={30}/><h3>Nenhum produto encontrado</h3><p>Tente buscar por “rosa”, “parabéns” ou “gratidão”.</p><button className={s.primary} onClick={() => browse()}>Ver todos os produtos</button></div>}
      </section>
      <div className={s.bottomNote}><span><Icon name="bag"/>Seu pedido, do seu jeito</span><p>Combine suas cores e modelos favoritos, monte o carrinho e consulte pelo WhatsApp.</p></div>
    </main>
    <footer className={s.footer}><strong>MG FESTAS</strong><span>Feito para celebrar os seus momentos.</span><button onClick={() => setHelpOpen(true)}>Como comprar <Icon name="arrow" size={15}/></button></footer>
    {selected && <ProductModal key={selected.id} product={selected} onClose={() => setSelected(null)} add={add}/>}
    {cartOpen && <Dialog title="Meu carrinho" drawer onClose={() => setCartOpen(false)}>
      <div className={s.cartContent}>{totals.units ? <><p className={s.cartIntro}>{totals.units} unidades para deixar a festa do seu jeito.</p>{products.filter(p => cart[p.id]).map(p => <div key={p.id} className={s.cartRow}><Image src={p.images[0]} alt={productLabel(p)} width={76} height={102}/><div className={s.cartRowInfo}><h3>{p.name}</h3><p>{p.color}</p><Quantity label={quantityLabel(p)} value={cart[p.id]} onChange={qty => setCart(current => ({ ...current, [p.id]: qty }))} onValidity={valid => setInvalidRows(current => ({ ...current, [p.id]: !valid }))}/></div><button className={s.remove} aria-label={`Remover ${quantityLabel(p)}`} onClick={() => remove(p.id)}><Icon name="trash" size={18}/></button></div>)}</> : <div className={s.empty}><Icon name="bag" size={40}/><h3>Sua festa começa por aqui</h3><p>Escolha suas cores e modelos favoritos e adicione ao carrinho.</p><button className={s.primary} onClick={() => { setCartOpen(false); browse(); }}>Explorar os produtos</button></div>}</div>
      {totals.units > 0 && <div className={s.cartSummary}><div><span>Quantidade total</span><strong>{totals.units} unidades</strong></div><p>Valores, disponibilidade e frete informados pelo WhatsApp.</p>{checkout && !anyInvalid ? <a className={s.primary} href={checkout} target="_blank" rel="noopener noreferrer">Finalizar pelo WhatsApp <Icon name="arrow" size={18}/></a> : <button className={s.primary} disabled>{anyInvalid ? 'Confira as quantidades' : 'Pedidos pelo WhatsApp em breve'}</button>}<button className={s.continue} onClick={() => setCartOpen(false)}>Continuar escolhendo</button></div>}
    </Dialog>}
    {helpOpen && <Dialog title="Como comprar na MG FESTAS" onClose={() => setHelpOpen(false)}><div className={s.help}><p>Escolha as cores e os modelos que combinam com sua festa.</p><ol><li>Abra o produto para conferir as fotografias e os detalhes.</li><li>Selecione pelo menos 10 unidades de cada cor ou modelo. Você pode pedir 11, 12, 13…</li><li>Confira os produtos e as quantidades no carrinho.</li><li>Finalize pelo WhatsApp para consultar valores, disponibilidade e frete com a MG FESTAS.</li></ol><p>Não há pagamento pelo site. Seu pedido é combinado diretamente no atendimento.</p></div></Dialog>}
    <div role="status" aria-live="polite" className={toast ? s.toast : s.srOnly}>{toast && <><Icon name="check"/>{toast}<button onClick={() => { setToast(''); setInvalidRows({}); setCartOpen(true); }}>Ver carrinho</button></>}</div>
  </>;
}

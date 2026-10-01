'use client';
import Image from 'next/image';
import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { products, productLabel, type Product } from '@/lib/catalog';
import Icon from './Icon';
import s from './PromoSlider.module.css';

const christmasProducts = products.filter(product => product.name === 'Topo de bolo Feliz Natal');
const motionQuery = '(prefers-reduced-motion: reduce)';
const slideNames = ['Natal MG FESTAS', 'Sua festa com encanto'];
function subscribeMotion(callback: () => void) {
  const media = window.matchMedia(motionQuery);
  media.addEventListener('change', callback);
  return () => media.removeEventListener('change', callback);
}
function subscribeVisibility(callback: () => void) {
  document.addEventListener('visibilitychange', callback);
  return () => document.removeEventListener('visibilitychange', callback);
}

export default function PromoSlider({ onBrowse, onChristmas, onSelect }: { onBrowse: () => void; onChristmas: () => void; onSelect: (product: Product) => void }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const reducedMotion = useSyncExternalStore(subscribeMotion, () => window.matchMedia(motionQuery).matches, () => true);
  const visible = useSyncExternalStore(subscribeVisibility, () => document.visibilityState === 'visible', () => false);
  useEffect(() => {
    if (!playing || hovered || reducedMotion || !visible) return;
    const timer = window.setInterval(() => setActive(current => (current + 1) % slideNames.length), 8000);
    return () => window.clearInterval(timer);
  }, [playing, hovered, reducedMotion, visible]);
  function select(index: number) { setPlaying(false); setActive((index + slideNames.length) % slideNames.length); }
  return <section className={s.slider} aria-label="Destaques MG FESTAS" aria-roledescription="carrossel"
    onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }} onPointerLeave={() => setHovered(false)}
    onFocusCapture={event => { if (!(event.target instanceof HTMLElement) || !event.target.closest('[data-playback]')) setPlaying(false); }}
    onKeyDown={event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); select(active + (event.key === 'ArrowRight' ? 1 : -1)); } }}
    onTouchStart={event => { const first = event.changedTouches[0]; touch.current = { x: first.clientX, y: first.clientY }; }}
    onTouchEnd={event => { if (!touch.current) return; const last = event.changedTouches[0]; const dx = last.clientX - touch.current.x; const dy = last.clientY - touch.current.y; if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) select(active + (dx < 0 ? 1 : -1)); touch.current = null; }}>
    <div className={s.stage} role="group" aria-roledescription="slide" aria-label={`${active + 1} de ${slideNames.length}: ${slideNames[active]}`}>
      {active === 0 ? <div className={s.christmas}>
        <Image className={s.backdrop} src="/images/banners/christmas-backdrop.webp" alt="" fill sizes="90vw" priority/>
        <div className={s.christmasCopy}><span className={s.eyebrow}>COLEÇÃO DE NATAL · MG FESTAS</span><h1>Um Natal cheio<br/>de encanto.</h1><p>Três topos de bolo para dar um toque especial à sua celebração.</p><button className={s.christmasCta} onClick={onChristmas}>Ver os topos de Natal <Icon name="arrow" size={18}/></button></div>
        <div className={s.christmasProducts} aria-label="Os três modelos de topo de bolo de Natal">{christmasProducts.map((product, index) => <button key={product.id} className={s.product} onClick={() => onSelect(product)} aria-label={`Conhecer ${productLabel(product)}`}><span className={s.productPhoto}><Image src={product.images[0]} alt={productLabel(product)} fill sizes="(max-width: 700px) 27vw, (max-width: 1100px) 18vw, 17vw" priority/></span><span className={s.productCaption}>{['Letras de forma', 'Com gorro natalino', 'Letras cursivas'][index]} <Icon name="plus" size={14}/></span></button>)}</div>
      </div> : <div className={s.everyday}>
        <div className={s.everydayCopy}><span className={s.eyebrow}>PEQUENOS DETALHES, GRANDES FESTAS</span><h1>Sua festa, com<br/>um toque de encanto.</h1><p>Conheça nossos topos de bolo e kits de flores e borboletas. Cores e detalhes para celebrar do seu jeito.</p><button className={s.everydayCta} onClick={onBrowse}>Explorar os produtos <Icon name="arrow" size={18}/></button></div>
        <div className={s.cakePhoto}><Image src="/images/hero-cake.webp" alt="Aplicação ilustrativa: bolo com flores de papel e borboletas rosa-claro" fill sizes="(max-width: 700px) 90vw, 45vw"/><span>Aplicação ilustrativa</span></div>
      </div>}
    </div>
    <div className={s.controls}>
      <button className={s.arrow} aria-label="Banner anterior" onClick={() => select(active - 1)}><Icon name="arrow" size={18} style={{ transform: 'rotate(180deg)' }}/></button>
      <div className={s.pagination}>{slideNames.map((name, index) => <button key={name} className={s.dot} aria-label={`Mostrar banner ${index + 1}: ${name}`} aria-current={active === index ? 'true' : undefined} onClick={() => select(index)}><span/></button>)}<span className={s.counter} aria-live={playing && !reducedMotion ? 'off' : 'polite'}>{active + 1} / {slideNames.length}</span></div>
      <div className={s.rightControls}>{!reducedMotion && <button data-playback className={s.playback} aria-label={playing ? 'Pausar banners automáticos' : 'Retomar banners automáticos'} onClick={() => setPlaying(current => !current)}>{playing ? <span className={s.pauseIcon} aria-hidden="true"/> : <span className={s.playIcon} aria-hidden="true"/>}</button>}<button className={s.arrow} aria-label="Próximo banner" onClick={() => select(active + 1)}><Icon name="arrow" size={18}/></button></div>
    </div>
  </section>;
}

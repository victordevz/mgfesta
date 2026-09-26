'use client';
import { useEffect, useRef, type ReactNode } from 'react';
import Icon from './Icon';
import styles from './Storefront.module.css';
export default function Dialog({ title, onClose, children, drawer = false, wide = false }: { title: string; onClose: () => void; children: ReactNode; drawer?: boolean; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = ref.current!;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    element.showModal(); document.body.style.overflow = 'hidden';
    return () => { element.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`${styles.dialog} ${drawer ? styles.drawer : ''} ${wide ? styles.wideDialog : ''}`} aria-label={title} onCancel={e => { e.preventDefault(); onClose(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) onClose(); } }}>
    <div className={styles.dialogHeader}><h2>{title}</h2><button className={styles.iconButton} aria-label="Fechar" onClick={onClose}><Icon name="close"/></button></div>
    {children}
  </dialog>;
}

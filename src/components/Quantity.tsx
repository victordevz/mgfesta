'use client';
import { useId, useState } from 'react';
import { validQuantity } from '@/lib/cart';
import Icon from './Icon';
import s from './Storefront.module.css';
export default function Quantity({ value, onChange, onValidity, label }: { value: number; onChange: (qty: number) => void; onValidity?: (valid: boolean) => void; label: string }) {
  const [edit, setEdit] = useState({ source: value, text: String(value) }); const id = useId();
  const draft = edit.source === value ? edit.text : String(value);
  const valid = /^\d+$/.test(draft) && validQuantity(Number(draft));
  function update(raw: string) { setEdit({ source: value, text: raw }); const ok = /^\d+$/.test(raw) && validQuantity(Number(raw)); onValidity?.(ok); if (ok) onChange(Number(raw)); }
  return <div><div className={s.quantity}>
    <button aria-label={`Diminuir quantidade de ${label}`} disabled={Number(draft) <= 10 || !valid} onClick={() => update(String(Number(draft) - 1))}><Icon name="minus" size={16}/></button>
    <input aria-label={`Quantidade de ${label}`} inputMode="numeric" type="text" value={draft} maxLength={6} aria-invalid={!valid} aria-describedby={!valid ? id : undefined} onChange={e => update(e.target.value)}/>
    <button aria-label={`Aumentar quantidade de ${label}`} disabled={!valid || Number(draft) >= 999999} onClick={() => update(String(Number(draft) + 1))}><Icon name="plus" size={16}/></button>
  </div>{!valid && <p id={id} className={s.error}>Informe um número inteiro de 10 a 999.999.</p>}</div>;
}

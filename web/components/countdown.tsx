'use client';
import { useEffect, useState } from 'react';
import { countdown } from '@/lib/countdown.mjs';
export default function Countdown() {
  const [values,setValues]=useState<number[]|null>(null);
  useEffect(()=>{const update=()=>setValues(countdown(Date.now()));update();const id=setInterval(update,1000);return()=>clearInterval(id);},[]);
  return <div className="countdown" aria-label="Tiempo hasta el cumpleaños"><p>{values?.every(v=>v===0)?'¡Llegó el día de nuestra aventura!':'Falta muy poquito para vernos'}</p><div>{['Días','Horas','Minutos','Segundos'].map((label,i)=><span key={label}><strong>{values?String(values[i]).padStart(2,'0'):'—'}</strong><small>{label}</small></span>)}</div></div>;
}

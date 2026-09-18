'use client';
import { useEffect, useRef, useState } from 'react';
import { Music2, Pause, Play, Star } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { bindAudio } from '@/lib/audio-player.mjs';

const source = '/music/yo-soy-tu-amigo-fiel.mp3';
const time = (seconds:number) => `${Math.floor(seconds/60)}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
export default function Music() {
  const audio = useRef<HTMLAudioElement>(null);
  const controller = useRef<ReturnType<typeof bindAudio>['controller']|null>(null);
  const [status,setStatus] = useState('loading');
  const [elapsed,setElapsed] = useState(0);
  const [duration,setDuration] = useState(0);
  useEffect(() => {
    if (!audio.current) return;
    const binding = bindAudio(audio.current,setStatus);
    controller.current = binding.controller;
    const cover = document.getElementById('inicio');
    const interact = (event:Event) => {
      if (!event.isTrusted) return;
      if (event instanceof KeyboardEvent && !['Enter',' '].includes(event.key)) return;
      binding.controller.cover();
    };
    cover?.addEventListener('click',interact);
    cover?.addEventListener('keydown',interact);
    return () => {
      cover?.removeEventListener('click',interact);
      cover?.removeEventListener('keydown',interact);
      binding.dispose();
      controller.current = null;
    };
  },[]);
  const playing = status === 'playing';
  const pending = status === 'pending';
  const toggle = () => {
    if (playing || pending) controller.current?.pause();
    else { if (status === 'error') audio.current?.load(); controller.current?.play(); }
  };
  const label = playing?'Pausar música':pending?'Cancelar reproducción':'Reproducir música';
  const message = playing?'Nuestra canción está sonando':pending?'Iniciando nuestra canción…':status==='error'?'No pudimos cargar la canción. Toca para reintentar.':status==='paused'?'Música en pausa':'Toca para escuchar nuestra canción';
  // Background music carries no invitation information; all event details are visible text.
  // oxlint-disable-next-line jsx-a11y/media-has-caption
  const media = <audio ref={audio} src={source} preload="auto" loop
    onTimeUpdate={event=>setElapsed(event.currentTarget.currentTime)}
    onLoadedMetadata={event=>{const value=event.currentTarget.duration;if(Number.isFinite(value))setDuration(value);}}/>;
  return <div className={`record-player ${playing?'is-playing':''}`}>
    {media}
    <div className="record-heading"><Music2 size={17}/><span>NUESTRA CANCIÓN</span><Star size={17}/></div>
    <div className="record-body"><div className="record-disc" aria-hidden="true"><span className="record-center"><Star size={24}/></span></div>
      <div className="record-title"><h3>Yo soy tu amigo fiel</h3><p>Una canción para nuestra aventura</p><div className="sound-bars" aria-hidden="true">{[1,2,3,4,5].map(i=><i key={i}/>)}</div></div>
    </div>
    <div className="record-controls"><button className="record-play" onClick={toggle} aria-label={label} aria-pressed={playing}>{playing?<Pause size={25} fill="currentColor"/>:pending?<Pause size={25}/>:<Play size={25} fill="currentColor"/>}</button><div className="record-progress"><Progress value={duration?Math.min(100,elapsed/duration*100):0} aria-label="Progreso de la canción"/><div className="record-times"><span>{time(elapsed)}</span><span>{time(duration)}</span></div></div></div>
    <p className="record-status" aria-live="polite">{message}</p>
    <button className="floating-music" onClick={toggle} aria-label={label}><Music2 size={18}/><span>{playing?'Pausar música':pending?'Iniciando…':'Escuchar música'}</span>{playing||pending?<Pause size={16}/>:<Play size={16}/>}</button>
  </div>;
}

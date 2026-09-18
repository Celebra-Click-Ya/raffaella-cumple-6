import { CalendarDays, MapPin, Clock3, ArrowUpRight, Gift, Star } from 'lucide-react';
import Image from '@/components/site-image';
import Music from '@/components/music';
import Countdown from '@/components/countdown';

const maps = 'https://maps.app.goo.gl/kSXXsH4W9WSezty98';
const rsvp = 'https://forms.gle/nv7WYBEmmQxffrsR7';
const calendar = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Raffaella+Story+6&dates=20260926T200000Z%2F20260927T030000Z&location=Costanera+654&details=Sexto+cumplea%C3%B1os+de+Raffaella&ctz=America%2FLima';
const activities = [
  ['3:00', 'Recepción al Raffafest', 'Entrega de kits de bienvenida'],
  ['4:00', 'Caritas pintadas', 'Un poquito de color y mucha diversión'],
  ['5:00', 'Estación de fotos', 'Fotos instantáneas para recordar'],
  ['6:00', 'Show sorpresa', '¡Comienza una nueva aventura!'],
  ['7:30', 'AlgoDomanía y candy bar', 'Personaliza tu algodón · snacks'],
  ['9:00', 'Juegos y actividades', 'Inflables para los pequeños vaqueritos'],
];
export default function Home() {
  return <>
    <a className="skip" href="#fiesta">Ir a los datos de la fiesta</a>
    <header className="topbar"><a className="brand" href="#inicio">RAFFAELLA <span>STORY 6</span></a><nav aria-label="Navegación principal"><a href="#fiesta">La fiesta</a><a href="#aventura">Itinerario</a><a className="nav-rsvp" href={rsvp} target="_blank" rel="noopener noreferrer">Confirmar <ArrowUpRight size={16}/></a></nav></header>
    <main>
      <section id="inicio" className="hero" aria-label="Portada de la invitación">
        <div className="hero-copy"><p className="eyebrow"><Star size={14}/> UNA AVENTURA PARA CELEBRAR</p><h1 className="sr-only">Raffaella Story 6 · Mi sexto cumpleaños</h1>
          <Image unoptimized className="hero-logo" src="/art/birthday.webp" alt="Raffaella Story, 6 años" width="1599" height="899" fetchPriority="high"/>
          <p className="hero-intro">Te invito a vivir una aventura en el lejano oeste junto a mis mejores amigos.</p>
          <p className="hero-date">SÁBADO 26 DE SEPTIEMBRE <span>·</span> 3:00 P. M.</p>
          <div className="actions"><a className="button" href={rsvp} target="_blank" rel="noopener noreferrer">¡Yo me apunto! <ArrowUpRight size={18}/></a><a className="text-link" href="#fiesta">Descubre la fiesta ↓</a></div><p className="cover-hint">Toca la portada y acompáñanos con nuestra canción ♪</p>
        </div><div className="portrait"><Image unoptimized className="portrait-photo" src="/art/photo.webp" alt="Raffaella vestida de vaquerita para su sexto cumpleaños" width="1599" height="1459"/><Image unoptimized className="portrait-rope" src="/art/heart.webp" alt="" width="1024" height="770"/><span className="portrait-caption">Nuestra vaquerita cumple 6</span></div>
      </section>
      <div className="ribbon">JESSIE, WOODY Y BUZZ YA ESTÁN LISTOS <Star size={18}/> ¡AHORA SOLO FALTAS TÚ!</div>
      <section id="fiesta" className="section fiesta"><p className="eyebrow">RESERVA ESTE DÍA</p><h2>¡Nos vemos en el Raffafest!</h2><p className="section-lead">Cada juguete tiene un lugar en esta historia… y tú también.</p>
        <div className="event-board"><article><CalendarDays/><h3>Fecha</h3><strong>Sábado 26</strong><p>Septiembre de 2026</p></article><article><Clock3/><h3>Hora</h3><strong>3:00 p. m.</strong><p>¡Llega listo para la aventura!</p></article><article><MapPin/><h3>Lugar</h3><strong>Costanera 654</strong><p>Frente a Yawar Toro Restobar</p><a href={maps} target="_blank" rel="noopener noreferrer">Cómo llegar <ArrowUpRight size={16}/></a></article></div>
        <Countdown/><div className="actions centered"><a className="button" href={maps} target="_blank" rel="noopener noreferrer"><MapPin size={18}/> Ver ubicación</a><a className="button secondary" href={calendar} target="_blank" rel="noopener noreferrer"><CalendarDays size={18}/> Agendar fecha</a></div>
      </section>
      <section className="section song"><div><p className="eyebrow">LA BANDA SONORA DE NUESTRA HISTORIA</p><h2>Yo soy tu amigo fiel</h2><p>Ponte tu sombrero, escucha nuestra canción y prepárate para celebrar.</p></div><Music/></section>
      <section id="aventura" className="section itinerary"><p className="eyebrow">DE PRINCIPIO A FIN, PURA DIVERSIÓN</p><h2>El plan de la aventura</h2><div className="timeline">{activities.map(([hour,title,description],i)=><article key={hour}><span className="step">0{i+1}</span><time>{hour} <small>P. M.</small></time><h3>{title}</h3><p>{description}</p></article>)}</div></section>
      <section className="section extras"><div className="dress"><Image unoptimized src="/art/friends.webp" alt="Woody y Jessie listos para la fiesta" width="574" height="800" loading="lazy"/><div><p className="eyebrow">DRESS CODE</p><h2>¡Saca tu lado vaquero!</h2><p>Ven con tu traje de vaquero o vaquera. Un sombrero, unas botas y muchas ganas de divertirte.</p></div></div><div className="gifts"><Gift size={32}/><p className="eyebrow">HASTA EL INFINITO Y MÁS ALLÁ</p><h2>Un detalle para Raffaella</h2><p>Tu presencia es lo más valioso para nosotros. Si deseas tener un detalle con nuestra vaquerita, aquí encontrarás algunas ideas.</p><a className="text-link" href="https://arlethcumple4.my.canva.site/raffaella-regalos" target="_blank" rel="noopener noreferrer">Ver sugerencias de regalos <ArrowUpRight size={18}/></a></div></section>
      <section className="section confirm"><p className="eyebrow">¡NO DEJES A LOS JUGUETES ESPERANDO!</p><h2>Esta historia está mejor contigo.</h2><p>Confirma tu asistencia antes del <strong>23 de septiembre de 2026</strong>.</p><a className="button" href={rsvp} target="_blank" rel="noopener noreferrer">Confirmar asistencia <ArrowUpRight size={20}/></a><p className="capacity">Aforo limitado · Regístrate a tiempo para la comodidad y seguridad de nuestros pequeños vaqueritos.</p></section>
    </main><footer><Image unoptimized src="/art/logo.webp" alt="Raffaella Story 6" width="1599" height="899" loading="lazy"/><p>¡Te esperamos para celebrar hasta el infinito y más allá!</p><a href="#inicio">Volver arriba ↑</a></footer>
  </>;
}

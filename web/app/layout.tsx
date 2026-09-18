import type { Metadata } from 'next';
import './globals.css';
import './music.css';
export const metadata: Metadata = {title:'Raffaella Story 6 · ¡Estás invitado!',description:'Celebremos los 6 años de Raffaella. Sábado 26 de septiembre de 2026, 3:00 p. m., Costanera 654.'};
export default function RootLayout({children}:{children:React.ReactNode}) {return <html lang="es"><body>{children}</body></html>;}

import Header from '@/components/Header';
import Hero from '@/components/Hero';
import AboutUs from '@/components/AboutUs';
import Packages from '@/components/Packages';
import Gallery from '@/components/Gallery';
import Booking from '@/components/Booking';
import ChatWidget from '@/components/ChatWidget';

export const metadata = {
  title: 'Number One Clean | Limpieza de Salas, Colchones y Alfombras',
  description: 'Especialistas en limpieza profunda de salas, colchones y alfombras en Huixquilucan. Eliminamos ácaros, manchas y olores con tecnología de inyección-succión.',
};

export default function Home() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '80px' }}>
        <Hero />
        <AboutUs />
        <Packages />
        <Gallery />
        <Booking />
      </main>
      <ChatWidget />
    </>
  );
}


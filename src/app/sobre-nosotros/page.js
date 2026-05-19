import Header from '@/components/Header';
import AboutUs from '@/components/AboutUs';
import ChatWidget from '@/components/ChatWidget';

export const metadata = {
  title: 'Sobre Nosotros | Number One Clean',
  description: 'Conoce más sobre la esencia de Number One Clean: nuestra misión, visión, valores, historia y concepto de limpieza profesional de tapicería.',
};

export default function SobreNosotrosPage() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: '130px', minHeight: 'calc(100vh - 130px)' }}>
        <AboutUs />
      </main>
      <ChatWidget />
    </>
  );
}

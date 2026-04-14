'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Download, ArrowLeft, Image as ImageIcon, Share2, Send } from 'lucide-react';
import Link from 'next/link';
import styles from './Flyers.module.css';

const staticFlyers = [
  { title: 'Hogar Saludable (Imagen)', src: '/flyer_hogar_saludable.png', date: 'V3' },
  { title: 'Lavado Profundo', src: '/flyer_lavado_profundo_v3.jpg', date: 'V3' },
  { title: 'Limpieza Profunda Final', src: '/flyer_limpieza_profunda_final.png', date: 'Final' }
];

export default function FlyersPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backBtn}>
          <ArrowLeft size={20} /> Volver a la web
        </Link>
        <h1 className={styles.title}>Marketing & Flyers</h1>
        <p className={styles.subtitle}>Gestión de materiales promocionales para Number One Clean</p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Flyer Interactivo (v4)</h2>
          <span className={styles.badge}>RECOMENDADO</span>
        </div>
        <div className={styles.cardMain}>
          <div className={styles.previewContainer}>
            <iframe src="/flyer-v4" className={styles.previewIframe} />
          </div>
          <div className={styles.cardDetails}>
            <h3>Hogar Saludable v4</h3>
            <p>Este flyer vive en la web. Es totalmente editable, dinámico y optimizado para ser compartido por WhatsApp o Redes Sociales.</p>
            <div className={styles.actions}>
              <Link href="/flyer-v4" target="_blank" className={styles.primaryBtn}>
                <ExternalLink size={18} /> Abrir
              </Link>
              <button 
                className={styles.shareBtn}
                onClick={() => {
                  const msg = encodeURIComponent("¡Hola! Te comparto nuestros paquetes de limpieza profunda de Number One Clean. Mira el flyer aquí: " + window.location.origin + "/flyer-v4");
                  window.open(`https://wa.me/?text=${msg}`, "_blank");
                }}
              >
                <Share2 size={18} /> Compartir por WhatsApp
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Histórico de Flyers (Imágenes)</h2>
        <div className={styles.grid}>
          {staticFlyers.map((flyer, i) => (
            <motion.div 
              key={i} 
              className={styles.flyerCard}
              whileHover={{ y: -5 }}
            >
              <div className={styles.imgWrapper}>
                <img src={flyer.src} alt={flyer.title} />
              </div>
              <div className={styles.flyerInfo}>
                <h4>{flyer.title}</h4>
                <span className={styles.dateBadge}>{flyer.date}</span>
                <a href={flyer.src} download className={styles.downloadBtn}>
                  <Download size={16} /> Descargar
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

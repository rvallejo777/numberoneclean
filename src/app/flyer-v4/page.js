'use client';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Heart, Sparkles, Phone, MessageCircle } from 'lucide-react';
import styles from './Flyer.module.css';

const packages = [
  { name: 'Limpieza de Sala (2 piezas)', price: '$1200', desc: 'Eliminación total de manchas y olores' },
  { name: 'Limpieza de Colchón', price: '$499', desc: 'Tratamiento profundo anti-ácaros' },
  { name: 'Limpieza de Alfombra / Tapete', price: '$599', desc: 'Desinfección de fibras profundas' }
];

export default function FlyerV4() {
  return (
    <div className={styles.flyerContainer}>
      <motion.div 
        className={styles.flyerCard}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className={styles.versionBadge}>Versión 4.0</div>
        
        <header className={styles.header}>
          <div className={styles.logoArea}>
             <Sparkles size={40} color="#73B3E7" />
          </div>
          <h1 className={styles.title}>HOGAR SALUDABLE</h1>
          <p className={styles.subtitle}>Number One Clean • Huixquilucan</p>
        </header>

        <main className={styles.content}>
          <h2 className={styles.promoTitle}>¡Haz de tu espacio el Número Uno!</h2>
          
          <div className={styles.packageGrid}>
            {packages.map((pkg, i) => (
              <motion.div 
                key={i} 
                className={styles.packageCard}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
              >
                <div className={styles.packageInfo}>
                  <h4>{pkg.name}</h4>
                  <p>{pkg.desc}</p>
                </div>
                <div className={styles.price}>
                  {pkg.price}<span> desde</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className={styles.features}>
            <div className={styles.featureItem}>
              <ShieldCheck className={styles.featureIcon} size={18} />
              <span>Tecnología Italiana</span>
            </div>
            <div className={styles.featureItem}>
              <Heart className={styles.featureIcon} size={18} />
              <span>Bio-Degradable</span>
            </div>
            <div className={styles.featureItem}>
              <Sparkles className={styles.featureIcon} size={18} />
              <span>Secado Rápido</span>
            </div>
            <div className={styles.featureItem}>
              <Check className={styles.featureIcon} size={18} />
              <span>Garantía 100%</span>
            </div>
          </div>
        </main>

        <footer className={styles.footer}>
          <div className={styles.contactBox}>
            <Phone size={20} color="#114A8B" />
            <span className={styles.phone}>55 2728 7727</span>
          </div>
          <p className={styles.location}>Servicio en Huixquilucan y alrededores</p>
          
          <button className={styles.cta} onClick={() => window.open('https://wa.me/525527287727', '_blank')}>
            <MessageCircle size={22} />
            Agendar por WhatsApp
          </button>
        </footer>
      </motion.div>
    </div>
  );
}

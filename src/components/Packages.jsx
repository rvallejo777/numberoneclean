'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import styles from './Packages.module.css';

const packages = [
  {
    title: 'Limpieza de Sala (2 piezas)',
    price: '$1200',
    features: ['Inyección y Succión Profunda', 'Desinfección Anti-Ácaros', 'Eliminación de Malos Olores', 'Secado Rápido', 'Eliminación de Manchas Superficiales'],
    popular: true,
    promo: '¡Promoción por Apertura!'
  },
  {
    title: 'Limpieza de Alfombra (cotizacion por m2) / Tapete (distintos tamaños)',
    price: '$599',
    features: ['Lavado a Presión Controlada', 'Shampoo Hipoalergénico', 'Restauración de Volumen', 'Secado sin Humedad', 'Protección contra polvo'],
    popular: false,
    promo: 'Dile adiós a las alergias'
  },
  {
    title: 'Limpieza de Colchón',
    price: '$499',
    features: ['Lavado Profundo 360°', 'Tratamiento Especial Anti-Chinches', 'Neutralización de Olores', 'Sanitización UV', 'Secado Express'],
    popular: false,
    promo: 'Duerme sin ácaros'
  }
];

export default function Packages() {
  return (
    <section id="packages" className={styles.packagesSection}>
      <div className={styles.container}>
        <motion.h2 
          className="title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontSize: '2.5rem' }}
        >
          Nuestros Paquetes
        </motion.h2>
        <motion.p 
          className="subtitle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: '3rem', fontSize: '1.2rem' }}
        >
          Calidad premium garantizada. Elige el servicio ideal para ti.
        </motion.p>

        <div className={styles.grid}>
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className={`glass ${styles.card} ${pkg.popular ? styles.popular : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              {pkg.popular && <span className={styles.badge}>Más Solicitado</span>}
              {pkg.promo && <span className={styles.promoBadge}>{pkg.promo}</span>}
              <h3 className={styles.cardTitle}>{pkg.title}</h3>
              <div className={styles.price}>{pkg.price}<span>/ desde</span></div>
              <ul className={styles.featuresList}>
                {pkg.features.map((feature, i) => (
                  <li key={i}><Check size={18} className={styles.checkIcon} /> {feature}</li>
                ))}
              </ul>
              <a href="#booking" className={styles.bookBtn}>Agendar Ahora</a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bubbles}>
        {[...Array(35)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.bubble}
            initial={{ 
              y: "110vh", 
              opacity: 0, 
              scale: Math.random() + 0.3,
              left: (Math.random() * 100) + "%" 
            }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.8, 0],
              x: Math.random() * 150 - 75
            }}
            transition={{ 
              duration: Math.random() * 7 + 8, 
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      <div className={`glass ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.flyerContainer}
        >
          <Image src="/flyer.png" alt="Number One Clean Flyer" width={500} height={400} className={styles.flyerImg} priority />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.3, duration: 0.8 }}
           className={styles.titleContainer}
        >
          <Image 
            src="/header-logo.jpg" 
            alt="Number One Clean - Limpieza Profesional" 
            width={400} 
            height={150} 
            className={styles.titleLogo}
          />
        </motion.div>
        
        <motion.p 
          className={styles.description}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Especialistas en Salas, Colchones y Alfombras en Huixquilucan y alrededores. 
          Eliminamos ácaros, manchas y olores previniendo alergias con nuestra tecnología de inyección-succión.
        </motion.p>
        
        <motion.div 
          className={styles.actions}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <a href="#booking" className={styles.primaryBtn}>Agendar Cita Rápidamente</a>
          <a href="#packages" className={styles.secondaryBtn}>Ver Paquetes</a>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ZoomIn } from 'lucide-react';
import Image from 'next/image';
import styles from './Gallery.module.css';

const photos = [
  '/fotos/081570c7-9300-4573-86e5-8141c183cfe9.jpg',
  '/fotos/0ef28c1e-75f6-4287-876f-33973dcb94a6.jpg',
  '/fotos/1c93d0e5-20ed-4434-b260-f0691c9b9dea.jpg',
  '/fotos/44daba55-5c3f-4618-974f-1befc8e96a24.jpg',
  '/fotos/72478e52-78d9-4570-a87d-1909408b9d5a.jpg',
  '/fotos/787b14cd-f8c0-4c50-806e-47325bfc88c6.jpg',
  '/fotos/8a1aa07f-1789-4a12-9f7c-d8db84236fdf.jpg',
  '/fotos/95d55e53-8c39-4b7b-a618-e619a41b5adf.jpg',
  '/fotos/b3e82c8d-1387-408d-87fc-2d8e3fce2de4.jpg',
  '/fotos/e49eebee-c74c-43f5-b864-b01732aaf3bc.jpg',
];

const videos = [
  '/videos/WhatsApp Video 2026-05-13 at 10.48.20 PM.mp4',
  '/videos/WhatsApp Video 2026-05-13 at 10.48.20 PM (1).mp4',
  '/videos/WhatsApp Video 2026-05-13 at 10.48.20 PM (2).mp4',
  '/videos/WhatsApp Video 2026-05-13 at 10.48.20 PM (3).mp4',
  '/videos/WhatsApp Video 2026-05-13 at 10.48.20 PM (4).mp4',
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className={styles.galleryWrapper}>
      {/* Photos Section */}
      <section id="fotos" className={styles.section}>
        <div className={styles.container}>
          <motion.h2 
            className="title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}
          >
            Galería de Fotos
          </motion.h2>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}
          >
            Resultados reales de nuestros servicios de limpieza profunda en salas, colchones y alfombras.
          </motion.p>

          <div className={styles.grid}>
            {photos.map((src, index) => (
              <motion.div
                key={index}
                className={styles.card}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedPhoto(src)}
              >
                <div className={styles.imageContainer}>
                  <Image 
                    src={src} 
                    alt={`Limpieza Number One ${index + 1}`} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className={styles.image}
                    unoptimized
                  />
                  <div className={styles.overlay}>
                    <ZoomIn size={32} className={styles.icon} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className={styles.sectionDark}>
        <div className={styles.container}>
          <motion.h2 
            className="title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: '2.5rem', textAlign: 'center', color: 'var(--white)', marginBottom: '1rem' }}
          >
            Videos de Demostración
          </motion.h2>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginBottom: '3rem', fontSize: '1.1rem' }}
          >
            Observa nuestra tecnología de inyección y succión en acción eliminando la mugre más difícil.
          </motion.p>

          <div className={styles.videoGrid}>
            {videos.map((src, index) => (
              <motion.div
                key={index}
                className={`glass ${styles.videoCard}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.videoContainer}>
                  <video 
                    src={src} 
                    className={styles.video} 
                    controls
                    preload="metadata"
                    playsInline
                  />
                </div>
                <div className={styles.videoInfo}>
                  <Play size={20} className={styles.playIcon} />
                  <span>Demostración de Lavado #{index + 1}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <button className={styles.closeButton} onClick={() => setSelectedPhoto(null)}>
              <X size={32} />
            </button>
            <motion.div 
              className={styles.lightboxImageContainer}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedPhoto} alt="Zoom Limpieza" className={styles.lightboxImage} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

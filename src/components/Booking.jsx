'use client';
import { motion } from 'framer-motion';
import styles from './Booking.module.css';

export default function Booking() {
  return (
    <section id="booking" className={styles.bookingSection}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="title" style={{ textAlign: 'center', fontSize: '2.5rem' }}>Agenda tu Cita</h2>
        <p className="subtitle" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Selecciona el día y la hora que mejor te acomode. (Si completas el proceso, te contactaremos).
        </p>
        
        <div className={styles.calendlyContainer}>
          {/* Componente visual simulado por si no hay cuenta de calendly real en el iframe, 
              o bien el iframe de la cuenta real. Aquí se implementaría el script oficial de Calendly. */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
             <h3>[Calendario de Reservas]</h3>
             <p style={{ color: '#64748b', marginTop: '1rem' }}>Aquí se integrará tu widget de Calendly para que los clientes elijan su espacio disponible automáticamente.</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

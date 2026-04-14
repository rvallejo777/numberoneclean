'use client';
import { motion } from 'framer-motion';
import { InlineWidget } from 'react-calendly';
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
          <InlineWidget 
            url="https://calendly.com/numberonecleanmx/visita" 
            styles={{
              height: '700px',
              width: '100%'
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

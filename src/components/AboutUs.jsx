'use client';
import { useState } from 'react';
import styles from './AboutUs.module.css';

export default function AboutUs() {
  const [openSection, setOpenSection] = useState('mision');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>Sobre Nosotros</h2>
        <p className={styles.subtitle}>Conoce más sobre la esencia de Number One Clean</p>
        
        <div className={styles.accordionContainer}>
          {/* Misión y Visión */}
          <div className={`${styles.accordionItem} ${openSection === 'mision' ? styles.active : ''}`}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection('mision')}
            >
              <h3>Misión y Visión</h3>
              <span className={styles.icon}>{openSection === 'mision' ? '−' : '+'}</span>
            </button>
            <div className={styles.accordionContentWrapper} style={{ maxHeight: openSection === 'mision' ? '800px' : '0' }}>
              <div className={styles.accordionContent}>
                <div className={styles.contentBlock}>
                  <h4>Misión</h4>
                  <p>Brindar servicios de limpieza de tapicería con los más altos estándares de calidad, utilizando tecnología especializada para transformar espacios y superar las expectativas de nuestros clientes, posicionándonos como su opción número uno en confianza y resultados.</p>
                </div>
                <div className={styles.contentBlock}>
                  <h4>Visión</h4>
                  <p>Ser la marca líder en limpieza de tapicería en México, reconocida por su innovación, calidad y confianza, convirtiéndonos en la primera opción de las personas al momento de cuidar y renovar sus espacios.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Valores */}
          <div className={`${styles.accordionItem} ${openSection === 'valores' ? styles.active : ''}`}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection('valores')}
            >
              <h3>Nuestros Valores</h3>
              <span className={styles.icon}>{openSection === 'valores' ? '−' : '+'}</span>
            </button>
            <div className={styles.accordionContentWrapper} style={{ maxHeight: openSection === 'valores' ? '500px' : '0' }}>
              <div className={styles.accordionContent}>
                <ul className={styles.valuesList}>
                  <li><strong>Calidad:</strong> Excelencia en cada detalle.</li>
                  <li><strong>Confianza:</strong> Seguridad en nuestro servicio.</li>
                  <li><strong>Cuidado:</strong> Tratamos tus espacios como propios.</li>
                  <li><strong>Innovación:</strong> Tecnología de punta en limpieza.</li>
                  <li><strong>Bienestar:</strong> Ambientes saludables y frescos.</li>
                  <li><strong>Compromiso:</strong> Resultados que superan expectativas.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Narrativa de Negocio */}
          <div className={`${styles.accordionItem} ${openSection === 'narrativa' ? styles.active : ''}`}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection('narrativa')}
            >
              <h3>Narrativa de Negocio</h3>
              <span className={styles.icon}>{openSection === 'narrativa' ? '−' : '+'}</span>
            </button>
            <div className={styles.accordionContentWrapper} style={{ maxHeight: openSection === 'narrativa' ? '800px' : '0' }}>
              <div className={styles.accordionContent}>
                <p>Number One Clean es un servicio especializado en la limpieza de tapicería, diseñado para transformar y renovar los espacios donde vives y trabajas. A través de tecnología profesional y el uso de maquinaria especializada, ofrece soluciones efectivas para sillones, interiores y mobiliario en hogares, pequeños negocios y espacios como casinos.</p>
                <p>Number One Clean no solo limpia: redefine la sensación de tu entorno. Su objetivo es convertirse en la opción número uno para sus clientes, ese servicio de confianza al que siempre vuelven, asegurando que cada espacio se sienta fresco, cuidado y en armonía. Porque cuando todo está en su mejor estado, tu espacio también se convierte en tu mejor versión.</p>
              </div>
            </div>
          </div>

          {/* Storytelling y Concepto */}
          <div className={`${styles.accordionItem} ${openSection === 'storytelling' ? styles.active : ''}`}>
            <button 
              className={styles.accordionHeader} 
              onClick={() => toggleSection('storytelling')}
            >
              <h3>Nuestra Historia y Concepto</h3>
              <span className={styles.icon}>{openSection === 'storytelling' ? '−' : '+'}</span>
            </button>
            <div className={styles.accordionContentWrapper} style={{ maxHeight: openSection === 'storytelling' ? '800px' : '0' }}>
              <div className={styles.accordionContent}>
                <div className={styles.contentBlock}>
                  <h4>Storytelling</h4>
                  <p>Los espacios donde vives y trabajas cuentan tu historia. Con el tiempo, pierden frescura, comodidad y vida.</p>
                  <p>Number One Clean nace para devolverles todo eso. A través de limpieza especializada, transforma tu tapicería y renueva cada espacio, haciéndolo sentir como nuevo.</p>
                  <p>Porque no se trata solo de limpiar, sino de recuperar la esencia de tu entorno y convertirlo en un lugar al que siempre quieras volver. Un lugar que se sienta como el número uno para ti.</p>
                </div>
                <div className={styles.contentBlock}>
                  <h4>Concepto</h4>
                  <p className={styles.highlightText}>Haz de tu espacio, el número uno.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

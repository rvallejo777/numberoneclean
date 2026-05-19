'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <a href="#">
            <Image 
              src="/logo.jpg" 
              alt="Number One Clean Logo" 
              width={140} 
              height={50} 
              className={styles.logo}
              priority
            />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            <li>
              <a href="#fotos" className={styles.navLink}>Fotos</a>
            </li>
            <li>
              <a href="#videos" className={styles.navLink}>Videos</a>
            </li>
            <li>
              <a href="#packages" className={styles.navLink}>Paquetes</a>
            </li>
            <li>
              <a href="#booking" className={`${styles.navLink} ${styles.cta}`}>Agendar</a>
            </li>
          </ul>
        </nav>

        {/* Hamburger Menu Button */}
        <button 
          className={styles.hamburger} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className={`${styles.mobileMenu} glass`}>
            <ul className={styles.mobileNavList}>
              <li>
                <a 
                  href="#fotos" 
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fotos
                </a>
              </li>
              <li>
                <a 
                  href="#videos" 
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Videos
                </a>
              </li>
              <li>
                <a 
                  href="#packages" 
                  className={styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Paquetes
                </a>
              </li>
              <li>
                <a 
                  href="#booking" 
                  className={`${styles.mobileNavLink} ${styles.mobileCta}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Agendar Cita
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}

'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Phone } from 'lucide-react';
import styles from './ChatWidget.module.css';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '¡Hola! Soy tu asistente en línea. ¿Necesitas ayuda para limpiar tu sala, colchón o alfombra?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [leadCaptured, setLeadCaptured] = useState(null);
  
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || leadCaptured) return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages
        })
      });
      const data = await res.json();
      
      if (data.response) {
        let text = data.response;
        
        // Extract lead data dynamically
        const match = text.match(/\[LEAD_CAPTURED:\s*(.*?)\s*\|\|\s*(.*?)\s*\]/);
        if (match) {
           const leadName = match[1];
           const leadService = match[2];
           text = text.replace(/\[LEAD_CAPTURED:.*\]/, '').trim();
           
           await fetch('/api/leads', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ name: leadName, service: leadService, priority: 'Alta' })
           });

           setLeadCaptured({ name: leadName, service: leadService });
        }

        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hubo un problema de conexión. ¿Puedes intentar de nuevo?' }]);
    } finally {
      setLoading(false);
    }
  };

  const openWhatsApp = () => {
      const message = `¡Hola Number One Clean! Soy ${leadCaptured.name}. Me interesa su servicio de: ${leadCaptured.service}. Vi su Landing Page y quiero información.`;
      const phone = "525527287727"; // Tu número de WhatsApp registrado
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={`glass ${styles.chatContainer}`}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
          >
            <div className={styles.header}>
              <div>
                <h4 style={{ color: 'white', margin: 0 }}>Number One IA</h4>
                <small style={{ color: '#e2e8f0' }}>En línea</small>
              </div>
              <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>
            
            <div className={styles.messagesContainer}>
              {messages.map((msg, idx) => (
                <div key={idx} className={`${styles.messageWrapper} ${msg.role === 'user' ? styles.wrapperRight : styles.wrapperLeft}`}>
                  <div className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.assistantMsg}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className={`${styles.messageWrapper} ${styles.wrapperLeft}`}>
                  <div className={`${styles.message} ${styles.assistantMsg}`}>
                    <span className={styles.typing}>Escribiendo...</span>
                  </div>
                </div>
              )}
              {leadCaptured && (
                 <motion.div 
                   className={styles.waPrompt}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                 >
                    <p style={{ fontWeight: 'bold' }}>¡Genial! Solo falta un paso.</p>
                    <p style={{ fontSize: '0.9rem', marginBottom: '1rem', color: '#475569' }}>Da clic abajo para contactarnos en WhatsApp y confirmar tu servicio.</p>
                    <button onClick={openWhatsApp} className={styles.waBtn}>
                       <Phone size={18} /> Continuar en WhatsApp
                    </button>
                 </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu mensaje..."
                className={styles.input}
                disabled={leadCaptured !== null}
              />
              <button 
                onClick={handleSend} 
                className={styles.sendBtn}
                disabled={!input.trim() || leadCaptured !== null}
                title="Enviar"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        className={styles.fab}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <MessageCircle size={28} />
      </motion.button>
    </>
  );
}

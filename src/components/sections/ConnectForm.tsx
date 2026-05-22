"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ConnectForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulate API call to save message
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="connect" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
            Leave a <span className="text-gradient">Love Letter</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            Let's connect and plant the seeds for something amazing.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-panel"
          style={{ padding: '3rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
        >
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>Name</label>
            <input 
              required
              type="text" 
              placeholder="Your name"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'rgba(255,255,255,0.5)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-primary)',
                transition: 'var(--transition-smooth)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>Email</label>
            <input 
              required
              type="email" 
              placeholder="Your email address"
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'rgba(255,255,255,0.5)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-primary)',
                transition: 'var(--transition-smooth)'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>Message</label>
            <textarea 
              required
              placeholder="What's on your mind?"
              rows={4}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'rgba(255,255,255,0.5)',
                outline: 'none',
                fontFamily: 'var(--font-body)',
                color: 'var(--color-text-primary)',
                resize: 'vertical',
                transition: 'var(--transition-smooth)'
              }}
            />
          </div>
          <button 
            disabled={status !== 'idle'}
            type="submit"
            style={{
              background: status === 'success' ? '#85B8A1' : 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: status === 'idle' ? 'pointer' : 'default',
              boxShadow: '0 4px 15px rgba(242, 181, 212, 0.4)',
              transition: 'var(--transition-smooth)',
              marginTop: '1rem'
            }}
          >
            {status === 'idle' ? 'Send Message' : status === 'submitting' ? 'Sending...' : 'Message Sent! 🌸'}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

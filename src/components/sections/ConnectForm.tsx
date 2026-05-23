"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import siteConfig from '@/data/site_config.json';
import { submitContactForm } from '@/app/actions';

export default function ConnectForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const res = await submitContactForm({ name, email, message });
      if (res.success) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('idle');
      }
    } catch {
      setStatus('idle');
    }
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
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: siteConfig.sections.contact.title.replace(/ (.*?)$/, ' <span class="text-gradient">$1</span>') }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            {siteConfig.sections.contact.subtitle}
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
              value={name}
              onChange={e => setName(e.target.value)}
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
              value={email}
              onChange={e => setEmail(e.target.value)}
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
              value={message}
              onChange={e => setMessage(e.target.value)}
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
            className="glass-pill"
            style={{
              padding: '1rem',
              width: '100%',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: status === 'idle' ? 'pointer' : 'default',
              marginTop: '1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: status === 'success' ? 'rgba(181, 210, 222, 0.4)' : undefined,
              color: status === 'success' ? 'var(--color-text-primary)' : undefined,
            }}
          >
            {status === 'idle' ? siteConfig.sections.contact.buttonText : status === 'submitting' ? 'Sending...' : siteConfig.sections.contact.successText}
          </button>
        </motion.form>
      </div>
    </section>
  );
}

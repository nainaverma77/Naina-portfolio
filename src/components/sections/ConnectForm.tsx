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
      // 1. Save to Database (MongoDB)
      const res = await submitContactForm({ name, email, message });
      
      // 2. Send email via Web3Forms
      const web3formsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
      if (web3formsKey) {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3formsKey,
            subject: `New Contact Message from ${name} (Portfolio)`,
            name: name,
            email: email,
            message: message,
          }),
        });
      }

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
    <section id="connect" className="px-4 py-16 md:px-8 md:py-24 relative z-10">
      <div className="w-full max-w-2xl mx-auto">
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
          className="glass-panel p-6 md:p-12 flex flex-col gap-6"
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

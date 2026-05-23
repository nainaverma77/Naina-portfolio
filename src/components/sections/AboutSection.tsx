"use client";

import React from 'react';
import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolio.json';
import siteConfig from '@/data/site_config.json';
import { User, MapPin, Briefcase, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const { about } = portfolioData;

  return (
    <section id="about" style={{ padding: '6rem 2rem', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: siteConfig.sections.about.title.replace(/ (.*?)$/, ' <span class="text-gradient">$1</span>') }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            {siteConfig.sections.about.subtitle}
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '3rem',
          alignItems: 'center'
        }}>
          {/* Avatar / Visual Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}
          >
            <div className="glass-panel" style={{ 
              width: '100%', 
              maxWidth: '420px', 
              aspectRatio: '1 / 1',
              margin: '0 auto',
              borderRadius: '50% 50% 50% 10%', 
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, rgba(226, 194, 216, 0.4), rgba(181, 210, 222, 0.4))',
              boxShadow: '0 15px 35px rgba(226, 194, 216, 0.3)'
            }}>
              {about.avatarUrl ? (
                <img src={about.avatarUrl} alt={about.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ fontSize: '5rem', color: 'var(--color-primary)' }}>❁</div>
              )}
            </div>
            
            {/* Status Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '20px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                border: '1px solid var(--color-primary-light)'
              }}
            >
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 10px #4ade80' }} />
              <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>{about.status || 'Available'}</span>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-panel"
            style={{ padding: '3rem' }}
          >
            <h3 style={{ fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
              Hi, I'm <span className="text-gradient">{about.name}</span>
            </h3>
            <h4 style={{ fontSize: '1.25rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: 500 }}>
              {about.role}
            </h4>
            
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem' }}>
              {about.bio}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(226, 194, 216, 0.2)', borderRadius: '8px', color: 'var(--color-primary)' }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>Location</div>
                  <div style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{about.location || 'Remote'}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(181, 210, 222, 0.2)', borderRadius: '8px', color: 'var(--color-secondary)' }}>
                  <Sparkles size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)', fontWeight: 600 }}>Specialization</div>
                  <div style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>{about.specialization || 'Full Stack Development'}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Operational Summary Cards */}
        {about.summaryCards && about.summaryCards.length > 0 && (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem', 
            marginTop: '4rem' 
          }}>
            {about.summaryCards.map((card: any, idx: number) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel" 
                style={{ 
                  padding: '2rem', 
                  borderTop: '4px solid var(--color-rose-gold)',
                  transition: 'var(--transition-smooth)'
                }}
                whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(184, 138, 114, 0.2)' }}
              >
                <h5 style={{ fontSize: '1.25rem', color: 'var(--color-text-primary)', marginBottom: '0.75rem', fontWeight: 600 }}>{card.title}</h5>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{card.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

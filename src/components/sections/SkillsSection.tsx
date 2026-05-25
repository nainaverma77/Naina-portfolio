"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/components/ui/PortfolioProvider';
import siteConfig from '@/data/site_config.json';

export default function SkillsSection() {
  const portfolioData = usePortfolio();
  return (
    <section id="skills" className="px-4 py-16 md:px-8 md:py-24 relative z-10">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: siteConfig.sections.skills.title.replace(/ (.*?)$/, ' <span class="text-gradient">$1</span>') }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            {siteConfig.sections.skills.subtitle}
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '2rem' 
        }}>
          {portfolioData.skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 12px 40px rgba(230, 168, 215, 0.25)' }}
              className="glass-panel"
              style={{
                padding: '2rem',
                textAlign: 'center',
                transition: 'var(--transition-smooth)'
              }}
            >
              <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-text-primary)' }}>
                {skill.name}
              </h3>
              <div style={{
                background: 'rgba(44, 48, 46, 0.15)',
                borderRadius: '9999px',
                height: '8px',
                width: '100%',
                overflow: 'hidden',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)'
              }}>
                <motion.div
                  initial={{ width: 0, backgroundPosition: '200% center' }}
                  whileInView={{ width: `${skill.level}%` }}
                  animate={{ backgroundPosition: ['200% center', '-200% center'] }}
                  viewport={{ once: true }}
                  transition={{ 
                    width: { duration: 1.2, delay: 0.2 + index * 0.1, ease: 'easeOut' },
                    backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
                  }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, var(--color-rose-gold), var(--color-medium-green), var(--color-rose-gold))',
                    backgroundSize: '200% auto',
                    borderRadius: '9999px',
                    boxShadow: '0 0 10px rgba(184, 138, 114, 0.4)'
                  }}
                />
              </div>
              <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                {skill.category}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/components/ui/PortfolioProvider';
import siteConfig from '@/data/site_config.json';

export default function EducationSection() {
  const portfolioData = usePortfolio();
  const activeEducation = portfolioData.education
    .filter(ed => ed.visible !== false)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return 0;
    });

  return (
    <section id="education" className="px-4 py-12 md:px-8 md:py-16 relative z-10 min-h-screen flex flex-col justify-center">
      <div className="w-full max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: siteConfig.sections.education.title.replace(/ (.*?)$/, ' <span class="text-gradient">$1</span>') }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            {siteConfig.sections.education.subtitle}
          </p>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '2rem' }}>
          {/* The Vine (Timeline Line) */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              left: '0',
              top: '0',
              width: '4px',
              background: 'linear-gradient(to bottom, var(--color-secondary), var(--color-primary))',
              borderRadius: '9999px',
              boxShadow: '0 0 10px rgba(181, 210, 222, 0.5)'
            }}
          />

          {activeEducation.map((ed, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.3, duration: 0.6 }}
              style={{
                position: 'relative',
                marginBottom: index === activeEducation.length - 1 ? '0' : '3rem',
              }}
            >
              {/* Leaf/Bud Node */}
              <div style={{
                position: 'absolute',
                left: '-2.5rem',
                top: '0.5rem',
                width: '16px',
                height: '16px',
                backgroundColor: 'var(--color-bg-primary)',
                border: '3px solid var(--color-secondary)',
                borderRadius: '50% 0 50% 50%', /* Leaf shape */
                transform: 'rotate(-45deg)',
                boxShadow: '0 0 10px rgba(181, 210, 222, 0.5)'
              }} />

              <div className="glass-panel" style={{ padding: '2rem', transition: 'var(--transition-smooth)' }}>
                <span style={{ 
                  display: 'inline-block',
                  color: 'var(--color-secondary)',
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  marginBottom: '0.5rem',
                  backgroundColor: 'rgba(181, 210, 222, 0.2)',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '9999px'
                }}>
                  {ed.timeline}
                </span>
                <h3 style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                  {ed.degree}
                </h3>
                <h4 style={{ fontSize: '1.125rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 500 }}>
                  {ed.institution}
                </h4>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {ed.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React from 'react';
import { usePortfolio } from '@/components/ui/PortfolioProvider';

export default function Footer() {
  const portfolioData = usePortfolio();
  return (
    <footer style={{
      padding: '0.5rem 2rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.3)',
      background: 'rgba(255,255,255,0.15)',
      backdropFilter: 'blur(12px)',
      color: 'var(--color-text-secondary)',
      fontSize: '0.9rem',
      position: 'relative',
      zIndex: 10
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <p style={{ letterSpacing: '0.05em' }}>
          Cultivated with <span style={{ color: 'var(--color-rose-gold)' }}>🌸</span> by <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>{portfolioData.about.name} and <a href="https://www.anikesh.co.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Anikesh07</a></span>
        </p>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
          &copy; {new Date().getFullYear()} {portfolioData.about.name} and <a href="https://www.anikesh.co.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Anikesh07</a>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

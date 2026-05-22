"use client";

import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <motion.div 
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="glass-panel p-12 max-w-3xl mx-auto"
        style={{
          padding: '4rem',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span style={{ 
            display: 'inline-block', 
            padding: '0.5rem 1.5rem', 
            borderRadius: '9999px',
            backgroundColor: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            fontWeight: 600,
            marginBottom: '2rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            fontSize: '0.875rem'
          }}>
            Blooming Soon
          </span>
        </motion.div>
        
        <h1 style={{ 
          fontSize: '4.5rem', 
          marginBottom: '1.5rem',
          color: 'var(--color-text-primary)'
        }}>
          Hi, I'm <span className="text-gradient">Naina</span>
        </h1>
        
        <p style={{ 
          fontSize: '1.25rem', 
          lineHeight: 1.7, 
          color: 'var(--color-text-secondary)',
          marginBottom: '3rem'
        }}>
          A full-stack developer crafting elegant, premium web experiences. 
          Welcome to my digital garden, where code meets creativity and every pixel blooms with purpose.
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <button style={{
            background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
            color: 'white',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '9999px',
            fontSize: '1.125rem',
            fontWeight: 500,
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(242, 181, 212, 0.4)',
            transition: 'var(--transition-smooth)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(242, 181, 212, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(242, 181, 212, 0.4)';
          }}
          >
            Explore My Work
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

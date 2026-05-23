"use client";
import React, { useState, useEffect } from 'react';
import portfolioData from '@/data/portfolio.json';
import siteConfig from '@/data/site_config.json';

import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import EducationSection from '@/components/sections/EducationSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ConnectForm from '@/components/sections/ConnectForm';
import Footer from '@/components/ui/Footer';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [beeLanded, setBeeLanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Wait 4 seconds for the bee to fly around before it officially 'lands'
    const timer = setTimeout(() => {
      setBeeLanded(true);
    }, 4000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    }, { rootMargin: '-30% 0px -70% 0px' });

    const sections = document.querySelectorAll('section, #home');
    sections.forEach((section) => observer.observe(section));

    return () => {
      clearTimeout(timer);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex flex-col md:flex-row justify-between items-center px-6 md:px-16 py-4 md:py-6" style={{
        background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.4)', gap: '1rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)', color: 'var(--color-rose-gold)' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
          {siteConfig.logoText}
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8" style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          {siteConfig.navLinks.map((link, index) => {
            const targetId = link.href === '#' ? 'home' : link.href.replace('#', '');
            const isActive = activeSection === targetId;
            return (
              <a 
                key={index} 
                href={link.href} 
                className="hover:opacity-80 transition-all" 
                style={{ 
                  color: 'var(--color-muted-green)', 
                  borderBottom: isActive ? '2px solid var(--color-muted-green)' : '2px solid transparent',
                  paddingBottom: '0.25rem'
                }}
              >
                {link.label}
              </a>
            );
          })}
        </div>
        <div className="hidden md:flex gap-4 justify-end">
          <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'github')?.url || '#'} target="_blank" rel="noreferrer" className="glass-pill" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
          <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url || '#'} target="_blank" rel="noreferrer" className="glass-pill" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
          <a href={portfolioData.settings?.resumeUrl || '#'} target="_blank" rel="noreferrer" className="glass-pill" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            <Download size={18} />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div id="home" className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', animation: 'fadeInUp 1s ease-out' }}>


        {/* Glassmorphism Wrapper */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '4rem 6rem',
          borderRadius: '32px',
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 8px 32px 0 rgba(226, 194, 216, 0.2)',
          border: '1px solid rgba(255, 255, 255, 0.4)',
          zIndex: 5
        }}>
          {/* Main Text */}
          <h1 style={{
            position: 'relative',
            fontSize: '8rem',
            lineHeight: 1.1,
            margin: 0,
            paddingTop: '2rem',
            paddingBottom: '0.5rem',
            color: 'var(--color-text-primary)',
            fontWeight: 400,
            display: 'inline-block',
            textShadow: '0 4px 25px rgba(226, 194, 216, 0.6)'
          }}>
            {/* The sitting/flying bee */}
            {!beeLanded ? (
              <motion.div
                initial={{ x: 500, y: -400, opacity: 0, rotate: -45 }}
                animate={{
                  x: [500, 200, -150, 50, 0],
                  y: [-400, -100, -300, -100, 0],
                  opacity: [0, 1, 1, 1, 1],
                  rotate: [-45, 30, -30, 20, 0]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.6, 0.85, 1]
                }}
                style={{
                  position: 'absolute',
                  top: '3rem',
                  left: '-2.5rem',
                  fontSize: '3.5rem',
                  zIndex: 10,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={{ y: [0, -8, 0], rotate: [0, 10, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  position: 'absolute',
                  top: '3rem',
                  left: '-2.5rem',
                  fontSize: '3.5rem',
                  zIndex: 10,
                  pointerEvents: 'none',
                  filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))'
                }}
              >
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
              </motion.div>
            )}
            {portfolioData.hero.heading}
          </h1>
          <h1 style={{ color: 'var(--color-muted-rose-gold)', fontSize: '4.5rem', lineHeight: 1.1, margin: 0, marginBottom: '2rem' }}>
            {portfolioData.hero.subtitle}
          </h1>

          {/* Subtext */}
          <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-medium-green)', marginBottom: '3rem' }}>
            {portfolioData.hero.subtext}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', zIndex: 10 }}>
            <a href={siteConfig.hero.primaryButton.href} className="glass-pill" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--color-rose-gold)' }}>❀</span> {siteConfig.hero.primaryButton.label}
            </a>
            <a href={siteConfig.hero.secondaryButton.href} className="glass-pill" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              {siteConfig.hero.secondaryButton.label}
            </a>
          </div>
        </div>


      </div>

      {/* OTHER SECTIONS */}
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <ConnectForm />
      <Footer />

      {/* Custom Keyframes for the server-rendered Hero */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}

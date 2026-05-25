"use client";
import React, { useState, useEffect } from 'react';
import { usePortfolio } from '@/components/ui/PortfolioProvider';
import siteConfig from '@/data/site_config.json';

import dynamic from 'next/dynamic';

const AboutSection = dynamic(() => import('@/components/sections/AboutSection'), { ssr: true });
const SkillsSection = dynamic(() => import('@/components/sections/SkillsSection'), { ssr: true });
const EducationSection = dynamic(() => import('@/components/sections/EducationSection'), { ssr: true });
const ProjectsSection = dynamic(() => import('@/components/sections/ProjectsSection'), { ssr: true });
const ConnectForm = dynamic(() => import('@/components/sections/ConnectForm'), { ssr: false });
const Footer = dynamic(() => import('@/components/ui/Footer'), { ssr: true });
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const portfolioData = usePortfolio();
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
      <nav className="fixed top-0 left-0 right-0 z-[100] flex flex-col md:flex-row justify-between items-center px-4 md:px-16 py-3 md:py-6 gap-3 md:gap-0" style={{
        background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.4)'
      }}>
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2 font-extrabold text-lg md:text-xl tracking-widest" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-rose-gold)' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
            {siteConfig.logoText}
          </div>
          
          {/* Mobile Only Action Icons - Moved to header for space saving */}
          <div className="flex md:hidden gap-2">
            <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'github')?.url || '#'} target="_blank" rel="noreferrer" className="glass-pill flex items-center justify-center rounded-full w-8 h-8 text-[var(--color-text-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
            </a>
            <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url || '#'} target="_blank" rel="noreferrer" className="glass-pill flex items-center justify-center rounded-full w-8 h-8 text-[var(--color-text-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
            </a>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-8 text-xs sm:text-sm font-semibold tracking-widest mt-2 md:mt-0">
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
      <div id="home" className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 text-center relative" style={{ minHeight: '100vh', animation: 'fadeInUp 1s ease-out' }}>

        {/* Glassmorphism Wrapper */}
        <div className="flex flex-col items-center px-6 py-8 md:px-24 md:py-16 rounded-[2rem] md:rounded-[32px] border border-white/40 shadow-[0_8px_32px_0_rgba(226,194,216,0.2)] w-full max-w-5xl" style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 5
        }}>
          {/* Main Text */}
          <h1 className="relative text-5xl sm:text-7xl lg:text-[8rem] leading-[1.1] m-0 pt-8 pb-2 font-normal inline-block" style={{
            color: 'var(--color-text-primary)',
            textShadow: '0 4px 25px rgba(226, 194, 216, 0.6)'
          }}>
            {/* The sitting/flying bee */}
            {!beeLanded ? (
              <motion.div
                initial={{ x: 300, y: -200, opacity: 0, rotate: -45 }}
                animate={{
                  x: [300, 100, -100, 20, 0],
                  y: [-200, -50, -150, -50, 0],
                  opacity: [0, 1, 1, 1, 1],
                  rotate: [-45, 30, -30, 20, 0]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.6, 0.85, 1]
                }}
                className="absolute -top-4 md:top-12 -left-2 md:-left-10 text-4xl md:text-6xl z-10 pointer-events-none drop-shadow-md"
              >
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
              </motion.div>
            ) : (
              <motion.div
                initial={{ x: 0, y: 0, rotate: 0 }}
                animate={{ y: [0, -8, 0], rotate: [0, 10, -5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 md:top-12 -left-2 md:-left-10 text-4xl md:text-6xl z-10 pointer-events-none drop-shadow-md"
              >
                <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="var(--color-rose-gold)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
              </motion.div>
            )}
            {portfolioData.hero.heading}
          </h1>
          <h2 className="text-3xl sm:text-5xl lg:text-[4.5rem] leading-[1.1] m-0 mb-6" style={{ color: 'var(--color-muted-rose-gold)' }}>
            {portfolioData.hero.subtitle}
          </h2>

          {/* Subtext */}
          <div className="text-xs sm:text-sm md:text-base font-semibold tracking-widest mb-10" style={{ color: 'var(--color-medium-green)' }}>
            {portfolioData.hero.subtext}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-4 z-10 w-full sm:w-auto">
            <a href={siteConfig.hero.primaryButton.href} className="glass-pill flex items-center justify-center gap-2 px-8 py-3 md:py-4 text-xs md:text-sm font-bold tracking-widest w-full sm:w-auto">
              <span style={{ color: 'var(--color-rose-gold)' }}>❀</span> {siteConfig.hero.primaryButton.label}
            </a>
            <a href={siteConfig.hero.secondaryButton.href} className="glass-pill flex items-center justify-center px-8 py-3 md:py-4 text-xs md:text-sm font-bold tracking-widest w-full sm:w-auto">
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

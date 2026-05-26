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
const VineScrollIndicator = dynamic(() => import('@/components/ui/VineScrollIndicator'), { ssr: false });
const CursorTrail = dynamic(() => import('@/components/ui/CursorTrail'), { ssr: false });
import { Download, Home as HomeIcon, User, Sparkles, Briefcase, Mail, Flower } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const portfolioData = usePortfolio();
  const [beeLanded, setBeeLanded] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Wait for the 4s loading screen + 2s flight time before it officially 'lands'
    const timer = setTimeout(() => {
      setBeeLanded(true);
    }, 6000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id || 'home');
        }
      });
    }, { rootMargin: '-40% 0px -40% 0px' });

    const sectionIds = ['home', 'about', 'skills', 'projects', 'education', 'connect'];
    const observedElements = new Set();

    const observeSections = () => {
      sectionIds.forEach(id => {
        if (!observedElements.has(id)) {
          const el = document.getElementById(id);
          if (el) {
            observer.observe(el);
            observedElements.add(id);
          }
        }
      });
    };

    observeSections();
    const interval = setInterval(observeSections, 1000); // Check for dynamically loaded sections

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div>
      <CursorTrail />
      <VineScrollIndicator />
      {/* MOBILE NAVBAR */}
      <nav className="navbar md:hidden sticky top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 py-4">
        <div className="flex items-center gap-2 font-extrabold text-lg tracking-widest" style={{ fontFamily: 'var(--font-heading)', color: 'var(--color-rose-gold)' }}>
          <Flower size={20} color="currentColor" strokeWidth={2} />
          {siteConfig.logoText}
        </div>

        <div className="flex gap-2">
          <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'github')?.url || '#'} target="_blank" rel="noreferrer" className="glass-pill flex items-center justify-center rounded-full w-8 h-8 text-[var(--color-text-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
          </a>
          <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url || '#'} target="_blank" rel="noreferrer" className="glass-pill flex items-center justify-center rounded-full w-8 h-8 text-[var(--color-text-primary)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
        </div>
      </nav>

      <nav className="hidden md:flex fixed top-0 left-0 bottom-0 w-24 z-[100] flex-col py-8"
        style={{ background: 'transparent' }}>

        {/* Actual Magical Tree SVG spanning entire sidebar */}
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-center w-full overflow-visible">
          <svg width="100%" height="100%" viewBox="-10 0 80 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="magicTree" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--color-medium-green)" />
                <stop offset="30%" stopColor="#8DA399" />
                <stop offset="70%" stopColor="#B69A96" />
                <stop offset="100%" stopColor="var(--color-rose-gold)" />
              </linearGradient>
            </defs>

            {/* The thick magical wavy trunk */}
            <path d="M 30,-50 C 50,50 40,150 28,250 C 15,350 20,450 32,550 C 45,650 40,750 25,850 C 15,950 20,1050 30,1150" fill="none" stroke="url(#magicTree)" strokeWidth="10" strokeLinecap="round" />

            {/* Winding vines wrapping around the wavy trunk */}
            <path d="M 20,-50 C 60,50 10,150 35,250 C 0,350 50,450 25,550 C 60,650 10,750 35,850 C 0,950 50,1050 25,1150" fill="none" stroke="var(--color-secondary)" strokeWidth="2" opacity="0.8" />
            <path d="M 40,-50 C 0,50 50,150 25,250 C 60,350 10,450 35,550 C 0,650 50,750 25,850 C 60,950 10,1050 35,1150" fill="none" stroke="var(--color-primary-light)" strokeWidth="2" opacity="0.6" />
          </svg>
        </div>



        {/* Branch Navigation Links */}
        <div className="flex-1 w-full relative flex flex-col justify-center py-6">

          <div className="flex flex-col gap-12 w-full relative z-10 items-center">
            {siteConfig.navLinks.map((link, index) => {
              const targetId = link.href === '#' ? 'home' : link.href.replace('#', '');
              const isActive = activeSection === targetId;

              const getIcon = () => {
                switch (targetId) {
                  case 'home': return <HomeIcon size={18} />;
                  case 'about': return <User size={18} />;
                  case 'skills': return <Sparkles size={18} />;
                  case 'projects': return <Briefcase size={18} />;
                  case 'connect': return <Mail size={18} />;
                  default: return <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }} />;
                }
              };

              const getActiveColor = () => {
                switch (targetId) {
                  case 'home': return 'var(--color-rose-gold)';
                  case 'about': return 'var(--color-medium-green)';
                  case 'skills': return '#8DA399'; // Sage green
                  case 'projects': return '#B69A96'; // Muted blush
                  case 'connect': return 'var(--color-rose-gold)';
                  default: return 'var(--color-rose-gold)';
                }
              };
              
              const activeColor = getActiveColor();

              return (
                <a key={index} href={link.href} className="relative group flex items-center justify-center w-full"
                   style={{ '--hover-color': activeColor } as React.CSSProperties}>

                  {/* The leaf node / icon container on the trunk */}
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: isActive ? activeColor : 'rgba(255, 255, 255, 0.85)',
                      border: `2px solid ${isActive ? 'var(--color-bg-primary)' : 'var(--color-medium-green)'}`,
                      borderRadius: '50% 50% 50% 10%', /* Leaf shape! */
                      transform: 'rotate(-45deg)', /* Points the leaf outwards */
                      color: isActive ? 'var(--color-bg-primary)' : 'var(--color-medium-green)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      zIndex: 2,
                      boxShadow: isActive ? `0 0 15px ${activeColor}` : '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    className={`group-hover:scale-110 ${isActive ? '' : 'group-hover:border-[var(--hover-color)] group-hover:text-[var(--hover-color)]'}`}
                  >
                    <div style={{ transform: 'rotate(45deg)' }}>
                      {getIcon()}
                    </div>
                  </div>

                  {/* The little branch sticking out to the label */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '68px',
                      top: '50%',
                      width: '0px',
                      height: '2px',
                      background: activeColor,
                      transition: 'all 0.3s ease',
                      transform: 'translateY(-50%)',
                      opacity: 0
                    }}
                    className="group-hover:w-[15px] group-hover:opacity-100"
                  />

                  {/* Hover Label */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '70px',
                      top: '50%',
                      transform: 'translateY(-50%) translateX(-10px)',
                      opacity: 0,
                      pointerEvents: 'none',
                      background: 'rgba(255, 255, 255, 0.9)',
                      padding: '6px 14px',
                      borderRadius: '8px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                      border: '1px solid var(--color-primary-light)',
                      color: activeColor,
                      fontWeight: 'bold',
                      fontSize: '0.75rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      whiteSpace: 'nowrap',
                      zIndex: 10
                    }}
                    className="group-hover:opacity-100 group-hover:translate-x-[15px]"
                  >
                    {link.label}
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Socials at bottom */}
        <div className="flex flex-col items-center gap-6 mt-8 relative z-10 w-full mb-4">

          {/* GitHub Leaf */}
          <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'github')?.url || '#'} target="_blank" rel="noreferrer" className="relative group flex items-center justify-center w-full">
            <div
              style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.85)', border: '2px solid var(--color-medium-green)',
                borderRadius: '50% 50% 50% 10%', transform: 'rotate(-45deg)', color: 'var(--color-medium-green)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
              className="group-hover:border-[var(--color-rose-gold)] group-hover:color-[var(--color-rose-gold)] group-hover:scale-110"
            >
              <div style={{ transform: 'rotate(45deg)' }} className="group-hover:text-[var(--color-rose-gold)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>
              </div>
            </div>
            {/* Hover tooltip */}
            <div className="absolute left-[65px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none bg-white/90 px-3 py-1 rounded-md shadow-md border border-white text-xs font-bold tracking-widest uppercase text-[var(--color-rose-gold)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2 z-10 whitespace-nowrap">
              GitHub
            </div>
          </a>

          {/* LinkedIn Leaf */}
          <a href={portfolioData.socials.find(s => s.platform.toLowerCase() === 'linkedin')?.url || '#'} target="_blank" rel="noreferrer" className="relative group flex items-center justify-center w-full">
            <div
              style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.85)', border: '2px solid var(--color-medium-green)',
                borderRadius: '50% 50% 50% 10%', transform: 'rotate(-45deg)', color: 'var(--color-medium-green)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
              className="group-hover:border-[var(--color-rose-gold)] group-hover:color-[var(--color-rose-gold)] group-hover:scale-110"
            >
              <div style={{ transform: 'rotate(45deg)' }} className="group-hover:text-[var(--color-rose-gold)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              </div>
            </div>
            {/* Hover tooltip */}
            <div className="absolute left-[65px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none bg-white/90 px-3 py-1 rounded-md shadow-md border border-white text-xs font-bold tracking-widest uppercase text-[var(--color-rose-gold)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2 z-10 whitespace-nowrap">
              LinkedIn
            </div>
          </a>

          {/* Resume Leaf */}
          <a href={portfolioData.settings?.resumeUrl || '#'} target="_blank" rel="noreferrer" className="relative group flex items-center justify-center w-full">
            <div
              style={{
                width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.85)', border: '2px solid var(--color-medium-green)',
                borderRadius: '50% 50% 50% 10%', transform: 'rotate(-45deg)', color: 'var(--color-medium-green)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}
              className="group-hover:border-[var(--color-rose-gold)] group-hover:color-[var(--color-rose-gold)] group-hover:scale-110"
            >
              <div style={{ transform: 'rotate(45deg)' }} className="group-hover:text-[var(--color-rose-gold)]">
                <Download size={16} />
              </div>
            </div>
            {/* Hover tooltip */}
            <div className="absolute left-[65px] top-1/2 -translate-y-1/2 opacity-0 pointer-events-none bg-white/90 px-3 py-1 rounded-md shadow-md border border-white text-xs font-bold tracking-widest uppercase text-[var(--color-rose-gold)] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-2 z-10 whitespace-nowrap">
              Resume
            </div>
          </a>

        </div>
      </nav>

      <main className="w-full md:pl-24 flex flex-col min-h-screen relative z-10">

        {/* HERO SECTION */}
        <div id="home" className="flex flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12 text-center relative" style={{ minHeight: 'calc(100vh - 90px)', animation: 'fadeInUp 1s ease-out' }}>

          {/* Glassmorphism Wrapper */}
          <div className="relative flex flex-col items-center px-6 py-12 md:px-24 md:py-20 rounded-[2rem] md:rounded-[32px] border border-white/40 shadow-[0_8px_32px_0_rgba(226,194,216,0.2)] w-full max-w-5xl" style={{
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(12px)',
            zIndex: 5
          }}>
            
            {/* Soft Glowing Ambient Orbs Behind Text */}
            <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
              <div className="absolute top-[-20%] left-[-10%] w-96 h-96 rounded-full bg-[var(--color-rose-gold)] opacity-20 blur-[100px]" />
              <div className="absolute bottom-[-20%] right-[-10%] w-96 h-96 rounded-full bg-[var(--color-secondary)] opacity-20 blur-[100px]" />
            </div>
            {/* Main Text */}
            <h1 className="relative text-3xl min-[400px]:text-4xl sm:text-6xl lg:text-[7rem] leading-[1.1] m-0 pt-8 pb-2 font-normal inline-block whitespace-nowrap" style={{
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
                    delay: 4, // Wait for loading screen to finish
                    duration: 2,
                    ease: "easeInOut",
                    times: [0, 0.3, 0.6, 0.85, 1]
                  }}
                  className="absolute -top-4 md:top-12 -left-2 md:-left-10 text-4xl md:text-6xl z-10 pointer-events-none drop-shadow-md"
                >
                  <Flower width="1em" height="1em" color="var(--color-rose-gold)" strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ x: 0, y: 0, rotate: 0 }}
                  animate={{ y: [0, -8, 0], rotate: [0, 10, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 md:top-12 -left-2 md:-left-10 text-4xl md:text-6xl z-10 pointer-events-none drop-shadow-md"
                >
                  <Flower width="1em" height="1em" color="var(--color-rose-gold)" strokeWidth={1.5} />
                </motion.div>
              )}
              {portfolioData.hero.heading}
            </h1>
            <h2 className="text-3xl sm:text-5xl lg:text-[4.5rem] leading-[1.1] m-0 mb-6" style={{ color: 'var(--color-muted-rose-gold)' }}>
              {portfolioData.hero.subtitle}
            </h2>

            {/* Subtext */}
            <div className="text-xs sm:text-sm md:text-base font-bold tracking-widest uppercase mb-8" style={{ color: 'var(--color-medium-green)' }}>
              {portfolioData.hero.subtext}
            </div>

            {/* Beautiful Quote Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 4.5, duration: 1.5, ease: "easeOut" }}
              className="flex flex-col items-center gap-4 mb-12 max-w-2xl text-center relative z-10"
            >
              <div className="flex items-center gap-4 w-full justify-center opacity-70">
                <div className="h-[1px] w-16 md:w-32" style={{ background: 'linear-gradient(90deg, transparent, var(--color-rose-gold))' }} />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Flower size={14} color="var(--color-rose-gold)" />
                </motion.div>
                <div className="h-[1px] w-16 md:w-32" style={{ background: 'linear-gradient(270deg, transparent, var(--color-rose-gold))' }} />
              </div>
              
              <p className="text-sm md:text-lg italic font-medium leading-relaxed px-4" style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}>
                &quot;To plant a garden is to believe in tomorrow. I cultivate clean code, design elegant experiences, and watch ideas bloom into reality.&quot;
              </p>
              
              <div className="flex items-center gap-4 w-full justify-center opacity-70 mt-1">
                <div className="h-[1px] w-12 md:w-24" style={{ background: 'linear-gradient(90deg, transparent, var(--color-medium-green))' }} />
                <span style={{ color: 'var(--color-medium-green)', fontSize: '0.75rem' }}>✧</span>
                <div className="h-[1px] w-12 md:w-24" style={{ background: 'linear-gradient(270deg, transparent, var(--color-medium-green))' }} />
              </div>
            </motion.div>

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

      </main>

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

"use client";

import SkillsSection from '@/components/sections/SkillsSection';
import EducationSection from '@/components/sections/EducationSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ConnectForm from '@/components/sections/ConnectForm';
import { Download } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* NAVBAR */}
      <nav style={{
        position: 'absolute', top: 0, left: 0, right: 0, padding: '2rem 4rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 800, fontSize: '1.25rem', letterSpacing: '0.1em', fontFamily: 'var(--font-heading)' }}>
          <span className="text-gradient">❁</span> NAINA'S GARDEN
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          <a href="#" style={{ color: 'var(--color-primary)', borderBottom: '2px solid var(--color-primary)' }}>HOME</a>
          <a href="#about">ABOUT</a>
          <a href="#skills">SKILLS</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="glass-pill" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="glass-pill" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="glass-pill" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', cursor: 'pointer', color: 'var(--color-text-primary)' }}>
            <Download size={18} />
          </a>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center relative" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', animation: 'fadeInUp 1s ease-out' }}>
        
        {/* System Status Pill */}
        <div className="glass-pill" style={{ padding: '0.5rem 1.5rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.1em' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', boxShadow: '0 0 10px var(--color-primary)' }}></div>
          GARDEN STATUS: BLOOMING
        </div>

        {/* Main Text */}
        <h1 className="tech-heading" style={{ fontSize: '6.5rem', lineHeight: 1.1, margin: 0, color: 'var(--color-text-primary)', fontStyle: 'italic' }}>
          Naina Verma
        </h1>
        <h1 className="tech-heading text-gradient" style={{ fontSize: '4.5rem', lineHeight: 1.1, margin: 0, marginBottom: '2rem' }}>
          Developer
        </h1>

        {/* Subtext */}
        <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-text-secondary)', marginBottom: '3rem' }}>
          ✿ STEP INTO MY DIGITAL GARDEN ✿
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '4rem', zIndex: 10 }}>
          <a href="#projects" className="glass-pill" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: 'var(--color-primary)' }}>❀</span> EXPLORE_BLOOMS
          </a>
          <a href="#contact" className="glass-pill" style={{ padding: '1rem 2.5rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em' }}>
            PLANT_A_SEED
          </a>
        </div>

        {/* Bottom Scroll Line */}
        <div style={{ position: 'absolute', bottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--color-text-muted)' }}>SCROLL</div>
          <div style={{ width: '1px', height: '40px', backgroundColor: 'var(--color-border)' }}></div>
        </div>
      </div>

      {/* OTHER SECTIONS */}
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <ConnectForm />
      
      {/* Custom Keyframes for the server-rendered Hero */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}} />
    </div>
  );
}

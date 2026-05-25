"use client";

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { usePortfolio } from '@/components/ui/PortfolioProvider';
import siteConfig from '@/data/site_config.json';

// --- GLASS POT COMPONENT ---
const SkillPot = ({ skill, index, registerPot }: { skill: { name: string; level: number; category: string }; index: number, registerPot: (el: HTMLDivElement | null) => void }) => {
  // Convert 0-100 to y-coordinate for SVG water level. 120 is empty, 25 is full.
  const waterY = 120 - (skill.level * 0.95);
  const fishY = waterY + (110 - waterY) / 2; // middle of the water depth
  
  return (
    <motion.div
      ref={registerPot}
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      className="flex flex-col items-center group relative cursor-pointer"
      style={{ width: '150px' }}
    >
      <div className="relative w-[110px] h-[130px] transition-transform duration-300 group-hover:-translate-y-2">
        <svg width="110" height="130" viewBox="0 0 100 120" className="drop-shadow-lg overflow-visible">
          <defs>
            <clipPath id={`potMask-${index}`}>
               {/* Elegant Pot Silhouette */}
               <path d="M 30 10 C 10 40, -5 80, 20 110 C 40 125, 60 125, 80 110 C 105 80, 90 40, 70 10 Z" />
            </clipPath>
            <linearGradient id={`waterGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(119, 192, 255, 0.7)" />
              <stop offset="100%" stopColor="rgba(33, 107, 196, 0.9)" />
            </linearGradient>
            <linearGradient id="glassReflection" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
            </linearGradient>
          </defs>
          
          {/* Back Glass Wall */}
          <path d="M 30 10 C 10 40, -5 80, 20 110 C 40 125, 60 125, 80 110 C 105 80, 90 40, 70 10 Z" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
          
          {/* Water & Stones Masked inside the pot */}
          <g clipPath={`url(#potMask-${index})`}>
            {/* Pebbles at the bottom */}
            <ellipse cx="25" cy="110" rx="16" ry="9" fill="#5c5c5c" />
            <ellipse cx="65" cy="112" rx="22" ry="11" fill="#4a4a4a" />
            <ellipse cx="85" cy="105" rx="14" ry="8" fill="#6a6a6a" />
            <ellipse cx="45" cy="100" rx="18" ry="10" fill="#7a7a7a" />
            <ellipse cx="75" cy="95" rx="16" ry="9" fill="#555555" />
            <ellipse cx="35" cy="98" rx="15" ry="8" fill="#444444" />
            <ellipse cx="55" cy="88" rx="14" ry="7" fill="#666666" />
            
            {/* Water Body */}
            <rect x="0" y={waterY} width="100" height="120" fill={`url(#waterGrad-${index})`} />
            
            {/* Swimming Golden Fish (Only if skill level > 85) */}
            {skill.level > 85 && (
              <motion.g
                animate={{ 
                  x: [30, 70, 70, 30, 30],
                  scaleX: [1, 1, -1, -1, 1] 
                }}
                transition={{ 
                  duration: 8 + (index % 3), // slight variation in speed
                  repeat: Infinity,
                  times: [0, 0.45, 0.5, 0.95, 1],
                  ease: "linear"
                }}
              >
                <motion.g
                  animate={{ y: [fishY - 8, fishY + 8, fishY - 8] }}
                  transition={{ duration: 3 + (index % 2), repeat: Infinity, ease: "easeInOut" }}
                >
                   {/* Golden Fish SVG */}
                   <path d="M 8 0 C 4 -6, -4 -6, -8 0 C -4 6, 4 6, 8 0 Z" fill="#fbbf24" />
                   <path d="M -7 0 L -12 -4 L -10 0 L -12 4 Z" fill="#f59e0b" />
                   <circle cx="3" cy="-1.5" r="1" fill="#451a03" />
                   <path d="M -1 -3 Q 2 -7 5 -3 Z" fill="#fcd34d" />
                   <path d="M -1 3 Q 2 7 5 3 Z" fill="#fcd34d" />
                </motion.g>
              </motion.g>
            )}

            {/* Water Surface Ellipse (Gives depth to the water) */}
            <ellipse cx="50" cy={waterY} rx="42" ry="8" fill="rgba(164, 219, 255, 0.9)" />
            
            {/* Subtle animated wave on water surface */}
            <motion.ellipse 
              cx="50" cy={waterY} rx="30" ry="4" fill="rgba(255,255,255,0.3)"
              animate={{ rx: [30, 35, 30], ry: [4, 6, 4] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            />
          </g>
          
          {/* Front Glass Reflection & Rim */}
          <ellipse cx="50" cy="10" rx="20" ry="5" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.8)" strokeWidth="2.5" />
          <path d="M 30 10 C 10 40, -5 80, 20 110 C 40 125, 60 125, 80 110 C 105 80, 90 40, 70 10 Z" fill="url(#glassReflection)" pointerEvents="none" />
          {/* Shine Mark */}
          <path d="M 12 60 Q 5 85 20 105" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="4" strokeLinecap="round" />
        </svg>

        {/* Floating Percentage Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none mt-6">
           <span className="font-extrabold text-2xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] px-2 py-0.5 bg-black/20 rounded-full backdrop-blur-[2px]">
             {skill.level}<span className="text-sm">%</span>
           </span>
        </div>
      </div>
      
      {/* Skill Info */}
      <div className="mt-4 text-center z-10">
        <h3 className="font-bold text-[1.1rem] transition-colors duration-300 group-hover:text-[var(--color-rose-gold)]" style={{ color: 'var(--color-text-primary)' }}>
          {skill.name}
        </h3>
        <p className="text-[9px] font-bold uppercase tracking-widest mt-1 opacity-60" style={{ color: 'var(--color-text-secondary)' }}>
          {skill.category}
        </p>
      </div>
    </motion.div>
  )
}

// --- MAIN SECTION ---
export default function SkillsSection() {
  const portfolioData = usePortfolio();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [potElements, setPotElements] = useState<HTMLDivElement[]>([]);

  // Register pots to send to birds
  const registerPot = (el: HTMLDivElement | null) => {
    if (el && !potElements.includes(el)) {
      setPotElements(prev => [...prev, el]);
    }
  };

  return (
    <section id="skills" className="px-4 py-12 md:px-8 md:py-16 relative z-10 min-h-screen flex flex-col justify-center" ref={sectionRef}>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <h2 style={{ fontSize: '3rem', color: 'var(--color-text-primary)', marginBottom: '1rem' }} dangerouslySetInnerHTML={{ __html: siteConfig.sections.skills.title.replace(/ (.*?)$/, ' <span class="text-gradient">$1</span>') }} />
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '1.125rem' }}>
            {siteConfig.sections.skills.subtitle}
          </p>
        </motion.div>

        {/* Pots Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-12 pb-8">
          {portfolioData.skills.map((skill: { name: string; level: number; category: string }, index: number) => (
            <SkillPot key={index} skill={skill} index={index} registerPot={registerPot} />
          ))}
        </div>
      </div>
    </section>
  );
}

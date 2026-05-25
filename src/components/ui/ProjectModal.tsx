/* eslint-disable */
"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { createPortal } from 'react-dom';
import { Project } from '@/types/portfolio';
import SourceViewerModal from './SourceViewerModal';

const ProjectGallery = ({ images, projectName }: { images: string[], projectName: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [images.length]);

  if (!images.length) return null;

  return (
    <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', position: 'relative', height: '400px', flexShrink: 0, backgroundColor: 'rgba(0,0,0,0.02)' }}>
      <AnimatePresence initial={false}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${projectName} preview ${currentIndex + 1}`}
          initial={{ x: '100%', opacity: 1 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100%', opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
        />
      </AnimatePresence>
      {images.length > 1 && (
        <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
          {images.map((_, idx) => (
            <div key={idx} style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: idx === currentIndex ? 'var(--color-primary)' : 'rgba(255,255,255,0.8)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
              transition: 'background 0.3s ease'
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [readme, setReadme] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSourceViewerOpen, setIsSourceViewerOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && project?.links?.github && !project.hideCode) {
      setIsLoading(true);
      fetch(`/api/github/readme?repoUrl=${encodeURIComponent(project.links.github)}`)
        .then(res => res.json())
        .then(data => {
          setReadme(data.content || 'No README content found.');
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setReadme('Failed to load README.');
          setIsLoading(false);
        });
    }
  }, [isOpen, project]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !project || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999, // Super high z-index to stay above everything
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        paddingTop: '6rem'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(44, 58, 51, 0.4)',
            backdropFilter: 'blur(4px)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="glass-panel"
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '900px',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'var(--color-bg-primary)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '2rem',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start'
          }}>
            <div>
              <h2 style={{ fontSize: '2rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
                {project.name}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.tech.map(tech => (
                  <span key={tech} style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                    border: '1px solid rgba(255,255,255,0.5)',
                    color: 'var(--color-text-primary)',
                    fontWeight: 500
                  }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <button 
              onClick={onClose}
              style={{
                background: 'rgba(255,255,255,0.5)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--color-text-primary)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Action Buttons Header */}
          <div style={{ padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgba(255,255,255,0.3)', borderBottom: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={project.links.live} target="_blank" rel="noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                padding: '0.75rem 1.5rem', borderRadius: '8px',
                background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
                color: 'white', fontWeight: 500, fontSize: '0.875rem',
                boxShadow: '0 4px 15px rgba(242, 181, 212, 0.4)'
              }}>
                <ExternalLink size={16} /> Live Preview
              </a>
              {!project.hideCode && (
                <a href={project.links.github} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.75rem 1.5rem', borderRadius: '8px',
                  background: 'white', color: 'var(--color-text-primary)',
                  fontWeight: 500, fontSize: '0.875rem',
                  border: '1px solid var(--color-border)',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Open in GitHub
                </a>
              )}
              {!project.hideCode && project.links.github && (
                <button 
                  onClick={() => setIsSourceViewerOpen(true)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.5rem', borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.5)', color: 'var(--color-primary)',
                    fontWeight: 600, fontSize: '0.875rem',
                    border: '1px solid var(--color-primary)',
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(226, 194, 216, 0.2)'
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                  Source Viewer
                </button>
              )}
            </div>
          </div>

          {/* Content Area */}
          <div style={{
            padding: '2rem',
            overflowY: 'auto',
            flex: 1,
            color: 'var(--color-text-secondary)',
            backgroundColor: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}>
            {(() => {
              const hasImportantDetails = !!project.importantDetails;
              const hasReadme = readme && !readme.includes('No README content found.') && !readme.includes('Failed to load README.');
              const showFallback = !hasImportantDetails && !hasReadme && !isLoading;

              const allImages = [project.imageUrl, ...(project.gallery || [])].filter(Boolean);

              return (
                <>
                  {allImages.length > 0 && (
                    <ProjectGallery images={allImages as string[]} projectName={project.name} />
                  )}
                  {hasImportantDetails && (
                    <div style={{
                      background: 'rgba(226, 194, 216, 0.15)',
                      border: '1px solid rgba(226, 194, 216, 0.4)',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      borderLeft: '4px solid var(--color-rose-gold)'
                    }}>
                      <h3 style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)', marginBottom: '0.5rem', fontWeight: 600 }}>Important Details</h3>
                      <div className="prose prose-floral max-w-none" style={{ fontSize: '1rem', lineHeight: 1.7, color: 'var(--color-text-primary)' }}>
                        <p>{project.importantDetails}</p>
                      </div>
                    </div>
                  )}

                  {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'var(--color-primary)' }}>
                      <Loader2 className="animate-spin" size={32} />
                    </div>
                  ) : hasReadme ? (
                    <div className="prose prose-floral max-w-none" style={{ fontSize: '1rem', lineHeight: 1.7 }}>
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {readme}
                      </ReactMarkdown>
                    </div>
                  ) : null}
                  
                  {showFallback && (
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: '4rem 2rem',
                      textAlign: 'center',
                      opacity: 0.7
                    }}>
                      <div style={{ fontSize: '3rem', color: 'var(--color-primary)', marginBottom: '1rem' }}>❁</div>
                      <p style={{ fontSize: '1.125rem', fontStyle: 'italic', color: 'var(--color-text-primary)', maxWidth: '400px' }}>
                        "Great things are not done by impulse, but by a series of small things brought together."
                      </p>
                      <span style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>- Vincent van Gogh</span>
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        </motion.div>

        {isSourceViewerOpen && project.links.github && (
          <SourceViewerModal
            repoUrl={project.links.github}
            projectName={project.name}
            isOpen={isSourceViewerOpen}
            onClose={() => setIsSourceViewerOpen(false)}
          />
        )}
      </div>
    </AnimatePresence>,
    document.body
  );
}

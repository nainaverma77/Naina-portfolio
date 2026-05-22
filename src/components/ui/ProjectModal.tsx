"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Project {
  id: string;
  title: string;
  description: string;
  repoUrl: string;
  liveUrl: string;
  techStack: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [readme, setReadme] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && project?.repoUrl) {
      setIsLoading(true);
      fetch(`/api/github/readme?repoUrl=${encodeURIComponent(project.repoUrl)}`)
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

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
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
            maxHeight: '90vh',
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
                {project.title}
              </h2>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {project.techStack.map(tech => (
                  <span key={tech} style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    backgroundColor: 'rgba(212, 134, 178, 0.1)',
                    color: '#D486B2',
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

          {/* Action Buttons */}
          <div style={{ padding: '1.5rem 2rem', display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.3)' }}>
            <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '8px',
              background: 'linear-gradient(45deg, var(--color-primary), var(--color-accent))',
              color: 'white', fontWeight: 500, fontSize: '0.875rem',
              boxShadow: '0 4px 15px rgba(242, 181, 212, 0.4)'
            }}>
              <ExternalLink size={16} /> Live Preview
            </a>
            <a href={project.repoUrl} target="_blank" rel="noreferrer" style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.75rem 1.5rem', borderRadius: '8px',
              background: 'white', color: 'var(--color-text-primary)',
              fontWeight: 500, fontSize: '0.875rem',
              border: '1px solid var(--color-border)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> Source Code
            </a>
          </div>

          {/* Markdown Content */}
          <div style={{
            padding: '2rem',
            overflowY: 'auto',
            flex: 1,
            color: 'var(--color-text-secondary)'
          }}>
            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: 'var(--color-primary)' }}>
                <Loader2 className="animate-spin" size={32} />
              </div>
            ) : (
              <div className="prose prose-floral max-w-none" style={{
                fontSize: '1rem',
                lineHeight: 1.7
              }}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {readme}
                </ReactMarkdown>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

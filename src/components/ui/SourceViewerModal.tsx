"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, FileCode, FileText, FileImage, Folder, ChevronRight, Terminal, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface SourceViewerModalProps {
  repoUrl: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
}

interface GithubFile {
  path: string;
  mode: string;
  type: 'blob' | 'tree';
  sha: string;
  size: number;
  url: string;
}

export default function SourceViewerModal({ repoUrl, projectName, isOpen, onClose }: SourceViewerModalProps) {
  const [files, setFiles] = useState<GithubFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState('');
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<GithubFile | null>(null);
  
  const [fileContent, setFileContent] = useState<string>('');
  const [loadingContent, setLoadingContent] = useState(false);

  // Extract owner/repo
  const repoPath = repoUrl?.split('github.com/')[1]?.replace(/\/$/, "");

  useEffect(() => {
    if (isOpen && repoPath) {
      fetchFiles();
    }
  }, [isOpen, repoPath]);

  const fetchFiles = async () => {
    setLoadingFiles(true);
    setError('');
    try {
      // Try main branch
      let res = await fetch(`https://api.github.com/repos/${repoPath}/git/trees/main?recursive=1`);
      if (!res.ok) {
        // Try master branch
        res = await fetch(`https://api.github.com/repos/${repoPath}/git/trees/master?recursive=1`);
      }
      
      if (!res.ok) {
        throw new Error('Failed to fetch repository tree. It might be private or empty.');
      }
      
      const data = await res.json();
      if (data.tree) {
        // Filter out trees (directories) if you just want a flat list, but let's keep all and filter blobs
        const blobs = data.tree.filter((item: GithubFile) => item.type === 'blob');
        setFiles(blobs);
        
        // Auto-select README.md if it exists
        const readme = blobs.find((f: GithubFile) => f.path.toLowerCase() === 'readme.md');
        if (readme) {
          handleFileSelect(readme);
        } else if (blobs.length > 0) {
          handleFileSelect(blobs[0]);
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleFileSelect = async (file: GithubFile) => {
    setSelectedFile(file);
    setLoadingContent(true);
    try {
      const res = await fetch(`https://raw.githubusercontent.com/${repoPath}/main/${file.path}`);
      if (!res.ok) {
        const resMaster = await fetch(`https://raw.githubusercontent.com/${repoPath}/master/${file.path}`);
        if (!resMaster.ok) throw new Error('Failed to fetch file content');
        const text = await resMaster.text();
        setFileContent(text);
      } else {
        const text = await res.text();
        setFileContent(text);
      }
    } catch (err) {
      setFileContent('Error loading file content.');
    } finally {
      setLoadingContent(false);
    }
  };

  const filteredFiles = files.filter(f => f.path.toLowerCase().includes(searchQuery.toLowerCase()));

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
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
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)'
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 10 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1200px',
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.1)'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '1rem 1.5rem',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Terminal size={18} color="var(--color-primary)" />
              <h2 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-primary)', letterSpacing: '0.05em' }}>
                SOURCE_VIEWER <span style={{ color: 'var(--color-text-muted)' }}>//</span> {projectName.toUpperCase()}
              </h2>
            </div>
            <button 
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)'
              }}
            >
              <X size={20} />
            </button>
          </div>

          <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
            {/* Sidebar */}
            <div style={{
              width: '280px',
              borderRight: '1px solid rgba(0,0,0,0.05)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255,255,255,0.3)'
            }}>
              <div style={{ padding: '1rem' }}>
                <div style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <Search size={14} style={{ position: 'absolute', left: '0.75rem', color: 'var(--color-text-muted)' }} />
                  <input
                    type="text"
                    placeholder="Search files..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5rem 0.5rem 0.5rem 2rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(0,0,0,0.1)',
                      backgroundColor: 'rgba(255,255,255,0.5)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-primary)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', padding: '0 0.5rem 1rem 0.5rem' }} className="custom-scrollbar">
                {loadingFiles ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                    <Loader2 className="animate-spin" size={20} color="var(--color-primary)" />
                  </div>
                ) : error ? (
                  <div style={{ padding: '1rem', fontSize: '0.875rem', color: 'red' }}>{error}</div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    {filteredFiles.map((file) => {
                      const isSelected = selectedFile?.path === file.path;
                      const parts = file.path.split('/');
                      const fileName = parts.pop();
                      const dirPath = parts.join('/');
                      
                      const isMd = fileName?.toLowerCase().endsWith('.md');
                      const isImg = fileName?.match(/\.(jpg|jpeg|png|gif|svg)$/i);
                      
                      return (
                        <button
                          key={file.path}
                          onClick={() => handleFileSelect(file)}
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '0.5rem 0.75rem',
                            borderRadius: '6px',
                            border: 'none',
                            background: isSelected ? 'rgba(226, 194, 216, 0.2)' : 'transparent',
                            borderLeft: isSelected ? '3px solid var(--color-primary)' : '3px solid transparent',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.1s'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
                            {isMd ? <FileText size={14} color={isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)'} /> : 
                             isImg ? <FileImage size={14} color={isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)'} /> : 
                             <FileCode size={14} color={isSelected ? 'var(--color-primary)' : 'var(--color-text-secondary)'} />}
                            <span style={{ 
                              fontSize: '0.875rem', 
                              fontWeight: isSelected ? 600 : 400,
                              color: isSelected ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}>
                              {fileName}
                            </span>
                          </div>
                          {dirPath && (
                            <span style={{ 
                              fontSize: '0.65rem', 
                              color: 'var(--color-text-muted)',
                              marginLeft: '1.5rem',
                              marginTop: '0.25rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              width: 'calc(100% - 1.5rem)'
                            }}>
                              {dirPath}/
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(255,255,255,0.7)',
              position: 'relative'
            }}>
              {selectedFile ? (
                <>
                  <div style={{
                    padding: '0.5rem 1.5rem',
                    borderBottom: '1px solid rgba(0,0,0,0.05)',
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-muted)',
                    fontFamily: 'monospace'
                  }}>
                    {selectedFile.path}
                  </div>
                  
                  <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }} className="custom-scrollbar">
                    {loadingContent ? (
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Loader2 className="animate-spin" size={32} color="var(--color-primary)" />
                      </div>
                    ) : (
                      selectedFile.path.toLowerCase().endsWith('.md') ? (
                        <div className="prose prose-floral max-w-none">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {fileContent}
                          </ReactMarkdown>
                        </div>
                      ) : selectedFile.path.match(/\.(jpg|jpeg|png|gif|svg)$/i) ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                           <img src={`https://raw.githubusercontent.com/${repoPath}/main/${selectedFile.path}`} alt={selectedFile.path} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                        </div>
                      ) : (
                        <pre style={{
                          margin: 0,
                          padding: '1rem',
                          backgroundColor: '#1e1e1e',
                          color: '#d4d4d4',
                          borderRadius: '8px',
                          overflowX: 'auto',
                          fontSize: '0.875rem',
                          fontFamily: 'monospace',
                          lineHeight: 1.5
                        }}>
                          <code>{fileContent}</code>
                        </pre>
                      )
                    )}
                  </div>
                </>
              ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--color-text-muted)' }}>
                  Select a file to view its contents
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

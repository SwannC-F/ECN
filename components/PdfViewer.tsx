"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, BookOpen, X, Monitor, Smartphone, Check, Diamond } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PdfViewerProps {
  files: { fr?: string; en?: string };
}

export default function DocumentPanel({ files }: PdfViewerProps) {
  const [activePdfUrl, setActivePdfUrl] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [downloadedStatus, setDownloadedStatus] = useState<string | null>(null);

  // Detect if user is on mobile to adjust reading UX
  useEffect(() => {
    const userAgent = typeof window !== 'undefined' ? window.navigator.userAgent : '';
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  const handleReadClick = (url: string) => {
    if (isMobile) {
      // On mobile, safest cross-browser viewing is native new tab
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      // On desktop, open integrated modal
      setActivePdfUrl(url);
    }
  };

  const handleDownloadClick = (lang: string) => {
    setDownloadedStatus(lang);
    setTimeout(() => setDownloadedStatus(null), 3000); // Visual feedback
  };

  const hasFiles = files.fr || files.en;

  if (!hasFiles) return null;

  return (
    <>
      <div className="w-full relative mt-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-500" /> Documents de Recherche
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* French Document Block */}
          {files.fr && (
            <div className="glass-card bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 group hover:border-emerald-500/30 transition-all flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <FileText className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">Version Française</h4>
                  <p className="text-xs text-slate-500 font-mono">Format PDF</p>
                </div>
              </div>
              
              <div className="relative z-10 flex gap-2 w-full">
                <button 
                  onClick={() => handleReadClick(files.fr!)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Lire
                </button>
                <a 
                  href={files.fr} 
                  download 
                  onClick={() => handleDownloadClick('fr')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg transition-colors border",
                    downloadedStatus === 'fr' 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-700"
                  )}
                >
                  {downloadedStatus === 'fr' ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  {downloadedStatus === 'fr' ? 'Démarré' : '.pdf'}
                </a>
              </div>
            </div>
          )}

          {/* English Document Block */}
          {files.en && (
            <div className="glass-card bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 group hover:border-emerald-500/30 transition-all flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="relative z-10 flex items-center gap-3 mb-6">
                <div className="p-2 bg-slate-950 rounded-lg border border-slate-800">
                  <FileText className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200">English Version</h4>
                  <p className="text-xs text-slate-500 font-mono">PDF Format</p>
                </div>
              </div>
              
              <div className="relative z-10 flex gap-2 w-full">
                <button 
                  onClick={() => handleReadClick(files.en!)}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4" /> Read
                </button>
                <a 
                  href={files.en} 
                  download 
                  onClick={() => handleDownloadClick('en')}
                  className={cn(
                    "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm font-semibold rounded-lg transition-colors border",
                    downloadedStatus === 'en' 
                      ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                      : "bg-slate-950 text-slate-300 border-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-700"
                  )}
                >
                  {downloadedStatus === 'en' ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                  {downloadedStatus === 'en' ? 'Started' : '.pdf'}
                </a>
              </div>
            </div>
          )}

        </div>
        
        {/* Device hints */}
        {isMobile && (
           <p className="text-[10px] text-slate-600 mt-3 flex items-center gap-1.5"><Smartphone className="w-3 h-3" /> Optimisé pour une lecture mobile via le visualiseur natif de votre appareil.</p>
        )}
        {!isMobile && (
           <p className="text-[10px] text-slate-600 mt-3 flex items-center gap-1.5"><Monitor className="w-3 h-3" /> Lecture grand format incrustée au sein de notre interface Liseuse disponible.</p>
        )}
      </div>

      {/* Embedded Reading Modal (Only rendered on desktop logically when URL is set) */}
      <AnimatePresence>
        {activePdfUrl && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/95 backdrop-blur-xl p-4 md:p-12"
          >
            <div className="w-full h-full max-w-6xl max-h-[90vh] bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl flex flex-col overflow-hidden relative">
              {/* Toolbar */}
              <div className="h-16 border-b border-slate-800 bg-slate-950 flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-3">
                  <Diamond className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-serif italic text-slate-200">ECN Intelligence Reader</span>
                </div>
                <div className="flex items-center gap-4">
                  <a 
                    href={activePdfUrl} 
                    download 
                    className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors"
                  >
                    <Download className="w-4 h-4" /> Exporter le rapport
                  </a>
                  <div className="w-px h-6 bg-slate-800 hidden sm:block"></div>
                  <button 
                    onClick={() => setActivePdfUrl(null)}
                    className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors p-2 hover:bg-red-400/10 rounded-md"
                  >
                    <X className="w-5 h-5" /> <span className="hidden sm:block">Fermer la Liseuse</span>
                  </button>
                </div>
              </div>
              
              {/* PDF Container using simple <object> for native browser rendering. */}
              <div className="flex-1 w-full bg-slate-800 relative">
                {/* Fallback loading/error state underneath */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 text-slate-500 z-0 gap-4">
                  <div className="animate-pulse flex items-center justify-center p-4 bg-slate-800 rounded-full">
                    <FileText className="w-8 h-8 opacity-50" />
                  </div>
                  <p>Initialisation du fichier source...</p>
                  <p className="text-xs text-slate-600 max-w-xs text-center">
                    Si le visualiseur ne se charge pas, votre navigateur bloque peut-être l'affichage natif.
                    <br/><a href={activePdfUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-500 hover:underline mt-2 inline-block">Ouvrir dans un nouvel onglet</a>
                  </p>
                </div>
                
                {/* The actual viewer */}
                <object 
                  data={activePdfUrl} 
                  type="application/pdf" 
                  className="w-full h-full relative z-10"
                >
                  <iframe src={activePdfUrl} className="w-full h-full border-none" title="PDF Viewer" />
                </object>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

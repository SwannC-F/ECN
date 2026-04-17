"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Diamond, Search, Binary } from 'lucide-react';
import { INSIGHT_MOCKS } from '@/lib/data';

export default function Navigation() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return INSIGHT_MOCKS.filter(
      (insight) => 
        insight.title.toLowerCase().includes(lowerQuery) ||
        insight.excerpt.toLowerCase().includes(lowerQuery) ||
        insight.tag.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Handle keyboard shortcuts (Cmd+K to open, Escape to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Search Modal Overlay (Command Palette) */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 tracking-normal"
          >
            <div 
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm" 
              onClick={() => setIsSearchOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -10 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.97, y: -5 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col z-10"
            >
              <div className="flex items-center px-4 border-b border-zinc-800/80 bg-zinc-900/50">
                <Search className="w-5 h-5 text-emerald-500 shrink-0" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder="Rechercher une analyse, un tag..." 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none px-4 py-5 font-sans text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-0 text-lg sm:text-xl font-light"
                />
                <button 
                  onClick={() => setIsSearchOpen(false)} 
                  className="text-[10px] font-mono tracking-widest text-zinc-500 hover:text-zinc-300 bg-zinc-800/50 hover:bg-zinc-800 px-2 py-1 rounded transition-colors shrink-0"
                >
                  ESC
                </button>
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto p-2 flex flex-col font-sans">
                {searchQuery.trim() !== "" ? (
                  filteredInsights.length > 0 ? (
                    filteredInsights.map(insight => (
                      <Link 
                        key={insight.id} 
                        href={`/research/${insight.slug}`} 
                        onClick={() => setIsSearchOpen(false)}
                        className="group flex items-center justify-between p-4 rounded-xl hover:bg-zinc-900 transition-all border border-transparent hover:border-zinc-800/80 cursor-pointer"
                      >
                        <div className="flex flex-col gap-1">
                          <h4 className="text-zinc-200 font-serif text-lg group-hover:text-white transition-colors">{insight.title}</h4>
                          <div className="flex gap-3 items-center">
                            <span className="text-[10px] text-emerald-500 uppercase tracking-widest font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">{insight.tag}</span>
                            <span className="text-xs text-zinc-500 font-mono">{insight.date}</span>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-zinc-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-12 text-center flex flex-col items-center gap-4">
                      <div className="p-3 bg-zinc-900 rounded-full text-zinc-600"><Search className="w-6 h-6" /></div>
                      <p className="text-zinc-500">Aucun résultat pour <span className="text-zinc-300">"{searchQuery}"</span></p>
                    </div>
                  )
                ) : (
                  <div className="p-12 text-center text-zinc-600 text-sm font-light italic flex items-center justify-center gap-2">
                    <Binary className="w-4 h-4" /> 
                    Commencez à taper pour lancer la recherche intelligence...
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-zinc-800/50 bg-zinc-950/70 px-6 backdrop-blur-xl md:px-24 transition-all duration-300">
        <Link href="/" className="group flex items-center gap-2 text-xl font-bold tracking-tighter text-zinc-100 font-serif">
          <Diamond className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
          <span className="italic tracking-widest uppercase">ECN</span>
        </Link>
        <div className="flex gap-8 text-sm font-medium text-zinc-400 font-sans">
          <button 
            onClick={() => setIsSearchOpen(true)} 
            className="transition-colors hover:text-emerald-400 flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-zinc-900"
          >
            <Search className="w-4 h-4" />
            <span className="font-semibold hidden sm:inline">Recherche</span>
          </button>
        </div>
      </nav>
    </>
  );
}

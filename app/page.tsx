"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Diamond, BookOpen, ChevronRight, Binary, Search } from 'lucide-react';
import { Insight, INSIGHT_MOCKS, FUTURE_TOPICS } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsights = useMemo(() => {
    if (!searchQuery.trim()) return INSIGHT_MOCKS;
    const lowerQuery = searchQuery.toLowerCase();
    return INSIGHT_MOCKS.filter(
      (insight) => 
        insight.title.toLowerCase().includes(lowerQuery) ||
        insight.excerpt.toLowerCase().includes(lowerQuery) ||
        insight.tag.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  // Animation variants
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 md:px-24">
      {/* Navigation (Premium Glass) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-b border-slate-800/50 bg-slate-950/70 px-6 backdrop-blur-xl md:px-24 transition-all duration-300">
        <Link href="/" className="group flex items-center gap-2 text-xl font-bold tracking-tighter text-slate-100 font-serif">
          <Diamond className="w-5 h-5 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
          <span className="italic tracking-widest uppercase">ECN</span>
        </Link>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <Link href="#search" className="transition-colors hover:text-cyan-400 flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            Recherche
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mt-24 flex w-full max-w-5xl flex-col items-start gap-6 py-24 relative">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="mb-6 inline-flex items-center rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 mr-2 animate-pulse"></span>
            Independent Deeptech Boutique
          </div>
          <h1 className="text-5xl font-serif font-semibold tracking-tight text-slate-50 md:text-7xl leading-tight">
            ECN Research <br />
            <span className="text-slate-500 font-sans font-light tracking-tighter">Technology Capital.</span>
          </h1>
          <p className="max-w-2xl text-lg text-slate-400 md:text-xl mt-6 font-light leading-relaxed">
            Intelligence technologique & données qualitatives exhaustives pour le financement en Private Equity (Growth & LBO).
          </p>
        </motion.div>
      </section>

      {/* Section 'Notre Thèse' */}
      <section className="flex w-full max-w-5xl flex-col py-20 relative">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
          className="relative border-l border-cyan-500/40 pl-8 md:pl-12"
        >
          <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_2px_rgba(34,211,238,0.5)]"></div>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-cyan-400 flex items-center gap-2">
            <Binary className="w-4 h-4" /> Notre Thèse
          </h2>
          <p className="max-w-4xl text-2xl font-light leading-relaxed text-slate-300 md:text-4xl font-serif">
            L'asymétrie d'information entre l'innovation technique et l'allocation de capital 
            financier reste le principal frein à l'efficacité du Private Equity. <span className="text-white font-normal bg-gradient-to-r from-slate-100 to-slate-400 bg-clip-text text-transparent">ECN comble ce fossé</span> par une recherche indépendante 
            rigoureuse, mêlant expertise sectorielle et modélisation pointue.
          </p>
        </motion.div>
      </section>

      {/* Latest Insights Section */}
      <section className="flex w-full max-w-5xl flex-col gap-12 py-24 min-h-[500px]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-300 w-max shrink-0">Dernières Analyses</h2>
            <div className="h-px w-full max-w-sm bg-gradient-to-r from-slate-800 to-transparent"></div>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-72 shrink-0 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input 
              id="search"
              type="text" 
              placeholder="Rechercher une thématique..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/40 border border-slate-800 rounded-full pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all shadow-inner"
            />
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer} initial="hidden" animate="visible"
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredInsights.length > 0 ? (
              filteredInsights.map((insight) => (
                <motion.div 
                  key={insight.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <InsightCard insight={insight} />
                </motion.div>
              ))
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center text-slate-500 flex flex-col items-center gap-3"
              >
                <Search className="w-8 h-8 text-slate-700" />
                <p>Aucune analyse trouvée pour "{searchQuery}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Section 'Sujets à l'étude' */}
      <section className="flex w-full max-w-5xl flex-col gap-8 py-20 border-t border-slate-800/50">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Sujets à l'étude (Futures Analyses)</h2>
        <div className="flex flex-wrap gap-3">
          {FUTURE_TOPICS.map((topic, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ delay: index * 0.05 }} viewport={{ once: true }}
              key={index} 
              className="group flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/50 px-5 py-2 text-sm text-slate-300 backdrop-blur-sm transition-all hover:border-cyan-500/50 hover:bg-slate-800"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/40 group-hover:bg-cyan-400 transition-colors"></span>
              {topic}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-5xl border-t border-slate-800/50 py-12 text-sm text-slate-500">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Diamond className="w-4 h-4 text-slate-700" />
            <span>© {currentYear} EPI Capital Network. Boutique Indépendante.</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xs uppercase tracking-widest text-slate-500 hover:text-cyan-400 transition-colors">
              Accès Privé
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link href={`/research/${insight.slug}`} className="block h-full group">
      <div className={cn(
        "flex flex-col gap-6 h-full p-8 rounded-xl",
        "glass-card glass-card-hover relative overflow-hidden"
      )}>
        {/* Subtle glow effect on hover inside card */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-cyan-500/10 blur-2xl group-hover:bg-cyan-500/20 transition-colors duration-500"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-medium text-slate-500 font-mono tracking-tight">{insight.date}</span>
          <span className="rounded-full border border-slate-700/80 bg-slate-800/80 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400 drop-shadow-sm">
            {insight.tag}
          </span>
        </div>
        
        <div className="relative z-10 flex-1">
          <h3 className="mb-4 text-xl font-serif font-semibold leading-snug text-slate-200 transition-colors group-hover:text-white">
            {insight.title}
          </h3>
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {insight.excerpt}
          </p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-slate-500 transition-all group-hover:text-cyan-400 relative z-10">
          Lire l'Analyse
          <ChevronRight className="ml-2 w-4 h-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-cyan-400" />
        </div>
      </div>
    </Link>
  );
}

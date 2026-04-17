"use client";

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { Diamond, ChevronRight, Binary } from 'lucide-react';
import { Insight, INSIGHT_MOCKS, FUTURE_TOPICS } from '@/lib/data';
import { cn } from '@/lib/utils';

export default function Home() {
  const currentYear = new Date().getFullYear();

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
    <main className="flex min-h-screen flex-col items-center px-6 py-24 md:px-24 relative">
      {/* Hero Section */}
      <section className="mt-24 flex w-full max-w-5xl flex-col items-start gap-6 py-24 relative">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <div className="mb-6 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
            Independent Tech Boutique
          </div>
          <h1 className="text-5xl font-serif font-semibold tracking-tight text-zinc-50 md:text-7xl leading-tight">
            ECN Research <br />
            <span className="text-zinc-500 font-sans font-light tracking-tighter">Technology Capital.</span>
          </h1>
          <p className="max-w-2xl text-lg text-zinc-400 md:text-xl mt-6 font-light leading-relaxed">
            Intelligence technologique & données qualitatives exhaustives pour le financement en Private Equity (Growth & LBO).
          </p>
          <div className="mt-8 flex gap-4">
            <Link href="#analyses" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-zinc-950 bg-emerald-400 hover:bg-emerald-300 px-6 py-3 rounded-full transition-colors">
              Parcourir nos analyses
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Section 'Notre Thèse' */}
      <section className="flex w-full max-w-5xl flex-col py-20 relative">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeIn}
          className="relative border-l border-emerald-500/40 pl-8 md:pl-12"
        >
          <div className="absolute -left-[5px] top-0 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_2px_rgba(52,211,153,0.5)]"></div>
          <h2 className="mb-6 text-xs font-bold uppercase tracking-[0.25em] text-emerald-400 flex items-center gap-2">
            <Binary className="w-4 h-4" /> Notre Thèse
          </h2>
          <p className="max-w-4xl text-2xl font-light leading-relaxed text-zinc-300 md:text-4xl font-serif">
            L'asymétrie d'information entre l'innovation technique et l'allocation de capital 
            financier reste le principal frein à l'efficacité du Private Equity. <span className="text-white font-normal bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent">ECN comble ce fossé</span> par une recherche indépendante 
            rigoureuse, mêlant expertise sectorielle et modélisation pointue.
          </p>
        </motion.div>
      </section>

      {/* Latest Insights Section */}
      <section id="analyses" className="flex w-full max-w-5xl flex-col gap-12 py-24 min-h-[400px]">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div className="flex items-center gap-6 flex-1">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-300 w-max shrink-0">Dernières Analyses</h2>
            <div className="h-px w-full max-w-sm bg-gradient-to-r from-zinc-800 to-transparent"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={staggerContainer} initial="hidden" animate="visible" viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {INSIGHT_MOCKS.map((insight) => (
            <motion.div 
              key={insight.id} 
              variants={fadeIn}
              className="h-full"
            >
              <InsightCard insight={insight} />
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-8 flex justify-center">
            <div className="text-xs font-bold tracking-widest uppercase text-emerald-400 px-6 py-3 border border-emerald-500/30 rounded-full">
              Utilisez (Ctrl+K) pour explorer l'archive complète
            </div>
        </div>
      </section>

      {/* Section 'Sujets à l'étude' */}
      <section className="flex w-full max-w-5xl flex-col gap-8 py-20 border-t border-zinc-800/50">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Sujets à l'étude (Futures Analyses)</h2>
        <div className="flex flex-wrap gap-3">
          {FUTURE_TOPICS.map((topic, index) => (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ delay: index * 0.05 }} viewport={{ once: true }}
              key={index} 
              className="group flex items-center gap-2 rounded-full border border-zinc-800/80 bg-zinc-900/50 px-5 py-2 text-sm text-zinc-300 backdrop-blur-sm transition-all hover:border-emerald-500/50 hover:bg-zinc-800"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors"></span>
              {topic}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-5xl border-t border-zinc-800/50 py-12 text-sm text-zinc-500">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <Diamond className="w-4 h-4 text-zinc-700" />
            <span>© {currentYear} EPI Capital Network. Boutique Indépendante.</span>
          </div>
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xs uppercase tracking-widest text-zinc-500 hover:text-emerald-400 transition-colors">
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
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-emerald-500/10 blur-2xl group-hover:bg-emerald-500/20 transition-colors duration-500"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <span className="text-xs font-medium text-zinc-500 font-mono tracking-tight">{insight.date}</span>
          <span className="rounded-full border border-zinc-700/80 bg-zinc-800/80 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 drop-shadow-sm">
            {insight.tag}
          </span>
        </div>
        
        <div className="relative z-10 flex-1">
          <h3 className="mb-4 text-xl font-serif font-semibold leading-snug text-zinc-200 transition-colors group-hover:text-white">
            {insight.title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed">
            {insight.excerpt}
          </p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 transition-all group-hover:text-emerald-400 relative z-10">
          Lire l'Analyse
          <ChevronRight className="ml-2 w-4 h-4 text-zinc-600 transition-all group-hover:translate-x-1 group-hover:text-emerald-400" />
        </div>
      </div>
    </Link>
  );
}

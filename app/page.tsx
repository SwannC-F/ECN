import React from 'react';
import Link from 'next/link';
import { Insight, INSIGHT_MOCKS, FUTURE_TOPICS } from '@/lib/data';

export default function Home() {
  const currentYear = new Date().getFullYear();

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 md:px-24">
      {/* Navigation (Épurée) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-slate-900 bg-slate-950/80 px-6 backdrop-blur-md md:px-24">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-100 italic">ECN</Link>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <Link href="/" className="transition-colors hover:text-cyan-400">Recherche</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mt-20 flex w-full max-w-5xl flex-col items-start gap-4 py-20">
        <h1 className="text-5xl font-bold tracking-tighter text-slate-50 md:text-7xl">
          ECN Research
        </h1>
        <p className="max-w-xl text-lg text-slate-400 md:text-xl">
          Intelligence Technologique & Données pour le Capital Privé (Growth & LBO).
        </p>
      </section>

      {/* Section 'Notre Thèse / À propos' */}
      <section className="flex w-full max-w-5xl flex-col py-16">
        <div className="border-l-2 border-cyan-500/50 pl-8 md:pl-12">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Notre Thèse</h2>
          <p className="max-w-3xl text-2xl font-light leading-relaxed text-slate-300 md:text-3xl">
            L'asymétrie d'information entre l'innovation technique et l'allocation de capital 
            financier reste le principal frein à l'efficacité du Private Equity. <span className="text-slate-100 font-normal">ECN comble ce fossé</span> par une recherche indépendante 
            rigoureuse, mêlant expertise sectorielle et modélisation financière de pointe.
          </p>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="flex w-full max-w-5xl flex-col gap-12 py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Dernières Analyses</h2>
          <div className="h-px flex-1 bg-slate-900 ml-8"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {INSIGHT_MOCKS.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      </section>

      {/* Section 'Sujets à l'étude' (Suggestions) */}
      <section className="flex w-full max-w-5xl flex-col gap-8 py-16 border-t border-slate-900/50">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Sujets à l'étude (Futures Analyses)</h2>
        <div className="flex flex-wrap gap-4">
          {FUTURE_TOPICS.map((topic, index) => (
            <div key={index} className="flex items-center gap-2 rounded-full border border-slate-900 bg-slate-950 px-4 py-2 text-sm text-slate-400 italic">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/40"></span>
              {topic}
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-5xl border-t border-slate-900 py-12 text-sm text-slate-500">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>© {currentYear} EPI Capital Network. Boutique de Recherche Indépendante.</div>
          <div className="flex items-center gap-8.5">
            <span className="text-xs text-slate-600 block">Accès Privé</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className="group flex flex-col gap-6 border border-slate-900 bg-slate-950 p-8 transition-all hover:border-slate-800 hover:bg-slate-900/40">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{insight.date}</span>
        <span className="rounded-full border border-slate-800 bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          {insight.tag}
        </span>
      </div>
      <div>
        <h3 className="mb-3 text-xl font-semibold leading-snug text-slate-200 transition-colors group-hover:text-slate-50">
          {insight.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
          {insight.excerpt}
        </p>
      </div>
      <Link 
        href={`/research/${insight.slug}`}
        className="mt-auto flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan-400"
      >
        Lire l'Analyse
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
}

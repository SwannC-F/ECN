import React from 'react';
import Link from 'next/link';
import { INSIGHT_MOCKS } from '@/lib/data';

export default async function ResearchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const insight = INSIGHT_MOCKS.find(i => i.slug === slug);

  if (!insight) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-200">
        <h1 className="text-2xl font-bold">Analyse Introuvable</h1>
        <Link href="/" className="mt-4 text-cyan-400 hover:underline">Retour à l'accueil</Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 md:px-24 bg-slate-950 text-slate-200">
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-slate-900 bg-slate-950/80 px-6 backdrop-blur-md md:px-24">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-100 italic transition-colors hover:text-cyan-400">ECN</Link>
      </nav>

      <article className="mt-20 w-full max-w-3xl flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4 text-sm text-slate-500">
            <span>{insight.date}</span>
            <span className="h-4 w-px bg-slate-800"></span>
            <span className="text-cyan-400 font-bold uppercase tracking-wider">{insight.tag}</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-50 md:text-5xl">
            {insight.title}
          </h1>
        </div>

        <div className="rounded border border-cyan-500/20 bg-cyan-500/5 p-6 text-center">
          <p className="text-lg font-medium text-cyan-400">
            Analyse complète disponible prochainement : **Printemps 2026**
          </p>
          <p className="mt-2 text-sm text-slate-400">
            Nos rapports de recherche sont actuellement en cours de finalisation pour distribution institutionnelle.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-slate-400 leading-relaxed italic">
          <p>{insight.excerpt}</p>
          <p>
            Ce rapport détaillera les dynamiques opérationnelles, les multiples de sortie cibles et les leviers 
            de création de valeur spécifiques à ce segment du marché européen.
          </p>
        </div>

        <Link href="/" className="mt-12 flex items-center text-sm font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-slate-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la recherche
        </Link>
      </article>
    </main>
  );
}

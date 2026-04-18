import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { INSIGHT_MOCKS } from '@/lib/data';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import DocumentPanel from '@/components/PdfViewer';
import ReviewSection from '@/components/ReviewSection';
import PdfLoginGate from '@/components/PdfLoginGate';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const insight = INSIGHT_MOCKS.find(i => i.slug === slug);
  
  if (!insight) return { title: 'Analyse Introuvable | ECN' };
  
  return {
    title: `${insight.title} | ECN Research`,
    description: insight.excerpt,
  };
}

export default async function ResearchPage({ params }: PageProps) {
  const { slug } = await params;
  const insight = INSIGHT_MOCKS.find(i => i.slug === slug);
  const session = await getServerSession(authOptions);

  if (session?.user?.email && insight?.pdfs) {
    try {
      const user = await prisma.user.findUnique({
        where: { email: session.user.email }
      });
      if (user) {
        await prisma.unlock.upsert({
          where: {
            userId_postSlug: {
              userId: user.id,
              postSlug: slug
            }
          },
          update: {},
          create: {
            userId: user.id,
            postSlug: slug
          }
        });
      }
    } catch (e) {
      console.error("Erreur tracking unlock", e);
    }
  }

  if (!insight) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-200">
        <h1 className="text-2xl font-bold font-serif mb-4 text-zinc-100">Analyse Introuvable</h1>
        <Link href="/" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
          <ChevronLeft className="w-4 h-4" /> Retour à l'accueil
        </Link>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 md:px-24">
      <article className="mt-16 w-full max-w-3xl flex flex-col gap-10">
        
        <Link href="/#analyses" className="w-max flex items-center text-xs font-bold uppercase tracking-widest text-zinc-500 transition-colors hover:text-emerald-400">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour à la recherche
        </Link>

        <header className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {insight.date}</span>
            <span className="h-4 w-px bg-zinc-800"></span>
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">
              <Tag className="w-3.5 h-3.5" /> {insight.tag}
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-50 md:text-5xl font-serif leading-tight">
            {insight.title}
          </h1>
        </header>

        {/* Dynamic Document Panel */}
        {insight.pdfs ? (
          session ? (
            <DocumentPanel files={insight.pdfs} />
          ) : (
            <PdfLoginGate />
          )
        ) : (
          <div className="glass-card p-8 rounded-xl border border-emerald-500/30 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 blur-3xl -ml-10 -mt-10"></div>
            <p className="text-lg font-medium text-emerald-400 relative z-10">
              Archive complète disponible : <span className="text-white">Printemps 2026</span>
            </p>
            <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xl mx-auto relative z-10">
              Nos rapports de recherche détaillés sont actuellement en cours de finalisation et seront distribués exclusivement à notre réseau institutionnel.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-8 text-zinc-300 leading-relaxed font-light text-lg mt-4">
          <p className="text-xl text-zinc-200 font-medium">{insight.excerpt}</p>
          <div className="w-12 h-px bg-zinc-800"></div>
          <p>
            Ce rapport détaillera de manière exhaustive les dynamiques opérationnelles transversales, les multiples de sortie cibles et les principaux leviers de création de valeur inhérents à ce segment complexe du marché européen. 
          </p>
          <p>
            En traitant ce sujet par le prisme combiné de la maturité technologique et du cycle d'investissement, ECN Research fournit un cadre d'analyse décisionnel asymétrique et exclusif.
          </p>
        </div>

        {/* Section Avis */}
        <ReviewSection postSlug={slug} />
      </article>
    </main>
  );
}

import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center px-6 py-24 md:px-24">
      {/* Header / Nav Placeholder (Minimalist) */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center justify-between border-b border-slate-900 bg-slate-950/80 px-6 backdrop-blur-md md:px-24">
        <div className="text-lg font-bold tracking-tight text-slate-100">ECN</div>
        <div className="flex gap-8 text-sm font-medium text-slate-400">
          <a href="#" className="transition-colors hover:text-cyan-400">Research</a>
          <a href="#" className="transition-colors hover:text-cyan-400">Network</a>
          <a href="#" className="transition-colors hover:text-cyan-400">Deeptech</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mt-20 flex w-full max-w-5xl flex-col items-start gap-4 py-20">
        <h1 className="text-5xl font-bold tracking-tighter text-slate-50 md:text-7xl">
          ECN Research
        </h1>
        <p className="max-w-xl text-lg text-slate-400 md:text-xl">
          Tech & Data Intelligence for Private Capital. Specialized in Deeptech, Cloud Infrastructure, and AI.
        </p>
      </section>

      {/* Manifesto Section */}
      <section className="flex w-full max-w-5xl flex-col py-20">
        <div className="border-l-2 border-cyan-500/50 pl-8 md:pl-12">
          <p className="max-w-3xl text-2xl font-light leading-relaxed text-slate-300 md:text-3xl">
            Information asymmetry between technical innovation and financial investment 
            remains the primary barrier to capital efficiency in Deeptech. 
            ECN bridges this gap through rigorous independent research, 
            combining engineering depth with financial modeling.
          </p>
        </div>
      </section>

      {/* Latest Insights Section */}
      <section className="flex w-full max-w-5xl flex-col gap-12 py-20">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">Latest Insights</h2>
          <div className="h-px flex-1 bg-slate-900 ml-8"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <InsightCard 
            date="Oct 12, 2024"
            tag="AI"
            title="The Compute Cost Curve: LLM Economics in Production"
          />
          <InsightCard 
            date="Sep 28, 2024"
            tag="SaaS"
            title="Vertical SaaS in Heavy Industry: The Next Frontier"
          />
          <InsightCard 
            date="Sep 15, 2024"
            tag="Cloud"
            title="Quantum Sovereignty: Europe's Infrastructure Play"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto w-full max-w-5xl border-t border-slate-900 py-12 text-sm text-slate-500">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div>© 2024 EPI Capital Network. Independent Research.</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
            <a href="#" className="hover:text-slate-300">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function InsightCard({ date, tag, title }: { date: string, tag: string, title: string }) {
  return (
    <div className="group flex flex-col gap-6 border border-slate-900 bg-slate-950 p-8 transition-all hover:border-slate-800 hover:bg-slate-900/40">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-slate-500">{date}</span>
        <span className="rounded-full border border-slate-800 bg-slate-900 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
          {tag}
        </span>
      </div>
      <h3 className="text-xl font-semibold leading-snug text-slate-200 transition-colors group-hover:text-slate-50">
        {title}
      </h3>
      <button className="mt-4 flex items-center text-xs font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-cyan-400">
        Read Deep Dive
        <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

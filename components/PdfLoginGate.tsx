"use client";

import { signIn } from "next-auth/react";
import { Lock } from "lucide-react";

export default function PdfLoginGate() {
  return (
    <div className="glass-card p-10 rounded-xl border border-zinc-800/50 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[300px]">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-zinc-950/80 to-zinc-950 -z-10"></div>
      
      <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center mb-6 ring-1 ring-zinc-800 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
        <Lock className="w-8 h-8 text-emerald-500" />
      </div>
      
      <h3 className="text-xl font-medium text-zinc-200 mb-3 font-serif">
        Accès Restreint : Data Room
      </h3>
      
      <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        Le rapport complet et la modélisation financière sont exclusivement réservés aux membres de notre réseau. Connectez-vous pour débloquer le document.
      </p>
      
      <button
        onClick={() => signIn("linkedin")}
        className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-8 py-3 rounded-lg text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(0,119,181,0.3)]"
      >
        Débloquer avec LinkedIn
      </button>
    </div>
  );
}

import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { ShieldAlert, Download, Users, LockKeyhole } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  // Vérification stricte : Seul cet email est admin
  if (session?.user?.email !== "swann.charleryfontes@gmail.com") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4">
        <div className="glass-card p-10 rounded-xl border border-red-500/30 text-center max-w-md">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-medium text-zinc-100 mb-2">Accès Interdit</h1>
          <p className="text-zinc-400 text-sm mb-6">Vous n'avez pas les droits d'administrateur pour accéder à cette zone.</p>
          <Link href="/" className="px-6 py-2 bg-zinc-800 text-zinc-200 rounded-lg hover:bg-zinc-700 transition-colors text-sm">
            Retour à l'accueil
          </Link>
        </div>
      </main>
    );
  }

  // Récupération des utilisateurs avec leurs unlocks
  const users = await prisma.user.findMany({
    include: {
      unlocks: true,
      reviews: true,
    },
    orderBy: {
      id: 'desc'
    }
  });

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-200 py-24 px-6 md:px-24">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-serif font-bold text-zinc-50 flex items-center gap-3">
              <LockKeyhole className="text-emerald-400 w-8 h-8" />
              ECN Back-Office
            </h1>
            <p className="text-zinc-400 mt-2">Vue d'ensemble de la base CRM et de l'activité des utilisateurs.</p>
          </div>
          <Link 
            href="/api/admin/export"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold px-5 py-2.5 rounded-lg transition-colors text-sm w-max"
          >
            <Download className="w-4 h-4" />
            Exporter CSV
          </Link>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-xl border border-zinc-800 flex items-center gap-4">
            <div className="bg-emerald-500/10 p-3 rounded-lg"><Users className="text-emerald-400 w-6 h-6" /></div>
            <div>
              <p className="text-zinc-500 text-sm font-medium">Total Utilisateurs</p>
              <p className="text-2xl font-bold text-zinc-100">{users.length}</p>
            </div>
          </div>
        </div>

        <section className="glass-card rounded-xl border border-zinc-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-zinc-900/50 border-b border-zinc-800 text-zinc-400 font-medium">
                <tr>
                  <th className="px-6 py-4">Utilisateur</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Thèses Débloquées</th>
                  <th className="px-6 py-4">Avis</th>
                  <th className="px-6 py-4">Rôle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {users.map((user: any) => (
                  <tr key={user.id} className="hover:bg-zinc-900/30 transition-colors">
                    <td className="px-6 py-4 flex items-center gap-3">
                      {user.image ? (
                        <img src={user.image} alt={user.name || "User"} className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-xs">?</div>
                      )}
                      <a 
                        href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(user.name ?? "")}`} 
                        target="_blank" 
                        className="font-medium text-zinc-200 hover:text-emerald-400 transition-colors"
                      >
                        {user.name}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{user.email}</td>
                    <td className="px-6 py-4 text-emerald-400 font-mono">
                      {user.unlocks.length > 0 ? user.unlocks.map((u: any) => u.postSlug).join(", ") : "-"}
                    </td>
                    <td className="px-6 py-4 text-zinc-500">
                      {user.reviews.length}
                    </td>
                    <td className="px-6 py-4">
                      {user.email === "swann.charleryfontes@gmail.com" ? (
                        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-1 rounded font-bold tracking-wider uppercase">Admin</span>
                      ) : (
                        <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded font-bold tracking-wider uppercase">User</span>
                      )}
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                      Aucun utilisateur trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

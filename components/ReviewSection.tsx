"use client";

import { useSession, signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Send, User as UserIcon } from "lucide-react";


interface Review {
  id: string;
  content: string;
  rating: number | null;
  createdAt: string;
  user: {
    name: string | null;
    image: string | null;
  };
}

export default function ReviewSection({ postSlug }: { postSlug: string }) {
  const { data: session, status } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [postSlug]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/reviews?postSlug=${postSlug}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data);
      }
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, postSlug }),
      });

      if (res.ok) {
        setContent("");
        fetchReviews(); // Refresh the reviews list
      }
    } catch (error) {
      console.error("Failed to submit review", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("fr-FR", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  };

  return (
    <div className="mt-16 pt-8 border-t border-zinc-800/50">
      <h3 className="text-2xl font-serif text-zinc-200 mb-8">Avis & Analyses</h3>

      {/* Formulaire ou Bouton de Connexion */}
      {status === "loading" ? (
        <div className="h-24 glass-card animate-pulse rounded-xl" />
      ) : session ? (
        <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4 mb-4">
            {session.user?.image ? (
              <img
                src={session.user.image}
                alt={session.user.name ?? "User"}
                className="w-10 h-10 rounded-full ring-2 ring-emerald-500/20"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center ring-2 ring-emerald-500/20">
                <UserIcon className="w-5 h-5 text-zinc-400" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-zinc-300 mb-2">
                Publier en tant que {session.user?.name}
              </p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Partagez votre analyse ou votre avis sur ce rapport..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 text-zinc-200 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 resize-none h-24"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting || !content.trim()}
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              {isSubmitting ? "Envoi..." : "Publier l'avis"}
            </button>
          </div>
        </form>
      ) : (
        <div className="glass-card rounded-xl p-8 mb-12 text-center border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-md">
          <h4 className="text-lg text-zinc-300 mb-2 font-medium">Rejoignez la discussion</h4>
          <p className="text-zinc-500 mb-6 text-sm">
            Vous devez être connecté avec votre compte LinkedIn pour laisser un avis institutionnel.
          </p>
          <button
            onClick={() => signIn("linkedin")}
            className="inline-flex items-center gap-2 bg-[#0077b5] hover:bg-[#006097] text-white px-6 py-3 rounded-lg text-sm font-medium transition-all hover:shadow-[0_0_20px_rgba(0,119,181,0.3)]"
          >
            Se connecter avec LinkedIn
          </button>
        </div>
      )}

      {/* Liste des Avis */}
      <div className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="glass-card h-32 animate-pulse rounded-xl" />
            ))}
          </div>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="glass-card rounded-xl p-6 transition-colors hover:bg-zinc-900/40">
              <div className="flex items-start gap-4">
                {review.user.image ? (
                  <img
                    src={review.user.image}
                    alt={review.user.name ?? "User"}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <UserIcon className="w-5 h-5 text-zinc-500" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <a 
                      href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(review.user.name ?? "")}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-zinc-200 font-medium text-sm hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                      title="Rechercher ce profil sur LinkedIn"
                    >
                      {review.user.name}
                      <svg className="w-3 h-3 opacity-50" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                    <span className="text-zinc-500 text-xs">{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="text-zinc-400 text-sm leading-relaxed whitespace-pre-wrap">
                    {review.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-zinc-500 text-sm py-8">
            Aucun avis pour le moment. Soyez le premier à partager votre analyse.
          </p>
        )}
      </div>
    </div>
  );
}

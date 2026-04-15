export interface Insight {
  id: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  slug: string;
}

export const INSIGHT_MOCKS: Insight[] = [
  {
    id: "1",
    title: "La Courbe de Coût du Calcul : Économie des LLM en Production",
    date: "12 Oct, 2024",
    tag: "IA",
    excerpt: "Analyse approfondie des structures de coûts opérationnels pour le déploiement de modèles de langage à grande échelle.",
    slug: "economie-llm-production",
  },
  {
    id: "2",
    title: "SaaS Vertical dans l'Industrie Lourde : La Prochaine Frontière",
    date: "28 Sep, 2024",
    tag: "SaaS",
    excerpt: "Comment la numérisation des processus industriels critiques crée des opportunités d'investissement massives.",
    slug: "saas-vertical-industrie",
  },
  {
    id: "3",
    title: "Souveraineté Quantique : Le Pari de l'Infrastructure Européenne",
    date: "15 Sep, 2024",
    tag: "Cloud",
    excerpt: "Étude des initiatives continentales pour sécuriser l'indépendance technologique face aux géants américains et asiatiques.",
    slug: "souverainete-quantique-europe",
  },
];

export const FUTURE_TOPICS = [
  "Fusion Nucléaire & Réseaux Privés",
  "Cybersécurité Post-Quantique",
  "Optimisation de la Supply Chain par l'IA Graphes",
];

export interface Insight {
  id: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  slug: string;
  pdfs?: {
    fr?: string;
    en?: string;
  };
  deepDive?: string;
}

export const INSIGHT_MOCKS: Insight[] = [
  {
    id: "1",
    title: "Infrastructures Data Center & Edge Computing : L'Appel du Growth",
    date: "12 Mars, 2026",
    tag: "Infrastructure",
    excerpt: "Analyse des modèles de rendement sur les actifs réels liés à l'IA et au cloud souverain.",
    slug: "infrastructure-data-center-edge",
    pdfs: {
      fr: "/reports/infrastructure-data-center-fr.pdf",
      en: "/reports/infrastructure-data-center-en.pdf"
    },
    deepDive: "/reports/infrastructure-data-center-deep-dive.pdf"
  },
  {
    id: "2",
    title: "Consolidation Cyber-B2B : Analyse des Multiples d'EBITDA",
    date: "28 Fév, 2026",
    tag: "Cybersécurité",
    excerpt: "Étude des opportunités de 'Build-up' dans un marché fragmenté en quête de rentabilité.",
    slug: "consolidation-cyber-b2b",
    pdfs: {
      fr: "/reports/consolidation-cyber-b2b-fr.pdf",
      en: "/reports/consolidation-cyber-b2b-en.pdf"
    },
    deepDive: "/reports/consolidation-cyber-b2b-deep-dive.pdf"
  },
  {
    id: "3",
    title: "Automatisation ERP & Efficacité Opérationnelle en LBO",
    date: "15 Jan, 2026",
    tag: "SaaS Enterprise",
    excerpt: "Comment l'intégration de l'IA générative dans les ERP transforme les plans de création de valeur.",
    slug: "automatisation-erp-lbo",
    pdfs: {
      fr: "/reports/automatisation-erp-fr.pdf",
      en: "/reports/automatisation-erp-en.pdf"
    },
    deepDive: "/reports/automatisation-erp-deep-dive.pdf"
  },
];

export const FUTURE_TOPICS = [
  "Consolidation des Services IT Managés (MSP)",
  "SaaS Vertical pour la Supply Chain Industrielle",
  "Financement de la Transition Énergétique en Infra PE",
];

# Roadmap & Planning ECN (Features "Pro Max")

Ce document centralise les prochaines grandes fonctionnalités à développer pour asseoir le positionnement d'ECN auprès des fonds de Private Equity et de leurs participations (Portcos). L'objectif est de transformer la plateforme en un outil de *Deal Sourcing* et d'aide à la décision.

---

## 🟢 Phase 1 : L'Outil Interactif "Impact EBITDA / Valorisation"

**Objectif** : Rendre les due diligences techniques immédiatement mesurables financièrement pour les Partners.

- [ ] Créer un composant interactif `EbitdaCalculator.tsx`.
- [ ] Intégrer des sliders (Dépenses Cloud actuelles, Multiple d'EBITDA cible).
- [ ] Calcul en temps réel de l'économie estimée via le "Cloud Repatriation" et de la Création de Valeur (Enterprise Value).

## 🟡 Phase 2 : Module "Ask ECN" (IA RAG sur les Data Rooms)

**Objectif** : Permettre aux analystes d'interroger directement la thèse de recherche (format **A4 Vertical**) de 50 pages via une IA spécialisée.

- [ ] Intégrer un module de Chatbot contextuel (Design minimaliste).
- [ ] Vectoriser les PDF de recherche (Embeddings) pour créer une base de connaissances propriétaire.
- [ ] L'IA ne répondra qu'en se basant strictement sur les thèses ECN, avec citation des sources/pages.

## 🟠 Phase 3 : "Market Map" B2B Interactive

**Objectif** : Prouver la maîtrise de l'écosystème européen pour rassurer les fonds sur les stratégies de *Build-up*.

- [ ] Créer une page interactive de cartographie d'écosystèmes (ex: Cybersécurité B2B, Cloud européen).
- [ ] Filtres dynamiques par sous-secteur et maturité de l'entreprise.
- [ ] Modale "Avis ECN" au clic sur le logo d'une startup pour afficher le *take* chirurgical du réseau.

## 🔵 Phase 4 : Déploiement de l'Architecture de Contenu (Le Club)

**Objectif** : Alimenter le réseau (Jeunes Talents & Vétérans) au-delà des immenses thèses trimestrielles.

- [ ] **Section News (Signaux Faibles)** : Interface type "Fil Bloomberg" épuré pour des *semi-deep dives* réactifs sur l'actualité Tech.
- [ ] **Section Interviews** : Format dédié aux retours d'expérience des CTOs de portcos et Operating Partners du réseau.
- [ ] Gating stratégique via LinkedIn (ex: "Connectez-vous pour lire l'interview du Partner KKR").

---

*Note : Le Dashboard Admin (CRM) a été réalisé et déployé.*

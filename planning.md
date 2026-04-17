# Roadmap & Planning ECN (Features "Pro Max")

Ce document centralise les prochaines grandes fonctionnalités à développer pour asseoir le positionnement d'ECN auprès des fonds de Private Equity et de leurs participations (Portcos). L'objectif est de transformer la plateforme en un outil de *Deal Sourcing* et d'aide à la décision.

---

## 🟢 Phase 1 : L'Outil Interactif "Impact EBITDA / Valorisation"
**Objectif** : Rendre les due diligences techniques immédiatement mesurables financièrement pour les Partners.
- [ ] Créer un composant interactif `EbitdaCalculator.tsx`.
- [ ] Intégrer des sliders (Design Glassmorphism, curseurs Emerald) pour :
  - Dépenses Cloud actuelles (OpEx en M€).
  - Multiple d'EBITDA cible du secteur (ex: 12x).
- [ ] Calcul en temps réel de l'économie estimée via le "Cloud Repatriation" et affichage dynamique de la Création de Valeur (Enterprise Value).
- [ ] Placer cet outil juste en dessous de l'Executive Summary de la thèse.

## 🟡 Phase 2 : Export "Copy for IC Memo" (Comité d'Investissement)
**Objectif** : Faciliter le travail des analystes et Partners lors de la rédaction de leurs mémos d'investissement.
- [ ] Créer un bouton `CopyForICMemo.tsx` intégré aux thèses de recherche.
- [ ] Développer une fonction qui génère un condensé textuel (Markdown/Texte Brut) parfait pour être collé dans Word/PPT.
- [ ] Le format copié inclura : 
  - Thèse d'investissement en 2 lignes.
  - Chiffres clés de l'impact financier (issus du calculateur si possible).
  - Risques techniques majeurs.
- [ ] Ajouter une notification "Copié dans le presse-papier" stylisée.

## 🔴 Phase 3 : Tableau de Bord "Admin" (CRM / Sourcing)
**Objectif** : Exploiter la base de données générée par les connexions LinkedIn pour faire de la génération de leads qualifiés.
- [ ] Créer une route protégée `/admin` (vérification de l'email administrateur via NextAuth).
- [ ] Développer un tableau de bord listant tous les utilisateurs stockés dans Vercel Postgres.
- [ ] Afficher les données clés : Nom, Email, Photo, et (si possible via une logique d'historique) les thèses qu'ils ont "débloquées".
- [ ] Ajouter une fonctionnalité pour exporter cette liste (CSV) afin de l'intégrer dans un CRM ou un outil d'envoi de newsletter (Substack/Mailchimp).

---

*Note : L'implémentation de ces phases peut se faire indépendamment. La Phase 1 est prioritaire pour maximiser l'effet "Wahou" sur le Proof of Concept "Cloud Repatriation".*

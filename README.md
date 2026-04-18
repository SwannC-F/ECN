# ECN Research Platform

Plateforme institutionnelle de recherche et d'analyse pour le Private Equity & Deeptech.

## Stack Technique (Pro Max)
- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS, Framer Motion (Animations), Lucide React (Icônes)
- **Base de Données** : Vercel Postgres
- **ORM** : Prisma
- **Authentification** : NextAuth.js (Auth.js) via LinkedIn OIDC

## Fonctionnalités Principales
- **Design Intelligence** : UI/UX minimaliste "Glassmorphism" avec teintes Zinc/Emerald, typographie Serif (Playfair Display) et Sans (Inter).
- **Liseuse Intégrée** : Affichage natif ou modale pleine page supportant les formats **A4 Vertical** (Investment Memo) et **16:9 Horizontal** (Technical Deep Dive).
- **Système d'Avis Premium & Gating** : Authentification stricte via LinkedIn (SSO) pour restreindre l'accès à la "Data Room" et garantir l'identité institutionnelle des interactions.
- **CRM Back-Office (Lead Generation)** : Un tableau de bord administrateur sécurisé (`/admin`) permettant de tracker les lectures ("Unlocks") et d'exporter les leads qualifiés (CSV).

## Installation & Lancement en local

1. **Installer les dépendances**
```bash
npm install
```

2. **Configuration de l'environnement**
Copier le fichier `.env.example` en `.env.local` et renseigner vos variables (NextAuth, LinkedIn Client ID/Secret, Postgres URL).

3. **Base de données (Prisma)**
```bash
npx prisma db push
npx prisma generate
```

4. **Lancer le serveur de développement**
```bash
npm run dev
```

## Déploiement
Le projet est optimisé pour **Vercel**. Lors du déploiement, le script `build` (`prisma generate && prisma db push && next build`) se charge automatiquement de mettre à jour le schéma de la base de données Postgres rattachée au projet Vercel.
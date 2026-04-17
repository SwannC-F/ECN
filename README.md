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
- **Liseuse Intégrée** : Affichage natif ou modale pleine page des rapports PDF.
- **Système d'Avis Premium** : Authentification stricte via LinkedIn (SSO) pour garantir la qualité et l'identité institutionnelle des commentaires sur les rapports de recherche. À noter : l'API LinkedIn sécurisée ne fournissant plus l'URL directe des profils, le nom des commentateurs agit comme un lien de recherche intelligent redirigeant vers LinkedIn.

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
# ECN Research - UI/UX Design System "Pro Max"

Ce fichier défini les règles strictes de design ("Design Intelligence") à respecter lors de la création ou modification des pages et composants de l'application ECN. L'objectif est de projeter l'image d'une **Boutique de Recherche Institutionnelle (Private Equity & Tech)**, mêlant rigueur financière et avant-gardisme technologique.

## 1. Typographie
- **Titres Principaux (Hero, Article Titles)** : `font-serif` (Playfair Display). Confère un aspect éditorial, luxueux et rassurant (style Wall Street Journal / Boutique tier-1).
- **Corps de texte & UI** : `font-sans` (Inter). Apporte de la lisibilité et un style "Tech". Toujours privilégier des fontes légères pour le texte long (`font-light` ou `font-[300]`) avec un espacement lisible (`leading-relaxed`).
- **Sur-titres & Tags** : Majuscules (`uppercase`), espacées (`tracking-widest`), petites (`text-xs` ou `text-[10px]`), avec des polices `font-bold` ou `font-mono`.

## 2. Palette de Couleurs "Tech Capital"
- **Fond de page** : Très sombre. Palette `zinc-950` et éléments `zinc-900`.
- **Texte Principal** : `zinc-300` ou `zinc-200` (jamais blanc pur pour éviter l'éblouissement).
- **Texte Secondaire** : `zinc-400` ou `zinc-500` (pour les dates, métadonnées, sous-titres).
- **Accent Couleur (L'étincelle)** : `emerald-400` et `emerald-500`. Utilisé modérément pour souligner une interaction, tracer une bordure ("glow" effect), ou une icône majeure. C'est l'ADN "Tech".

## 3. Le "Glassmorphism"
Tous les conteneurs majeurs (Cartes, bannières, modals) doivent éviter les aplats classiques. Exigences :
- Les fonds doivent être semi-transparents : ex. `bg-zinc-900/50`.
- Les bordures doivent être très subtiles : ex. `border-zinc-800/50`.
- Utiliser la classe maison globale `.glass-card` et `.glass-card-hover` (définies dans `globals.css`).
- Toujours incorporer un flou arrière (`backdrop-blur-md` ou `backdrop-blur-xl`) sur les éléments flottants (Navbar, Modales).

## 4. Interactions & Animations
- L'interface doit sembler **organique et réactive**. Pas d'animations brusques.
- Toujours utiliser `framer-motion` avec des variantes de type "Fade In" ascendant (`y: 20 -> y: 0`) ou des listes en cascade (`staggerChildren`).
- Les éléments interactifs (boutons, liens) doivent répondre au hover de manière élaborée : une icône flèche qui se décale (`group-hover:translate-x-1`), ou un reflet (`glow`) qui s'allume au survol.

## 5. Composants Minimalistes & "Command Palette"
On refuse les formulaires et barres de texte laids et permanents.
La recherche doit être centralisée dans une "Command Palette" modale flottante (accessible par `Ctrl+K` ou `Cmd+K`), au-dessus d'un fond flou, pour ne pas encombrer le point de mire principal (la lecture de la thèse).

## 6. Icônes
Utiliser `lucide-react` avec des tracés fins (default `strokeWidth={2}`). Toujours les associer harmonieusement avec des étiquettes texte (ex: `<Search className="w-4 h-4"/> Recherche`).

## 7. Gestion des Rapports PDF (La Liseuse)
Afin de préserver le "Design Intelligence" jusqu'au bout, on refuse de forcer le téléchargement des PDF dans des onglets inesthétiques par défaut.
- **Workflow CMS** : Les PDFs finaux (FR et EN) doivent être déposés dans le dossier `/public/reports/`.
- **Intégration Data** : Ils doivent être référencés dans `lib/data.ts` dans la clé `pdfs: { fr: "...", en: "..." }`.
- **Expérience de Lecture (UX)** : L'interface gère automatiquement l'outil de lecture intelligent. Deux formats sont supportés : **A4 Vertical** (Investment Memo) et **16:9 Horizontal** (Deep Dive). Si le client est sur Ordinateur (`isMobile: false`), la lecture s'incruste en plein écran via une "Modale Liseuse" sans quitter l'App. S'il est sur Mobile, on utilise une ouverture d'onglet natif pour laisser le téléphone s'en charger confortablement. Les téléchargements forcent l'usage de l'attribut natif `download`.

*Toute nouvelle intégration doit se soumettre à ce cahier des charges "Pro Max".*

## 8. Authentification, Base de Données & CRM
Afin de garantir un standard institutionnel sur les interactions :
- **Authentification (NextAuth)** : Les commentaires et accès aux Data Rooms sont réservés aux utilisateurs connectés via **LinkedIn**. L'administrateur système (Swann) est reconnu automatiquement via son email LinkedIn pour l'accès au CRM.
- **Confidentialité LinkedIn (Profils)** : L'API LinkedIn (OIDC v2) interdit la récupération de l'URL directe du profil d'un utilisateur. En contournement ("Design Intelligence"), le nom de l'utilisateur affiché sur son avis est transformé en lien de recherche globale LinkedIn.
- **Tracking & CRM (Back-Office)** : La base de données (Prisma) traque chaque déblocage de rapport (`Unlock`). Un back-office sécurisé `/admin` permet d'exporter ces leads (fichiers CSV) pour un suivi commercial (Deal Sourcing).
- **Déploiement Automatisé** : Le fichier `package.json` est configuré avec un script de build combiné (`prisma generate && prisma db push && next build`) assurant que Vercel synchronise la base de données automatiquement à chaque publication.

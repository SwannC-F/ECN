# ECN Research - UI/UX Design System "Pro Max"

Ce fichier défini les règles strictes de design ("Design Intelligence") à respecter lors de la création ou modification des pages et composants de l'application ECN. L'objectif est de projeter l'image d'une **Boutique de Recherche Institutionnelle (Private Equity & Deeptech)**, mêlant rigueur financière et avant-gardisme technologique.

## 1. Typographie
- **Titres Principaux (Hero, Article Titles)** : `font-serif` (Playfair Display). Confère un aspect éditorial, luxueux et rassurant (style Wall Street Journal / Boutique tier-1).
- **Corps de texte & UI** : `font-sans` (Inter). Apporte de la lisibilité et un style "Tech". Toujours privilégier des fontes légères pour le texte long (`font-light` ou `font-[300]`) avec un espacement lisible (`leading-relaxed`).
- **Sur-titres & Tags** : Majuscules (`uppercase`), espacées (`tracking-widest`), petites (`text-xs` ou `text-[10px]`), avec des polices `font-bold` ou `font-mono`.

## 2. Palette de Couleurs "Tech Capital"
- **Fond de page** : Très sombre. Palette `slate-950` et éléments `slate-900`.
- **Texte Principal** : `slate-300` ou `slate-200` (jamais blanc pur pour éviter l'éblouissement).
- **Texte Secondaire** : `slate-400` ou `slate-500` (pour les dates, métadonnées, sous-titres).
- **Accent Couleur (L'étincelle)** : `cyan-400` et `cyan-500`. Utilisé modérément pour souligner une interaction, tracer une bordure ("glow" effect), ou une icône majeure. C'est l'ADN "Deeptech".

## 3. Le "Glassmorphism"
Tous les conteneurs majeurs (Cartes, bannières, modals) doivent éviter les aplats classiques. Exigences :
- Les fonds doivent être semi-transparents : ex. `bg-slate-900/50`.
- Les bordures doivent être très subtiles : ex. `border-slate-800/50`.
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

*Toute nouvelle intégration doit se soumettre à ce cahier des charges "Pro Max".*

# Maison Ardent

Site vitrine fictif de plomberie et confort thermique à Vichy. Direction éditoriale, photographies originales générées par IA, palette pierre / charbon / cuivre. Astro, TypeScript et CSS, sans React ni serveur applicatif.

## Lancer le projet

Node **22.19 ou supérieur** requis ; Node **24.19** recommandé et indiqué dans `.node-version`.

```sh
npm ci
npm run dev
```

L’aperçu est disponible sur `http://127.0.0.1:4321`.

```sh
npm run build   # Vérification TypeScript puis génération statique
npm run preview # Servir dist en local
npm run audit   # Vérifier les pages, liens, images et budget JavaScript générés
```

## Organisation

- `src/components/` : les 17 sections demandées et les composants de marque.
- `src/data/site.ts` : coordonnées, services, projets, avis, communes et FAQ.
- `src/data/images.ts` : association des photographies aux usages.
- `src/assets/` : les cinq photographies originales, faciles à remplacer.
- `src/layouts/Layout.astro` : structure HTML, métadonnées et polices locales.
- `src/styles/` : fondations, sections, formulaires et adaptations responsive.
- `src/scripts/` : interactions légères et formulaire local en deux étapes.
- `src/pages/` : accueil, réalisations, contact, pages d’information, 404, robots et sitemap.
- `docs/` : provenance des images, vérifications et captures.

## Interactions

Menu mobile et galerie avec des dialogues natifs : navigation clavier, Échap, retour du focus. Portfolio filtrable, expertises en accordéons, FAQ native et comparateur avant/après avec un curseur accessible au clavier et au tactile. Révélations légères au scroll et transitions natives entre documents, neutralisées avec `prefers-reduced-motion`.

Le formulaire offre deux parcours : rendez-vous avec cinq prochains jours ouvrés et créneau matin/après-midi ; devis avec budget facultatif. Les liens acceptent `?mode=devis`, `?mode=rdv`, `?service=chauffage` et `?ville=Cusset`. Les champs sont validés avant de continuer. Les pièces jointes sont limitées à trois images JPG, PNG ou WebP de 5 Mo chacune.

**Cette démonstration n’envoie rien, ne réserve rien et ne conserve aucune donnée.** Les pièces jointes restent locales. Les coordonnées, assurances, années d’expérience, réalisations et avis sont fictifs. Ne pas utiliser de données personnelles réelles pour les tests.

## Cloudflare Pages

Le résultat est un site entièrement statique : aucun adaptateur, Worker ou base de données n’est nécessaire.

Dans un projet Cloudflare Pages connecté au dépôt :

| Paramètre | Valeur |
| --- | --- |
| Répertoire racine | Ce dossier, ou `maison-ardent` si le dépôt contient le dossier parent |
| Commande de build | `npm run build` |
| Répertoire de sortie | `dist` |
| `NODE_VERSION` | `24.19.0` |
| `PUBLIC_SITE_URL` | Le domaine final, avec `https://` |
| `PUBLIC_DEMO_MODE` | `true` pour cette démonstration |
| `ASTRO_TELEMETRY_DISABLED` | `1` si souhaité |

On peut aussi transférer directement le dossier `dist` généré. Les en-têtes de sécurité et la mise en cache des assets sont définis dans `public/_headers`. La politique `form-action 'none'` interdit tout envoi natif accidentel.

Documentation officielle : [Astro sur Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/).

## Avant de transformer ce concept en site commercial

1. Remplacer les coordonnées fictives, les projets et tous les avis par des éléments vérifiés.
2. Fournir les informations de l’éditeur, l’hébergeur réel et les mentions adaptées.
3. Connecter le formulaire à un service réel et gérer ses états d’erreur ; modifier la politique CSP en conséquence. Le formulaire actuel n’est pas une interface d’envoi de production.
4. Remplacer le calendrier simulé par un planning réel, ou présenter des préférences soumises à confirmation.
5. Configurer `PUBLIC_SITE_URL`, puis seulement après validation du contenu, passer `PUBLIC_DEMO_MODE` à `false` pour permettre l’indexation.
6. Ajouter éventuellement les données `LocalBusiness` vérifiées. La démo utilise uniquement `WebSite`, sans déclarer d’entreprise ou de note fictive aux moteurs de recherche.

Le mode démo est volontairement en `noindex, nofollow`, avec un `robots.txt` restrictif. Les titres, descriptions, OpenGraph, sitemap et URL canoniques sont déjà préparés. Aucun outil de suivi, police distante, carte externe ou cookie applicatif n’est intégré.

## Photographies

Toutes les photos ont été produites avec l’outil Imagegen intégré, puis copiées dans `src/assets`. Astro génère leurs versions AVIF et WebP au build. Le hero est chargé en priorité, les autres images sont différées. Les prompts et l’usage de chaque image sont consignés dans `docs/IMAGES.md`.

Le projet a fait l’objet d’une première construction, puis d’une seconde passe visuelle dédiée à la lisibilité, au cadrage, aux espacements et aux formulaires mobiles. Voir `docs/VERIFICATION.md` pour les vérifications effectivement réalisées et leurs limites.

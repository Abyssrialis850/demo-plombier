# Vérifications effectuées

Date : 31 août 2026. Contrôles dans le navigateur intégré, puis sur le build statique servi localement.

## Construction et intégrité

- `npm run build` : **0 erreur, 0 avertissement, 0 indication TypeScript**.
- Six pages HTML générées, en plus de `robots.txt` et `sitemap.xml`.
- `npm run audit` : **200 liens internes** et **23 instances d’images** vérifiés ; un H1 par page, métadonnées, dimensions d’images et cibles d’ancres contrôlés.
- Un fichier JavaScript : **8 425 octets**, **2 862 octets gzip**.
- Une feuille CSS : **52 344 octets**, **14 495 octets gzip**.
- Aucun framework d’interface client, service distant de police, carte embarquée ou traceur.
- Images servies en AVIF/WebP, y compris le format de repli. Le hero est prioritaire ; les photographies suivantes sont chargées à la demande.

Les valeurs détaillées sont dans `build-audit.json`. Les tailles gzip sont calculées sur les fichiers générés ; elles ne constituent pas une mesure de débit réseau.

## Responsive

Les trois pages principales ont été contrôlées aux largeurs **375, 390, 430, 768, 1440 et 1920 px**. Aucun débordement horizontal de contenu détecté. Les résultats de ces 18 configurations sont conservés dans `responsive-audit.json`.

Les contrôles visuels portent sur le hero, le manifeste, les expertises, le portfolio, le formulaire, la galerie et le comparateur. Captures dans `screenshots/`.

## Interactions exercées

- Menu mobile : ouverture, fermeture, liens ; dialogue natif avec gestion explicite d’Échap.
- CTA « Demander un devis » : ouverture du bon parcours avec `?mode=devis` dans le build statique.
- Formulaire de devis complet avec données fictives, validation des champs requis, téléphone et email, affichage du récapitulatif sans envoi.
- Parcours rendez-vous : service, jour ouvré et préférence horaire ; retour à l’étape précédente conservant les choix ; validation complète dans le build statique.
- Sélection de quatre photos : rejet avec « Choisissez 3 photos maximum ». Contrôles de format et taille également implémentés ; ils n’ont pas tous été exercés dans le navigateur.
- Galerie : filtre chauffage affichant deux projets, ouverture du projet, fermeture par Échap et retour du focus au déclencheur.
- Comparateur : touches Début / Fin et flèches ; glissement de 99 % à 45 %, avec mise à jour visuelle et du texte accessible.
- Expertises : ouverture du chauffage et changement de photographie.
- FAQ : ouverture d’une réponse dans l’accordéon natif.

Les interactions de clavier et de glissement ont une gestion explicite en complément des contrôles natifs pour rester prévisibles sur les moteurs de navigateur et les surfaces d’automatisation.

## Seconde passe de direction artistique

Après observation de la première version desktop et mobile :

- Augmentation de la lisibilité des paragraphes et de la navigation.
- Renforcement des contrastes des numéros de section et des textes indicatifs.
- Adaptation de la hauteur et de la typographie du hero aux ordinateurs moins hauts.
- Correction des retours à la ligne des choix de formulaire à 375 px.
- Raccourcissement de l’introduction mobile de la page contact pour rapprocher le formulaire.
- Vérification du recadrage des photos, des espacements et du comparateur mobile.
- Suppression des versions PNG de repli dans le build et réduction de la qualité de compression du hero sans altérer sa composition.
- Ajout d’une commande pour retirer les pièces jointes et du respect de la réduction des animations lors du récapitulatif.

## Limites assumées

- Aucun score Lighthouse n’est annoncé : Lighthouse n’a pas été exécuté.
- Tests effectués dans le navigateur intégré, pas sur des appareils iOS/Android physiques ni avec un lecteur d’écran. Ces vérifications complémentaires restent conseillées avant une mise en service commerciale.
- Les appels et emails ne sont pas testés vers un destinataire : coordonnées fictives et liens de démonstration.
- Pas de backend, d’envoi de formulaire ou de réservation réelle. Le succès affiché est explicitement une simulation.
- Aucun déploiement public effectué. Le build est prêt pour un hébergement statique ; le README explique les paramètres de Cloudflare Pages.
- Le référencement est volontairement désactivé en mode démonstration afin de ne pas indexer une fausse entreprise ou de faux avis.

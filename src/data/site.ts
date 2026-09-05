export const site = {
  name: 'Maison Ardent',
  subtitle: 'Plomberie & Confort Thermique',
  phone: '04 00 00 00 00',
  phoneHref: 'tel:+33400000000',
  email: 'bonjour@maison-ardent.example',
  address: '12, rue de la Maison · 03200 Vichy',
  demo: import.meta.env.PUBLIC_DEMO_MODE !== 'false',
};

export const towns = ['Vichy', 'Cusset', 'Bellerive-sur-Allier', 'Saint-Yorre', 'Saint-Pourçain-sur-Sioule'];

export const services = [
  { id: 'plomberie', number: '01', title: 'Plomberie', detail: 'Une eau qui circule. Un quotidien qui coule de source.', description: 'Réseaux, robinetterie et remplacement de chauffe-eau : nous soignons autant ce qui se voit que ce qui se cache derrière vos murs.', image: 'detail', tags: 'Installation · Rénovation · Chauffe-eau' },
  { id: 'chauffage', number: '02', title: 'Chauffage', detail: 'La bonne chaleur, au bon endroit.', description: 'Chaudière, radiateurs et régulation : une installation dimensionnée pour votre maison, vos habitudes et votre confort.', image: 'heating', tags: 'Chaudière · Radiateurs · Régulation' },
  { id: 'salle-de-bain', number: '03', title: 'Salle de bain', detail: 'Votre pièce à vous. Pensée dans son ensemble.', description: 'De la première implantation à la dernière finition, un seul interlocuteur pour une salle de bain agréable à vivre et facile à entretenir.', image: 'bathroom', tags: 'Conception · Rénovation · Finitions' },
  { id: 'depannage', number: '04', title: 'Dépannage & entretien', detail: 'Retrouver le confort. Et le préserver.', description: 'Fuite, panne ou entretien annuel de chaudière : un diagnostic expliqué, une proposition claire, puis une intervention ciblée.', image: 'workshop', tags: 'Recherche de fuite · Dépannage · Entretien chaudière' },
] as const;

export const projects = [
  { id: 'pierre-et-lumiere', title: 'La pierre, l’eau, la lumière.', city: 'Cusset', type: 'Salle de bain', category: 'salle-de-bain', image: 'bathroom', year: '2026', description: 'Une pièce repensée autour de matières naturelles, d’une robinetterie cuivrée et de circulations plus douces.', scope: 'Rénovation complète · 12 m² · Travertin & noyer', alt: 'Salle de bain en pierre naturelle, baignoire îlot et robinetterie cuivrée' },
  { id: 'chaleur-discrete', title: 'Une chaleur qui se fait discrète.', city: 'Vichy', type: 'Chauffage', category: 'chauffage', image: 'heating', year: '2026', description: 'Des radiateurs choisis pour s’intégrer à l’architecture et une régulation pensée pièce par pièce.', scope: 'Installation chauffage · Maison de ville', alt: 'Radiateur contemporain dans un intérieur français aux matières naturelles' },
  { id: 'justesse-du-detail', title: 'La justesse du détail.', city: 'Bellerive-sur-Allier', type: 'Plomberie', category: 'plomberie', image: 'detail', year: '2025', description: 'Des arrivées d’eau reprises avec précision et une robinetterie murale qui libère le plan de vasque.', scope: 'Rénovation plomberie · Robinetterie encastrée', alt: 'Robinet mural en cuivre brossé au-dessus d’une vasque en travertin' },
  { id: 'confort-retrouve', title: 'Le confort, pour longtemps.', city: 'Saint-Yorre', type: 'Chauffage', category: 'chauffage', image: 'workshop', year: '2025', description: 'Le remplacement d’une chaudière vieillissante, avec un réseau contrôlé, des raccordements ordonnés et des réglages expliqués.', scope: 'Remplacement chaudière · Mise en service', alt: 'Artisan effectuant les derniers réglages d’une installation de chauffage propre' },
] as const;

export const testimonials = [
  { quote: 'On nous a expliqué chaque choix. Le résultat est aussi agréable à vivre qu’à regarder, et le chantier a été laissé impeccable.', name: 'Claire M.', city: 'Cusset', service: 'Rénovation de salle de bain' },
  { quote: 'Un devis lisible, des horaires respectés et une installation très soignée. On sait enfin à qui confier le chauffage de la maison.', name: 'Thomas L.', city: 'Vichy', service: 'Installation de chauffage' },
  { quote: 'Une fuite repérée rapidement, un diagnostic clair et aucune mauvaise surprise. J’ai apprécié le soin apporté aux finitions.', name: 'Sophie R.', city: 'Bellerive-sur-Allier', service: 'Dépannage plomberie' },
];

export const faqs = [
  { q: 'Intervenez-vous en urgence ?', a: 'Pour une fuite ou une panne, le téléphone reste le chemin le plus direct. Nous évaluons la situation avec vous et précisons nos disponibilités avant tout déplacement. Cette démonstration ne propose aucune intervention réelle.' },
  { q: 'Le devis est-il gratuit ?', a: 'Pour un projet de rénovation ou d’installation, le premier échange permet de cadrer votre besoin et les conditions de la visite. Si un diagnostic ou un déplacement doit être facturé, son tarif vous est annoncé et soumis à votre accord en amont.' },
  { q: 'Travaillez-vous en dehors de Vichy ?', a: 'Notre périmètre présenté couvre Vichy, Cusset, Bellerive-sur-Allier, Saint-Yorre et Saint-Pourçain-sur-Sioule. Pour une commune voisine, indiquez simplement votre adresse lors du premier échange afin de vérifier la faisabilité.' },
  { q: 'Pouvez-vous rénover entièrement une salle de bain ?', a: 'Oui. Le projet peut réunir l’implantation, la reprise des réseaux, les équipements sanitaires et les finitions. Le périmètre précis et les éventuels autres corps de métier sont définis lors de la visite, puis détaillés dans la proposition.' },
  { q: 'Combien coûte un remplacement de chaudière ?', a: 'Le coût dépend de l’équipement retenu, de la puissance nécessaire, de l’état du réseau et des adaptations à prévoir. Une visite technique permet de construire un devis adapté, plutôt que d’annoncer un prix qui ne correspondrait pas à votre maison.' },
  { q: 'Quels sont vos délais d’intervention ?', a: 'Ils varient selon la nature du besoin et le planning. Une urgence est évaluée par téléphone ; un projet de rénovation fait l’objet d’un calendrier convenu ensemble. Les créneaux affichés sur ce site sont uniquement des exemples pour la démonstration.' },
  { q: 'Proposez-vous l’entretien annuel ?', a: 'L’entretien de chaudière fait partie des prestations présentées. Vous pouvez choisir ce motif dans le formulaire et préciser le modèle de votre équipement. Le contenu de la prestation et le créneau sont confirmés avant le rendez-vous.' },
];

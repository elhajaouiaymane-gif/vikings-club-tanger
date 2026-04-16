export type Locale = 'en' | 'fr' | 'es' | 'ar';

export const localeNames: Record<Locale, { flag: string; label: string }> = {
  en: { flag: '🇬🇧', label: 'English' },
  fr: { flag: '🇫🇷', label: 'Français' },
  es: { flag: '🇪🇸', label: 'Español' },
  ar: { flag: '🇲🇦', label: 'العربية' },
};

export type TranslationKeys = {
  // Nav
  home: string;
  about: string;
  classes: string;
  trainers: string;
  gallery: string;
  services: string;
  pricing: string;
  locations: string;
  join_now: string;

  // Hero
  train_like_a: string;
  viking: string;
  subtitle: string;
  start_journey: string;
  see_gym: string;
  hero_followers_value: string;
  hero_days_value: string;
  hero_hours_value: string;

  // Stats
  our_impact: string;
  stats_title: string;
  stats_description: string;
  trust_badge: string;
  trust_sub: string;
  instagram_followers: string;
  days_open: string;
  hours_daily: string;
  branches: string;

  // CTA
  start_free_trial: string;
  book_session: string;
  train_with_us: string;
  get_started: string;
  contact_us: string;

  // Footer
  follow_us: string;
  quick_links: string;
  contact_info: string;
  join_today: string;

  // Chat
  welcome: string;
  placeholder: string;
  send: string;

  // About section
  about_badge: string;
  about_title: string;
  about_subtitle: string;
  about_heading: string;
  about_story: string;
  about_mission: string;
  about_founded: string;
  about_members: string;
  about_years: string;
  about_programs: string;
  about_values_title: string;
  about_strength: string;
  about_strength_desc: string;
  about_discipline: string;
  about_discipline_desc: string;
  about_community: string;
  about_community_desc: string;
  about_legacy: string;
  about_legacy_desc: string;

  // Services section
  services_label: string;
  services_title: string;
  services_title_highlight: string;
  services_subtitle: string;
  services_muscu: string;
  services_muscu_desc: string;
  services_crossfit: string;
  services_crossfit_desc: string;
  services_cardio: string;
  services_cardio_desc: string;
  services_coaching: string;
  services_coaching_desc: string;
  services_boxing: string;
  services_boxing_desc: string;
  services_group: string;
  services_group_desc: string;

  // Pricing section
  pricing_label: string;
  pricing_title: string;
  pricing_subtitle: string;
  pricing_start_now: string;
  pricing_get_started: string;
  pricing_plan1_name: string;
  pricing_plan1_period: string;
  pricing_plan2_name: string;
  pricing_plan2_period: string;
  pricing_plan2_badge: string;
  pricing_plan2_save: string;
  pricing_plan3_name: string;
  pricing_plan3_period: string;
  pricing_plan3_badge: string;
  pricing_plan3_save: string;
  pricing_plan4_name: string;
  pricing_plan4_period: string;
  pricing_plan4_badge: string;
  pricing_plan4_save: string;
  pricing_f_gym: string;
  pricing_f_muscu: string;
  pricing_f_locker: string;
  pricing_f_crossfit: string;
  pricing_f_boxe: string;
  pricing_f_crossfit_boxe: string;
  pricing_f_coaching: string;
  pricing_f_all_classes: string;
  pricing_f_nutrition: string;

    // Testimonials section
  testimonials_label: string;
  testimonials_title: string;
  testimonials_subtitle: string;

  // Featured Reel section
  reel_title_part1: string;
  reel_title_highlight: string;
  reel_subtitle: string;
  reel_watch: string;
  reel_cta: string;

  // Locations section
  locations_label: string;
  locations_title: string;
  locations_subtitle: string;
  locations_great_choice: string;
  locations_pick_branch: string;
  locations_find: string;
  locations_detecting: string;
  locations_denied: string;
  locations_unavailable: string;
  locations_detected: string;
  locations_nearest: string;
  locations_nearest_short: string;
  locations_hours: string;
  locations_away: string;
  locations_directions: string;
  locations_directions_from: string;

  // Footer extra
  footer_tagline: string;
  footer_description: string;
  footer_branch1: string;
  footer_branch1_address: string;
  footer_branch2: string;
  footer_branch2_address: string;
  footer_hours: string;
  footer_rights: string;

  // Why Vikings section
  why_label: string;
  why_heading: string;
  why_subtitle: string;
  why_title1: string;
  why_t1_p1: string;
  why_t1_p2: string;
  why_t1_p3: string;
  why_title2: string;
  why_t2_p1: string;
  why_t2_p2: string;
  why_t2_p3: string;
  why_title3: string;
  why_t3_p1: string;
  why_t3_p2: string;
  why_t3_p3: string;
  why_title4: string;
  why_t4_p1: string;
  why_t4_p2: string;
  why_t4_p3: string;
};

const translations: Record<Locale, TranslationKeys> = {
  en: {
    home: 'Home',
    about: 'About',
    classes: 'Classes',
    trainers: 'Trainers',
    gallery: 'Gallery',
    services: 'Services',
    pricing: 'Pricing',
    locations: 'Locations',
    join_now: 'Join Now',

    train_like_a: 'Train Like a',
    viking: 'Viking',
    subtitle: 'Unleash your inner warrior at Tangier\'s most elite gym',
    start_journey: 'Start Your Journey',
    see_gym: 'See the Gym',
    hero_followers_value: '3,375+',
    hero_days_value: '7 Days/Week',
    hero_hours_value: '15hr Daily',

    our_impact: 'Our Impact',
    stats_title: 'Building Champions Since Day One',
    stats_description: 'Numbers that speak for themselves — welcome to the Vikings family',
    trust_badge: '99% Satisfied Members',
    trust_sub: 'Trusted by hundreds of Vikings in Tangier',

    instagram_followers: 'Instagram Followers',
    days_open: 'Days Open',
    hours_daily: 'Hours Daily',
    branches: 'Branches',

    start_free_trial: 'Start Free Trial',
    book_session: 'Book a Session',
    train_with_us: 'Train With Us',
    get_started: 'Get Started',
    contact_us: 'Contact Us',

    follow_us: 'Follow Us',
    quick_links: 'Quick Links',
    contact_info: 'Contact Info',
    join_today: 'Join Today',

    welcome: 'Welcome to Vikings Club!',
    placeholder: 'Type a message...',
    send: 'Send',
        pricing_label: 'Membership',
    pricing_title: 'Choose Your Plan',
    pricing_subtitle: 'Flexible membership options designed to fit your fitness goals and lifestyle. Start your transformation today.',
    pricing_start_now: 'Start Now',
    pricing_get_started: 'Get Started',
    pricing_plan1_name: '1 MONTH',
    pricing_plan1_period: 'month',
    pricing_plan2_name: '3 MONTHS',
    pricing_plan2_period: '3 months',
    pricing_plan2_badge: 'SAVE 100 MAD',
    pricing_plan2_save: 'Save 100 MAD!',
    pricing_plan3_name: '6 MONTHS',
    pricing_plan3_period: '6 months',
    pricing_plan3_badge: 'BEST VALUE',
    pricing_plan3_save: 'Save 400 MAD!',
    pricing_plan4_name: '1 YEAR',
    pricing_plan4_period: 'year',
    pricing_plan4_badge: 'SAVE 1200 MAD',
    pricing_plan4_save: 'Biggest Savings!',
    pricing_f_gym: 'Full Gym Access 7/7',
    pricing_f_muscu: 'Musculation & Equipment',
    pricing_f_locker: 'Locker Room',
    pricing_f_crossfit: 'Crossfit Zone Access',
    pricing_f_boxe: 'Boxing Classes',
    pricing_f_crossfit_boxe: 'Crossfit & Boxing',
    pricing_f_coaching: 'Personal Coaching',
    pricing_f_all_classes: 'All Classes Included',
    pricing_f_nutrition: 'Nutrition Advice',
    testimonials_label: 'Testimonials',
    testimonials_title: 'What Our Members Say',
    testimonials_subtitle: 'Real stories from real members. See how Vikings Club has helped thousands achieve their fitness goals.',
    reel_title_part1: 'Feel The',
    reel_title_highlight: 'Energy',
    reel_subtitle: 'Don\'t just take our word for it — watch our latest reel and see what Vikings Club is all about',
    reel_watch: 'Watch on Instagram',
    reel_cta: 'Ready to Train? Choose Your Plan',
    locations_label: 'Our Locations',
    locations_title: 'Our Locations',
    locations_subtitle: '2 branches in Tangier — 100% Men, 7 days a week. Pick the one closest to you.',
    locations_great_choice: 'Great Choice!',
    locations_pick_branch: 'Now pick the branch that\'s most convenient for you',
    locations_find: 'Find Nearest Branch',
    locations_detecting: 'Detecting your location...',
    locations_denied: 'Location access denied — both branches shown equally below',
    locations_unavailable: 'Geolocation not supported by your browser',
    locations_detected: 'Location detected — showing nearest branch',
    locations_nearest: 'Nearest to You',
    locations_nearest_short: 'NEAREST',
    locations_hours: '8:00 AM – 11:00 PM • 7 days/week',
    locations_away: 'away',
    locations_directions: 'Get Directions',
    locations_directions_from: 'Get Directions from Your Location',
    footer_tagline: 'Men-only gym in Tangier',
    footer_description: '2 branches in Tangier. Men-only gym, open 7 days a week.',
    footer_branch1: 'Branch 1:',
    footer_branch1_address: 'Sahat Al Madina',
    footer_branch2: 'Branch 2:',
    footer_branch2_address: 'Mesnana, Qouasem',
    footer_hours: '7 Days/Week: 8:00 AM - 11:00 PM',
    footer_rights: 'All rights reserved.',
    why_label: 'Our Promise',
    why_heading: 'Why',
    why_subtitle: 'We don\'t just build bodies — we forge warriors. Here\'s what makes Vikings Club different from every other gym in Tangier.',
    why_title1: 'Viking Discipline',
    why_t1_p1: 'Impeccable hygiene & cleanliness',
    why_t1_p2: 'Well-maintained equipment always',
    why_t1_p3: 'Hygiene stations throughout the gym',
    why_title2: 'Viking Brotherhood',
    why_t2_p1: 'A brotherhood that pushes you forward',
    why_t2_p2: 'Supportive coaches who actually care',
    why_t2_p3: 'Group training that feels like family',
    why_title3: 'Premium Arsenal',
    why_t3_p1: 'Latest-generation machines & weights',
    why_t3_p2: 'Spacious & well-ventilated areas',
    why_t3_p3: 'Dedicated zones for every style',
    why_title4: "Warrior's Price",
    why_t4_p1: 'Premium gym, honest prices',
    why_t4_p2: 'Flexible plans for every budget',
    why_t4_p3: 'No hidden fees — ever',
    // About
    about_badge: 'Our Story',
    about_title: 'More Than a Gym',
    about_subtitle: 'Vikings Club Tanger is a brotherhood of warriors, forged in discipline and united by the pursuit of greatness.',
    about_heading: 'Built on Viking Spirit',
    about_story: 'Founded in the heart of Tanger, Vikings Club was born from a passion for fitness and the warrior spirit. We believe every person has a Viking inside them — relentless, disciplined, and unstoppable.',
    about_mission: 'Our mission is to unlock that potential through world-class training, cutting-edge equipment, and a community that pushes you beyond your limits. Whether you are a beginner or a seasoned athlete, you belong here.',
    about_founded: 'Year Founded',
    about_members: 'Members',
    about_years: 'Years',
    about_programs: 'Programs',
    about_values_title: 'Our Core Values',
    about_strength: 'Strength',
    about_strength_desc: 'Building physical and mental power through proven training methods and unwavering dedication.',
    about_discipline: 'Discipline',
    about_discipline_desc: 'Consistency and commitment form the foundation of every transformation journey.',
    about_community: 'Community',
    about_community_desc: 'A supportive brotherhood where every member lifts each other toward greatness.',
    about_legacy: 'Legacy',
    about_legacy_desc: 'Creating lasting impact through mentorship, leadership, and inspiring the next generation.',

    // Services
    services_label: 'What We Offer',
    services_title: 'Train Your',
    services_title_highlight: 'Way',
    services_subtitle: 'From heavy lifts to mindful stretches, we have everything you need to reach your peak performance.',
    services_muscu: 'Musculature',
    services_muscu_desc: 'Full range of free weights and machines for building strength and muscle.',
    services_crossfit: 'CrossFit',
    services_crossfit_desc: 'High-intensity functional training combining weightlifting, cardio, and gymnastics.',
    services_cardio: 'Cardio Zone',
    services_cardio_desc: 'Modern cardio equipment including treadmills, bikes, and rowing machines.',
    services_coaching: 'Personal Coaching',
    services_coaching_desc: 'One-on-one coaching with experienced trainers to reach your fitness goals.',
    services_boxing: 'Boxing',
    services_boxing_desc: 'Learn boxing techniques from experienced coaches. Build discipline, power, and confidence.',
    services_group: 'Group Training',
    services_group_desc: 'Energetic group sessions that push you harder with team motivation.',
  },

  fr: {
    home: 'Accueil',
    about: 'À Propos',
    classes: 'Cours',
    trainers: 'Coachs',
    gallery: 'Galerie',
    services: 'Services',
    pricing: 'Tarifs',
    locations: 'Adresses',
    join_now: 'Rejoindre',

    train_like_a: 'Entraîne-toi comme un',
    viking: 'Viking',
    subtitle: 'Libère le guerrier qui est en toi dans la salle de sport la plus élite de Tanger',
    start_journey: 'Commencez Votre Aventure',
    see_gym: 'Voir la Salle',
    hero_followers_value: '3 375+',
    hero_days_value: '7 Jours/Semaine',
    hero_hours_value: '15h/Jour',

    our_impact: 'Notre Impact',
    stats_title: 'Construire des Champions depuis le Premier Jour',
    stats_description: 'Les chiffres parlent d\'eux-mêmes — bienvenue dans la famille Vikings',
    trust_badge: '99% Membres Satisfaits',
    trust_sub: 'La confiance de centaines de Vikings à Tanger',

    instagram_followers: 'Abonnés Instagram',
    days_open: 'Jours d\'Ouverture',
    hours_daily: 'Heures par Jour',
    branches: 'Agences',

    start_free_trial: 'Essai Gratuit',
    book_session: 'Réserver une Séance',
    train_with_us: 'Entraînez-vous avec Nous',
    get_started: 'Commencer',
    contact_us: 'Contactez-nous',

    follow_us: 'Suivez-nous',
    quick_links: 'Liens Rapides',
    contact_info: 'Nous Contacter',
    join_today: 'Rejoignez-nous',

    welcome: 'Bienvenue au Vikings Club !',
    placeholder: 'Tapez un message...',
    send: 'Envoyer',
        pricing_label: 'Adhésion',
    pricing_title: 'Choisissez Votre Formule',
    pricing_subtitle: 'Des options d\'adhésion flexibles conçues pour vos objectifs fitness. Commencez votre transformation aujourd\'hui.',
    pricing_start_now: 'Commencer',
    pricing_get_started: 'S\'inscrire',
    pricing_plan1_name: '1 MOIS',
    pricing_plan1_period: 'mois',
    pricing_plan2_name: '3 MOIS',
    pricing_plan2_period: '3 mois',
    pricing_plan2_badge: 'ÉCONOMISEZ 100 MAD',
    pricing_plan2_save: 'Économisez 100 MAD !',
    pricing_plan3_name: '6 MOIS',
    pricing_plan3_period: '6 mois',
    pricing_plan3_badge: 'MEILLEURE OFFRE',
    pricing_plan3_save: 'Économisez 400 MAD !',
    pricing_plan4_name: '1 AN',
    pricing_plan4_period: 'an',
    pricing_plan4_badge: 'ÉCONOMISEZ 1200 MAD',
    pricing_plan4_save: 'Économies Maximales !',
    pricing_f_gym: 'Accès Salle 7j/7',
    pricing_f_muscu: 'Musculation & Équipements',
    pricing_f_locker: 'Vestiaires',
    pricing_f_crossfit: 'Accès Zone Crossfit',
    pricing_f_boxe: 'Cours de Boxe',
    pricing_f_crossfit_boxe: 'Crossfit & Boxe',
    pricing_f_coaching: 'Coaching Personnel',
    pricing_f_all_classes: 'Tous les Cours Inclus',
    pricing_f_nutrition: 'Conseils Nutrition',
    testimonials_label: 'Témoignages',
    testimonials_title: 'Ce Que Disent Nos Membres',
    testimonials_subtitle: 'Des histoires vraies de vrais membres. Découvrez comment Vikings Club a aidé des milliers de personnes à atteindre leurs objectifs.',
    reel_title_part1: 'Ressens',
    reel_title_highlight: 'L\'Énergie',
    reel_subtitle: 'Ne nous croyez pas sur parole — regardez notre dernier reel et découvrez Vikings Club',
    reel_watch: 'Regarder sur Instagram',
    reel_cta: 'Prêt à T\'Entraîner ? Choisis Ton Plan',
    locations_label: 'Nos Emplacements',
    locations_title: 'Nos Emplacements',
    locations_subtitle: '2 branches à Tanger — 100% Hommes, 7j/7. Choisissez la plus proche de vous.',
    locations_great_choice: 'Excellent Choix !',
    locations_pick_branch: 'Choisissez maintenant la branche la plus pratique pour vous',
    locations_find: 'Trouver la Branche la Plus Proche',
    locations_detecting: 'Détection de votre position...',
    locations_denied: 'Accès à la localisation refusé — les deux branches affichées ci-dessous',
    locations_unavailable: 'Géolocalisation non supportée par votre navigateur',
    locations_detected: 'Position détectée — branche la plus proche affichée',
    locations_nearest: 'La Plus Proche',
    locations_nearest_short: 'PROCHE',
    locations_hours: '8h00 – 23h00 • 7j/7',
    locations_away: 'de distance',
    locations_directions: 'Obtenir l\'Itinéraire',
    locations_directions_from: 'Itinéraire Depuis Votre Position',
    footer_tagline: 'Salle de sport pour hommes à Tanger',
    footer_description: '2 branches à Tanger. Salle pour hommes, ouverte 7j/7.',
    footer_branch1: 'Branche 1 :',
    footer_branch1_address: 'Sahat Al Madina',
    footer_branch2: 'Branche 2 :',
    footer_branch2_address: 'Mesnana, Qouasem',
    footer_hours: '7j/7 : 8h00 - 23h00',
    footer_rights: 'Tous droits réservés.',
    why_label: 'Notre Promesse',
    why_heading: 'Pourquoi',
    why_subtitle: 'Nous ne construisons pas seulement des corps — nous forgeons des guerriers. Voici ce qui rend Vikings Club différent.',
    why_title1: 'Discipline Viking',
    why_t1_p1: 'Hygiène et propreté irréprochables',
    why_t1_p2: 'Équipements toujours bien entretenus',
    why_t1_p3: 'Stations d\'hygiène dans toute la salle',
    why_title2: 'Fraternité Viking',
    why_t2_p1: 'Une fraternité qui vous pousse en avant',
    why_t2_p2: 'Coachs bienveillants qui s\'investissent',
    why_t2_p3: 'Entraînement collectif comme en famille',
    why_title3: 'Arsenal Premium',
    why_t3_p1: 'Machines et poids de dernière génération',
    why_t3_p2: 'Espaces spacieux et bien ventilés',
    why_t3_p3: 'Zones dédiées pour chaque style',
    why_title4: 'Prix du Guerrier',
    why_t4_p1: 'Salle premium, prix honnêtes',
    why_t4_p2: 'Forfaits flexibles pour tous les budgets',
    why_t4_p3: 'Pas de frais cachés — jamais',
    // About
    about_badge: 'Notre Histoire',
    about_title: 'Plus Qu\'une Salle de Sport',
    about_subtitle: 'Vikings Club Tanger est une fraternité de guerriers, forgée dans la discipline et unie par la recherche de la grandeur.',
    about_heading: 'Fondé sur l\'Esprit Viking',
    about_story: 'Fondé au cœur de Tanger, Vikings Club est né d\'une passion pour le fitness et l\'esprit guerrier. Nous croyons que chaque personne a un Viking en elle — implacable, discipliné et inarrêtable.',
    about_mission: 'Notre mission est de libérer ce potentiel grâce à un entraînement de classe mondiale, des équipements de pointe et une communauté qui vous pousse au-delà de vos limites.',
    about_founded: 'Année de Fondation',
    about_members: 'Membres',
    about_years: 'Années',
    about_programs: 'Programmes',
    about_values_title: 'Nos Valeurs Fondamentales',
    about_strength: 'Force',
    about_strength_desc: 'Développer la puissance physique et mentale par des méthodes d\'entraînement éprouvées et un dévouement sans faille.',
    about_discipline: 'Discipline',
    about_discipline_desc: 'La constance et l\'engagement forment la base de chaque parcours de transformation.',
    about_community: 'Communauté',
    about_community_desc: 'Une fraternité solidaire où chaque membre se soutient mutuellement vers la grandeur.',
    about_legacy: 'Héritage',
    about_legacy_desc: 'Créer un impact durable à travers le mentorat, le leadership et l\'inspiration des générations futures.',

    // Services
    services_label: 'Ce Que Nous Offrons',
    services_title: 'Entraîne-Toi',
    services_title_highlight: 'À Ta Façon',
    services_subtitle: 'Des charges lourdes aux étirements, nous avons tout ce qu\'il te faut pour atteindre ton pic de performance.',
    services_muscu: 'Musculation',
    services_muscu_desc: 'Large gamme de poids libres et de machines pour développer force et masse musculaire.',
    services_crossfit: 'CrossFit',
    services_crossfit_desc: 'Entraînement fonctionnel à haute intensité combinant haltérophilie, cardio et gymnastique.',
    services_cardio: 'Zone Cardio',
    services_cardio_desc: 'Équipements cardio modernes : tapis de course, vélos et rameurs.',
    services_coaching: 'Coaching Personnel',
    services_coaching_desc: 'Coaching individuel avec des entraîneurs expérimentés pour atteindre vos objectifs.',
    services_boxing: 'Boxe',
    services_boxing_desc: 'Apprenez les techniques de boxe avec des coachs expérimentés. Discipline, puissance et confiance.',
    services_group: 'Entraînement Collectif',
    services_group_desc: 'Sessions collectives dynamiques qui vous poussent plus loin grâce à la motivation d\'équipe.',
  },

  es: {
    home: 'Inicio',
    about: 'Nosotros',
    classes: 'Clases',
    trainers: 'Entrenadores',
    gallery: 'Galería',
    services: 'Servicios',
    pricing: 'Precios',
    locations: 'Ubicaciones',
    join_now: 'Únete',

    train_like_a: 'Entrena como un',
    viking: 'Vikingo',
    subtitle: 'Desata a tu guerrero interior en el gimnasio más élite de Tánger',
    start_journey: 'Comienza tu Viaje',
    see_gym: 'Ver el Gimnasio',
    hero_followers_value: '3,375+',
    hero_days_value: '7 Días/Semana',
    hero_hours_value: '15h/Día',

    our_impact: 'Nuestro Impacto',
    stats_title: 'Construyendo Campeones desde el Día Uno',
    stats_description: 'Los números hablan por sí solos — bienvenido a la familia Vikings',
    trust_badge: '99% Miembros Satisfechos',
    trust_sub: 'La confianza de cientos de Vikings en Tánger',

    instagram_followers: 'Seguidores en Instagram',
    days_open: 'Días Abierto',
    hours_daily: 'Horas Diarias',
    branches: 'Sucursales',

    start_free_trial: 'Prueba Gratuita',
    book_session: 'Reservar una Sesión',
    train_with_us: 'Entrena con Nosotros',
    get_started: 'Empezar',
    contact_us: 'Contáctanos',

    follow_us: 'Síguenos',
    quick_links: 'Enlaces Rápidos',
    contact_info: 'Información de Contacto',
    join_today: 'Únete Hoy',

    welcome: '¡Bienvenido a Vikings Club!',
    placeholder: 'Escribe un mensaje...',
    send: 'Enviar',
        pricing_label: 'Membresía',
    pricing_title: 'Elige Tu Plan',
    pricing_subtitle: 'Opciones de membresía flexibles diseñadas para tus objetivos fitness. Comienza tu transformación hoy.',
    pricing_start_now: 'Empezar',
    pricing_get_started: 'Inscribirse',
    pricing_plan1_name: '1 MES',
    pricing_plan1_period: 'mes',
    pricing_plan2_name: '3 MESES',
    pricing_plan2_period: '3 meses',
    pricing_plan2_badge: 'AHORRA 100 MAD',
    pricing_plan2_save: '¡Ahorra 100 MAD!',
    pricing_plan3_name: '6 MESES',
    pricing_plan3_period: '6 meses',
    pricing_plan3_badge: 'MEJOR VALOR',
    pricing_plan3_save: '¡Ahorra 400 MAD!',
    pricing_plan4_name: '1 AÑO',
    pricing_plan4_period: 'año',
    pricing_plan4_badge: 'AHORRA 1200 MAD',
    pricing_plan4_save: '¡Máximo Ahorro!',
    pricing_f_gym: 'Acceso Completo 7/7',
    pricing_f_muscu: 'Musculación & Equipos',
    pricing_f_locker: 'Vestuarios',
    pricing_f_crossfit: 'Acceso Zona Crossfit',
    pricing_f_boxe: 'Clases de Boxeo',
    pricing_f_crossfit_boxe: 'Crossfit & Boxeo',
    pricing_f_coaching: 'Coaching Personal',
    pricing_f_all_classes: 'Todas las Clases Incluidas',
    pricing_f_nutrition: 'Consejos Nutricionales',
    testimonials_label: 'Testimonios',
    testimonials_title: 'Lo Que Dicen Nuestros Miembros',
    testimonials_subtitle: 'Historias reales de miembros reales. Descubre cómo Vikings Club ha ayudado a miles a alcanzar sus objetivos.',
    reel_title_part1: 'Siente La',
    reel_title_highlight: 'Energía',
    reel_subtitle: 'No nos creas solo a nosotros — mira nuestro último reel y descubre Vikings Club',
    reel_watch: 'Ver en Instagram',
    reel_cta: '¿Listo para Entrenar? Elige Tu Plan',
    locations_label: 'Ubicaciones',
    locations_title: 'Ubicaciones',
    locations_subtitle: '2 sucursales en Tánger — 100% Hombres, 7 días/semana. Elige la más cercana.',
    locations_great_choice: '¡Excelente Elección!',
    locations_pick_branch: 'Elige ahora la sucursal más conveniente para ti',
    locations_find: 'Encontrar Sucursal Más Cercana',
    locations_detecting: 'Detectando tu ubicación...',
    locations_denied: 'Acceso a ubicación denegado — ambas sucursales mostradas abajo',
    locations_unavailable: 'Geolocalización no soportada por tu navegador',
    locations_detected: 'Ubicación detectada — mostrando la sucursal más cercana',
    locations_nearest: 'Más Cercana',
    locations_nearest_short: 'CERCANA',
    locations_hours: '8:00 AM – 11:00 PM • 7 días/semana',
    locations_away: 'de distancia',
    locations_directions: 'Obtener Direcciones',
    locations_directions_from: 'Direcciones Desde Tu Ubicación',
    footer_tagline: 'Gimnasio solo para hombres en Tánger',
    footer_description: '2 sucursales en Tánger. Gimnasio para hombres, abierto 7 días/semana.',
    footer_branch1: 'Sucursal 1:',
    footer_branch1_address: 'Sahat Al Madina',
    footer_branch2: 'Sucursal 2:',
    footer_branch2_address: 'Mesnana, Qouasem',
    footer_hours: '7 Días/Semana: 8:00 AM - 11:00 PM',
    footer_rights: 'Todos los derechos reservados.',
    why_label: 'Nuestra Promesa',
    why_heading: '¿Por Qué',
    why_subtitle: 'No solo construimos cuerpos — forjamos guerreros. Esto es lo que hace a Vikings Club diferente.',
    why_title1: 'Disciplina Vikinga',
    why_t1_p1: 'Higiene y limpieza impecables',
    why_t1_p2: 'Equipos siempre bien mantenidos',
    why_t1_p3: 'Estaciones de higiene en todo el gimnasio',
    why_title2: 'Hermandad Vikinga',
    why_t2_p1: 'Una hermandad que te impulsa adelante',
    why_t2_p2: 'Entrenadores que realmente se preocupan',
    why_t2_p3: 'Entrenamiento grupal como en familia',
    why_title3: 'Arsenal Premium',
    why_t3_p1: 'Máquinas y pesas de última generación',
    why_t3_p2: 'Espacios amplios y bien ventilados',
    why_t3_p3: 'Zonas dedicadas para cada estilo',
    why_title4: 'Precio del Guerrero',
    why_t4_p1: 'Gimnasio premium, precios honestos',
    why_t4_p2: 'Planes flexibles para cada presupuesto',
    why_t4_p3: 'Sin tarifas ocultas — nunca',
    // About
    about_badge: 'Nuestra Historia',
    about_title: 'Más Que un Gimnasio',
    about_subtitle: 'Vikings Club Tanger es una hermandad de guerreros, forjada en la disciplina y unida por la búsqueda de la grandeza.',
    about_heading: 'Construido sobre el Espíritu Vikingo',
    about_story: 'Fundado en el corazón de Tánger, Vikings Club nació de una pasión por el fitness y el espíritu guerrero. Creemos que cada persona tiene un vikingo dentro — implacable, disciplinado e imparable.',
    about_mission: 'Nuestra misión es liberar ese potencial a través de un entrenamiento de clase mundial, equipos de vanguardia y una comunidad que te impulsa más allá de tus límites.',
    about_founded: 'Año de Fundación',
    about_members: 'Miembros',
    about_years: 'Años',
    about_programs: 'Programas',
    about_values_title: 'Nuestros Valores Fundamentales',
    about_strength: 'Fuerza',
    about_strength_desc: 'Construir poder físico y mental a través de métodos de entrenamiento probados y dedicación inquebrantable.',
    about_discipline: 'Disciplina',
    about_discipline_desc: 'La constancia y el compromiso forman la base de cada viaje de transformación.',
    about_community: 'Comunidad',
    about_community_desc: 'Una hermandad solidaria donde cada miembro se impulsa mutuamente hacia la grandeza.',
    about_legacy: 'Legado',
    about_legacy_desc: 'Crear un impacto duradero a través del mentorazgo, el liderazgo y la inspiración de las próximas generaciones.',

    // Services
    services_label: 'Lo Que Ofrecemos',
    services_title: 'Entrena a Tu',
    services_title_highlight: 'Manera',
    services_subtitle: 'Desde pesas pesadas hasta estiramientos, tenemos todo lo que necesitas para alcanzar tu máximo rendimiento.',
    services_muscu: 'Musculación',
    services_muscu_desc: 'Amplia gama de pesas libres y máquinas para desarrollar fuerza y músculo.',
    services_crossfit: 'CrossFit',
    services_crossfit_desc: 'Entrenamiento funcional de alta intensidad que combina halterofilia, cardio y gimnasia.',
    services_cardio: 'Zona Cardio',
    services_cardio_desc: 'Equipos cardio modernos: cintas de correr, bicicletas y remo.',
    services_coaching: 'Coaching Personal',
    services_coaching_desc: 'Coaching individual con entrenadores experimentados para alcanzar tus metas.',
    services_boxing: 'Boxeo',
    services_boxing_desc: 'Aprende técnicas de boxeo con entrenadores experimentados. Disciplina, poder y confianza.',
    services_group: 'Entrenamiento Grupal',
    services_group_desc: 'Sesiones grupales enérgicas que te impulsan más lejos con la motivación del equipo.',
  },

  ar: {
    home: 'الرئيسية',
    about: 'من نحن',
    classes: 'الدرسات',
    trainers: 'المدربين',
    gallery: 'المعرض',
    services: 'الخدمات',
    pricing: 'الأسعار',
    locations: 'الفروع',
    join_now: 'انضم الآن',

    train_like_a: 'تدرب كـ',
    viking: 'فايكينغ',
    subtitle: 'أطلق العنان للمحارب الذي بداخلك في أشهر صالة رياضية في طنجة',
    start_journey: 'ابدأ رحلتك',
    see_gym: 'شاهد الصالة',
    hero_followers_value: '+٣,٣٧٥',
    hero_days_value: '٧ أيام/أسبوع',
    hero_hours_value: '١٥ ساعة/يوم',

    our_impact: 'تأثيرنا',
    stats_title: 'نبني الأبطال منذ اليوم الأول',
    stats_description: 'الأرقام تتحدث عن نفسها — مرحباً بك في عائلة الفايكنغ',
    trust_badge: '99% أعضاء راضون',
    trust_sub: 'يثق بنا مئات الفايكنغ في طنجة',

    instagram_followers: 'متابعين إنستغرام',
    days_open: 'أيام العمل',
    hours_daily: 'ساعات يومياً',
    branches: 'فروع',

    start_free_trial: 'تجربة مجانية',
    book_session: 'احجز جلسة',
    train_with_us: 'تدرب معنا',
    get_started: 'ابدأ الآن',
    contact_us: 'تواصل معنا',

    follow_us: 'تابعنا',
    quick_links: 'روابط سريعة',
    contact_info: 'معلومات الاتصال',
    join_today: 'انضم اليوم',

    welcome: '!مرحباً بك في نادي الفايكنغ',
    placeholder: '...اكتب رسالة',
    send: 'إرسال',
        pricing_label: 'الاشتراك',
    pricing_title: 'اختر خطتك',
    pricing_subtitle: 'خيارات اشتراك مرنة مصممة لتناسب أهدافك اللياقية. ابدأ تحولك اليوم.',
    pricing_start_now: 'ابدأ الآن',
    pricing_get_started: 'سجّل الآن',
    pricing_plan1_name: 'شهر واحد',
    pricing_plan1_period: 'شهر',
    pricing_plan2_name: '٣ أشهر',
    pricing_plan2_period: '٣ أشهر',
    pricing_plan2_badge: 'وفّر ١٠٠ درهم',
    pricing_plan2_save: 'وفّر ١٠٠ درهم!',
    pricing_plan3_name: '٦ أشهر',
    pricing_plan3_period: '٦ أشهر',
    pricing_plan3_badge: 'أفضل قيمة',
    pricing_plan3_save: 'وفّر ٤٠٠ درهم!',
    pricing_plan4_name: 'سنة واحدة',
    pricing_plan4_period: 'سنة',
    pricing_plan4_badge: 'وفّر ١٢٠٠ درهم',
    pricing_plan4_save: 'أكبر وفورات!',
    pricing_f_gym: 'وصول كامل ٧/٧',
    pricing_f_muscu: 'كمال الأجسام والمعدات',
    pricing_f_locker: 'غرف تبديل الملابس',
    pricing_f_crossfit: 'منطقة كروسفيت',
    pricing_f_boxe: 'حصص الملاكمة',
    pricing_f_crossfit_boxe: 'كروسفيت وملاكمة',
    pricing_f_coaching: 'تدريب شخصي',
    pricing_f_all_classes: 'جميع الحصص مشمولة',
    pricing_f_nutrition: 'نصائح غذائية',
    testimonials_label: 'شهادات',
    testimonials_title: 'ماذا يقول أعضاؤنا',
    testimonials_subtitle: 'قصص حقيقية من أعضاء حقيقيين. اكتشف كيف ساعد نادي الفايكنغ آلاف الأشخاص في تحقيق أهدافهم.',
    reel_title_part1: 'اشعر',
    reel_title_highlight: 'بالطاقة',
    reel_subtitle: 'لا تأخذ كلمتنا فقط — شاهد آخر ريل لنا واكتشف نادي الفايكنغ',
    reel_watch: 'شاهد على إنستغرام',
    reel_cta: 'مستعد للتدريب؟ اختر خطتك',
    locations_label: 'فروعنا',
    locations_title: 'فروعنا',
    locations_subtitle: 'فرعان في طنجة — ١٠٠٪ رجال، ٧ أيام/أسبوع. اختر الأقرب إليك.',
    locations_great_choice: 'اختيار رائع!',
    locations_pick_branch: 'اختر الآن الفرع الأنسب لك',
    locations_find: 'البحث عن أقرب فرع',
    locations_detecting: '...جارٍ تحديد موقعك',
    locations_denied: 'تم رفض الوصول إلى الموقع — الفرعان معرضان بالتساوي أدناه',
    locations_unavailable: 'تحديد الموقع غير مدعوم من متصفحك',
    locations_detected: 'تم تحديد الموقع — يتم عرض أقرب فرع',
    locations_nearest: 'الأقرب إليك',
    locations_nearest_short: 'الأقرب',
    locations_hours: '٨:٠٠ صباحاً – ١١:٠٠ مساءً • ٧ أيام/أسبوع',
    locations_away: 'بعيداً',
    locations_directions: 'الحصول على الاتجاهات',
    locations_directions_from: 'اتجاهات من موقعك',
    footer_tagline: 'نادي رجالي في طنجة',
    footer_description: 'فرعان في طنجة. نادي للرجال، مفتوح ٧ أيام/أسبوع.',
    footer_branch1: 'الفرع ١:',
    footer_branch1_address: 'ساحة المدينة',
    footer_branch2: 'الفرع ٢:',
    footer_branch2_address: 'مسنانة قواسم',
    footer_hours: '٧ أيام/أسبوع: ٨:٠٠ صباحاً - ١١:٠٠ مساءً',
    footer_rights: 'جميع الحقوق محفوظة.',
    why_label: 'وعدنا',
    why_heading: 'لماذا',
    why_subtitle: 'نحن لا نبني أجساداً فقط — نحن نصنع محاربين. إليك ما يميز نادي الفايكنغ.',
    why_title1: 'انضباط الفايكنغ',
    why_t1_p1: 'نظافة وعناية لا تشوبها شائبة',
    why_t1_p2: 'معدات دائماً في حالة ممتازة',
    why_t1_p3: 'محطات نظافة في جميع أنحاء الصالة',
    why_title2: 'أخوية الفايكنغ',
    why_t2_p1: 'أخوية تدفعك للأمام',
    why_t2_p2: 'مدربون داعمون يهتمون حقاً بك',
    why_t2_p3: 'تمارين جماعية تشبه العائلة',
    why_title3: 'ترسانة متميزة',
    why_t3_p1: 'أحدث الأجهزة والأوزان',
    why_t3_p2: 'مساحات واسعة وتهوية جيدة',
    why_t3_p3: 'مناطق مخصصة لكل أسلوب',
    why_title4: 'سعر المحارب',
    why_t4_p1: 'صالة متميزة بأسعار شريفة',
    why_t4_p2: 'باقات مرنة لكل ميزانية',
    why_t4_p3: 'بدون رسوم خفية — أبداً',
    // About
    about_badge: 'قصتنا',
    about_title: 'أكثر من مجرد صالة رياضية',
    about_subtitle: 'نادي الفايكنغ طنجة أخوية من المحاربين، صيغت في الانضباط وتوحدت في السعي للعظمة.',
    about_heading: 'مبني على روح الفايكنغ',
    about_story: 'تأسس في قلب طنجة، ولد نادي الفايكنغ من شغف باللياقة البدنية والروح المحاربة. نؤمن أن كل شخص لديه فايكينغ بداخله — لا يلين، منضبط ولا يُقهر.',
    about_mission: 'مهمتنا هي تحرير هذا الإمكانات من خلال تدريب عالمي المستوى ومعدات متطورة ومجتمع يدفعك إلى ما بعد حدودك.',
    about_founded: 'سنة التأسيس',
    about_members: 'أعضاء',
    about_years: 'سنوات',
    about_programs: 'برامج',
    about_values_title: 'قيمنا الأساسية',
    about_strength: 'القوة',
    about_strength_desc: 'بناء القوة الجسدية والعقلية من خلال طرق تدريب مثبتة وتفانٍ لا يتزعزع.',
    about_discipline: 'الانضباط',
    about_discipline_desc: 'الاستمرارية والالتزام يشكلان أساس كل رحلة تحول.',
    about_community: 'المجتمع',
    about_community_desc: 'أخوية داعمة حيث يرفع كل عضو الآخر نحو العظمة.',
    about_legacy: 'الإرث',
    about_legacy_desc: 'خلق تأثير دائم من خلال الإرشاد والقيادة وإلهام الأجيال القادمة.',

    // Services
    services_label: 'ما نقدمه',
    services_title: 'تدرب',
    services_title_highlight: 'بطريقتك',
    services_subtitle: 'من الأثقال الثقيلة إلى التمدد، لدينا كل ما تحتاجه للوصول إلى ذروة أدائك.',
    services_muscu: 'كمال الأجسام',
    services_muscu_desc: 'مجموعة كاملة من الأوزان الحرة والآلات لبناء القوة والعضلات.',
    services_crossfit: 'كروسفيت',
    services_crossfit_desc: 'تدريب وظيفي عالي الكثافة يجمع بين رفع الأثقال والقلب والجمباز.',
    services_cardio: 'منطقة الكارديو',
    services_cardio_desc: 'معدات كارديو حديثة تشمل أجهزة المشي والدراجات والتجذيف.',
    services_coaching: 'تدريب شخصي',
    services_coaching_desc: 'تدريب فردي مع مدربين ذوي خبرة لتحقيق أهدافك اللياقية.',
    services_boxing: 'الملاكمة',
    services_boxing_desc: 'تعلم تقنيات الملاكمة مع مدربين محترفين. الانضباط والقوة والثقة.',
    services_group: 'تمارين جماعية',
    services_group_desc: 'جلسات جماعية حيوية تدفعك أبعد مع تحفيز الفريق.',
  },
};

export default translations;
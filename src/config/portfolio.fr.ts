export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Oussama HATTAN",
    title: "Développeur Web Full-Stack | Spécialiste React & Node.js",
    tagline: "Développeur Web avec de solides compétences full-stack, spécialisé dans la création d'applications web responsives et évolutives.",
    bio: "Développeur Web avec de solides compétences full-stack, spécialisé dans la création d'applications web responsives et évolutives. Expérimenté en front-end (HTML, CSS, JS) et back-end (PHP, Python, SQL, MongoDB) avec des connaissances en TDD, APIs et sécurité réseau.",
    location: "M'RIRT, MAROC",
    location_description: "Basé au Maroc, je suis toujours enthousiaste à l'idée de relever de nouveaux défis.",
    interests: "Quand je ne code pas, vous pouvez me trouver en train d'explorer les dernières tendances du développement web.",
    profileImage: "/images/oussama-profile-pro.png",
  },

  contact: {
    email: "ossamahattan@gmail.com",
    phone: "+212 658559662",
    linkedin: "https://linkedin.com/in/h-oussama",
    github: "https://github.com/H-Ossama",
    whatsapp: "+212 658559662",
  },

  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Design Responsive"],
    backend: ["Node.js", "Express.js", "PHP", "Laravel", "Python", "APIs REST"],
    database: ["MongoDB", "MySQL"],
    networking: ["Sécurité Réseau", "Réseaux Informatiques", "Architecture de BDD", "Sécurité Informatique"],
    development: ["TDD", "APIs", "OAuth", "JWT", "Git", "Agile/Scrum"],
    languages: ["Anglais (Pro)", "Arabe (Natif)", "Français (Intermédiaire)"],
    soft_skills: ["Apprentissage Rapide", "Analyse Technique", "Résolution de Problèmes", "Collaboration"]
  },

  education: [
    {
      degree: "Licence en Développement Web",
      institution: "MULTIHEXA, Meknès",
      year: "09/2024 - 08/2025",
      description: "Programme complet couvrant l'Architecture de BDD et la Sécurité Réseau.",
      certificates: [
        { name: "Certificat de Diplôme", image: "/certificates/FEDE Bachelor Diplomat.jpg" },
        { name: "Relevé de Notes", image: "/certificates/FEDE Relever de note.jpg" }
      ]
    },
    {
      degree: "Certificat d'Ingénierie Logicielle",
      institution: "ALX, Casablanca",
      year: "08/2023 - 10/2024",
      description: "Bootcamp intensif de 12 mois couvrant le développement full-stack."
    },
    {
      degree: "Technicien Spécialisé en Systèmes et Réseaux Informatiques",
      institution: "EFET, Meknès",
      year: "09/2021 - 07/2023",
      description: "Spécialisation en administration réseaux, sécurité des systèmes et gestion d'infrastructure informatique.",
      certificates: [
        { name: "Diplôme", image: "/certificates/EFET.jpg" }
      ]
    }
  ],

  projects: [
    {
      id: 101,
      title: "Parental Guard",
      category: "Mobile Development",
      description: "Système de contrôle parental Android avancé avec surveillance WebSocket en temps réel, agents de service en arrière-plan et verrouillage d'applications sécurisé.",
      techStack: ["Kotlin", "Jetpack Compose", "WebSockets", "Room DB", "Services Arrière-plan"],
      githubUrl: "https://github.com/H-Ossama/Family-Guard",
      screenshots: [
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021123.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021143.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021157.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021226.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021231.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021241.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_022151.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_022247.jpg",
        "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_022252.jpg"
      ],
      image: "/images/Mobile_apps_screenshots/Familly_Guard-screenshots/Screenshot_20260108_021123.jpg",
      featured: true,
      strategy: "Architecture Agent-Contrôleur avec relais temps réel",
      client: "Parental Guard",
      technology: "Kotlin, WebSocket"
    },
    {
      id: 5,
      title: "Immigration Pathways",
      category: "Web Development",
      description: "Plateforme d'immigration alimentée par l'IA qui génère des plans de migration personnalisés basés sur les profils des utilisateurs. Comprend un assistant multi-étapes, une analyse GPT-4o et une fonctionnalité d'exportation PDF.",
      techStack: ["Next.js 15", "TypeScript", "OpenAI API", "Zustand", "Tailwind CSS"],
      githubUrl: "https://github.com/H-Ossama/Immigration-Pathways",
      liveUrl: "https://immigration-pathways.vercel.app/",
      image: "/images/ImmigrationPathways_screenshots/main.png",
      featured: true,
      screenshots: [
        "/images/ImmigrationPathways_screenshots/main.png",
        "/images/ImmigrationPathways_screenshots/main-dark.png",
        "/images/ImmigrationPathways_screenshots/screen-1.png",
        "/images/ImmigrationPathways_screenshots/screen-2.png",
        "/images/ImmigrationPathways_screenshots/screen-3.png",
        "/images/ImmigrationPathways_screenshots/screen-4.png",
        "/images/ImmigrationPathways_screenshots/screen-5.png",
        "/images/ImmigrationPathways_screenshots/screen-6.png",
        "/images/ImmigrationPathways_screenshots/screen-7.png",
        "/images/ImmigrationPathways_screenshots/screen-8.png",
        "/images/ImmigrationPathways_screenshots/screen-9.png",
        "/images/ImmigrationPathways_screenshots/screen-10.png"
      ],
      strategy: "Analyse de profil pilotée par l'IA avec persistance des données locales",
      client: "Explorateurs Mondiaux",
      technology: "Next.js, OpenAI"
    },
    {
      id: 6,
      title: "Smart E-Commerce",
      category: "Web Development",
      description: "Plateforme de commerce électronique moderne avec recommandations de produits IA, chat en temps réel et backend Node.js évolutif.",
      techStack: ["Node.js", "Express", "React", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/H-Ossama/Smart_E-Commerce_Platform",
      image: "/images/project-2.svg",
      featured: false,
      strategy: "Backend prêt pour les microservices",
      client: "Open Source",
      technology: "Node.js, React"
    },
    {
      id: 7,
      title: "Site Web EFET",
      category: "Web Development",
      description: "Refonte complète et développement du site officiel du Groupe EFET, améliorant les performances, l'accessibilité et la structure SEO.",
      techStack: ["Next.js", "React", "Intégration CMS", "SEO"],
      githubUrl: "https://github.com/H-Ossama/EFET-Website",
      image: "/images/efet-screenshots/efet-screenshot-1.png",
      screenshots: [
        "/images/efet-screenshots/efet-screenshot-1.png",
        "/images/efet-screenshots/efet-screenshot-2.png",
        "/images/efet-screenshots/efet-screenshot-3.png",
        "/images/efet-screenshots/efet-screenshot-4.png"
      ],
      featured: false,
      strategy: "Modernisation axée sur la performance",
      client: "Groupe EFET",
      technology: "Next.js"
    },
    {
      id: 3,
      title: "Job Finder & CV AI Assistant",
      category: "Web Development",
      description: "Une plateforme puissante pilotée par l'IA pour aider les chercheurs d'emploi à créer des CV conformes aux ATS et automatiser leur recherche.",
      techStack: ["Next.js", "Supabase", "React", "IA", "Tailwind CSS"],
      githubUrl: "https://github.com/H-Ossama/Job-Finder",
      image: "/images/job-cv/hero.png",
      featured: true,
      screenshots: [
        "/images/job-cv/hero.png",
        "/images/job-cv/dashboard.png",
        "/images/job-cv/builder-1.png",
        "/images/job-cv/builder-2.png",
        "/images/job-cv/job-search.png",
        "/images/job-cv/analytics.png",
        "/images/job-cv/interview.png",
        "/images/job-cv/billing.png",
        "/images/job-cv/my-resumes.png",
        "/images/job-cv/preferences.png",
        "/images/job-cv/hero-alt.png"
      ],
      strategy: "Services IA intégrés avec un backend Supabase robuste",
      client: "Projet Personnel",
      technology: "Next.js, Supabase"
    },
    {
      id: 1,
      title: "Car Rental Platform",
      category: "Web Development",
      description: "Moteur de réservation complexe avec des mécanismes de verrouillage de base de données robustes pour éviter les doubles réservations.",
      techStack: ["PHP", "Laravel", "MySQL", "Cron Jobs"],
      githubUrl: "https://github.com/H-Ossama/Cars_Rental_v2.0",
      image: "/images/cars_rental_screenshots/main.png",
      featured: false,
      screenshots: [
        "/images/cars_rental_screenshots/main.png",
        "/images/cars_rental_screenshots/screen-1.png",
        "/images/cars_rental_screenshots/screen-2.png",
        "/images/cars_rental_screenshots/screen-3.png",
        "/images/cars_rental_screenshots/screen-4.png",
        "/images/cars_rental_screenshots/screen-5.png",
        "/images/cars_rental_screenshots/screen-6.png"
      ],
      strategy: "Transactions de base de données conformes à ACID",
      client: "Agence AutoRental",
      technology: "Laravel, MySQL"
    },
    {
      id: 2,
      title: "CinemaHalal",
      category: "Web Development",
      description: "Agrégateur de plateforme de streaming sécurisé pour la famille. Filtrage complexe du backend pour assurer la conformité aux valeurs familiales.",
      techStack: ["Node.js", "Express", "WebTorrent", "TMDB API", "Algorithmes de Filtrage"],
      githubUrl: "https://github.com/H-Ossama/CinimaHalal",
      screenshots: [
        "/images/Cinima-Halal/screenshot-1.png",
        "/images/Cinima-Halal/screenshot-2.png",
        "/images/Cinima-Halal/screenshot-3.png",
        "/images/Cinima-Halal/screenshot-4.png",
        "/images/Cinima-Halal/screenshot-5.png",
        "/images/Cinima-Halal/screenshot-6.png",
        "/images/Cinima-Halal/screenshot-7.png"
      ],
      image: "/images/Cinima-Halal/screenshot-1.png",
      featured: false,
      strategy: "Filtrage du contenu au niveau de l'API",
      client: "Projet Communautaire",
      technology: "Node.js, WebTorrent"
    },
    {
      id: 102,
      title: "FINEX",
      category: "Mobile Development",
      description: "Application de suivi financier sécurisée et offline-first. Utilise le cryptage local pour l'enregistrement instantané des transactions.",
      techStack: ["Expo", "TypeScript", "SQLite", "Cryptage", "React Native"],
      githubUrl: "https://github.com/H-Ossama/FINEX",
      screenshots: [
        "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-1.png",
        "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-2.png",
        "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-3.png",
        "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-4.png",
        "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-5.png",
        "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-6.png"
      ],
      image: "/images/Mobile_apps_screenshots/FINEX-screenshots/screen-1.png",
      featured: false,
      strategy: "Architecture Local-first",
      client: "FINEX",
      technology: "TypeScript, SQLite"
    },
    {
      id: 103,
      title: "Tijarati",
      category: "Mobile Development",
      description: "Plateforme de gestion pour commerçants, intégrant l'inventaire, le suivi des dettes et des informations basées sur l'IA.",
      techStack: ["React Native", "Firebase", "Gemini AI", "Node.js Function"],
      githubUrl: "https://github.com/H-Ossama/TIJARATI",
      image: "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021801_TIJARATI.jpg",
      featured: false,
      screenshots: [
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021801_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021812_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021820_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021827_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021835_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021848_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021857_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021905_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021922_TIJARATI.jpg",
        "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021936_TIJARATI.jpg"
      ],
      strategy: "Inventaire synchronisé avec le cloud et couche IA",
      client: "Communauté de Marchands",
      technology: "React Native, IA"
    }
  ],

  mobileProjects: [],

  certifications: [
    {
      name: "IBM Certificat en Réseaux Informatiques et Sécurité",
      issuer: "IBM - Coursera",
      date: "12/2024",
      description: "Certification en sécurité réseau, protocoles et architecture réseau.",
      image: "/certificates/ibm-networks-security.pdf",
      url: "https://www.coursera.org/account/accomplishments/verify/EQIGIS8IV9VK"
    }
  ],

  social: {
    linkedin: "https://linkedin.com/in/h-oussama",
    github: "https://github.com/H-Ossama",
    whatsapp: "+212 658559662",
  },

  resume: "/certificates/Oussama_HATTAN_Resume_FR_2026.pdf",

  meta: {
    title: "Oussama HATTAN - Développeur Backend Web",
    description: "Portfolio d'Oussama HATTAN, Développeur Backend Web spécialisé en Node.js et Python.",
    keywords: "Oussama HATTAN, développeur backend, Node.js, Python, Architecture API, Base de données",
    author: "Oussama HATTAN",
    url: "https://hattan-portfolio.vercel.app",
  },

  sections: {
    about: { yearsExperience: "Années d'Expérience", projectsCompleted: "Projets Réalisés" },
    skills: { coreSkills: "Compétences Clés", description: "Technologies maîtrisées.", summary: "Compétences acquises en formation." },
    projects: { featuredProjects: "Travaux", description: "Une vitrine de mes travaux récents.", moreProjects: "Plus de Projets", wantToSeeMore: "En voir plus ?", githubDescription: "Consultez mon GitHub pour plus de projets et d'exemples de code.", viewGithubProfile: "Voir Profil GitHub" },
    mobileProjects: { title: "Projets Mobiles", subtitle: "(IA assistée)", description: "Apps mobiles construites avec l'aide de l'IA." },
    education: { description: "Mes fondations académiques.", continuousLearning: "Apprentissage Continu", learningDescription: "L'apprentissage ne s'arrête jamais." },
    contact: { letsStartConversation: "Commençons une conversation", description: "Prêt à discuter de votre projet ?" }
  }
};

export default portfolioConfig;

export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Oussama HATTAN",
    title: "Full-Stack Web-Entwickler | React & Node.js Spezialist",
    tagline: "Web-Entwickler mit starken Full-Stack-Fähigkeiten, spezialisiert auf die Erstellung responsiver und skalierbarer Webanwendungen.",
    bio: "Web-Entwickler mit starken Full-Stack-Fähigkeiten, spezialisiert auf die Erstellung responsiver und skalierbarer Webanwendungen. Erfahren in Front-End (HTML, CSS, JS) und Back-End (PHP, Python, SQL, MongoDB) mit Kenntnissen in TDD, APIs und Netzwerksicherheit.",
    location: "M'RIRT, MAROKKO",
    location_description: "Ich bin in Marokko ansässig und freue mich immer auf neue Herausforderungen.",
    interests: "Wenn ich nicht gerade code, erkunde ich die neuesten Webentwicklungstrends.",
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
    frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Responsive Design"],
    backend: ["Node.js", "Express.js", "PHP", "Laravel", "Python", "REST-APIs"],
    database: ["MongoDB", "MySQL"],
    networking: ["Netzwerksicherheit", "Computernetzwerke", "Datenbankarchitektur", "IT-Sicherheit"],
    development: ["TDD", "APIs", "OAuth", "JWT", "Git", "Agile/Scrum"],
    languages: ["Englisch (Profi)", "Arabisch (Muttersprache)", "Französisch (Fortgeschritten)"],
    soft_skills: ["Schnelles Lernen", "Technische Analyse", "Problemlösung", "Teamarbeit"]
  },

  education: [
    {
      degree: "Bachelor in Webentwicklung",
      institution: "MULTIHEXA, Meknès",
      year: "09/2024 - 08/2025",
      description: "Umfassendes Webentwicklungsprogramm mit Schwerpunkt auf Datenbankarchitektur und Netzwerksicherheit.",
      certificates: [
        { name: "Diplomzertifikat", image: "/certificates/FEDE Bachelor Diplomat.jpg" },
        { name: "Akademisches Zeugnis", image: "/certificates/FEDE Relever de note.jpg" }
      ]
    },
    {
      degree: "Software Engineering Zertifikat",
      institution: "ALX, Casablanca",
      year: "08/2023 - 10/2024",
      description: "Intensives 12-monatiges Bootcamp für Full-Stack-Entwicklung."
    },
    {
      degree: "Spezialisierter Techniker für Computersysteme und Netzwerke",
      institution: "EFET, Meknès",
      year: "09/2021 - 07/2023",
      description: "Spezialisiert auf Netzwerkadministration, Systemsicherheit und IT-Infrastrukturmanagement.",
      certificates: [
        { name: "Diplomzertifikat", image: "/certificates/EFET.jpg" }
      ]
    }
  ],

  projects: [
    {
      id: 101,
      title: "Parental Guard",
      category: "Mobile Development",
      description: "Fortschrittliches Android-Kindersicherungssystem mit Echtzeit-WebSocket-Überwachung, Hintergrunddienst-Agenten und sicherem App-Locking.",
      techStack: ["Kotlin", "Jetpack Compose", "WebSockets", "Room DB", "Hintergrunddienste"],
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
      strategy: "Agent-Controller-Architektur mit Echtzeit-Relay",
      client: "Parental Guard",
      technology: "Kotlin, WebSocket"
    },
    {
      id: 5,
      title: "Immigration Pathways",
      category: "Web Development",
      description: "KI-gestützte Einwanderungsplattform, die personalisierte Migrationspläne basierend auf Benutzerprofilen erstellt. Bietet einen mehrstufigen Assistenten, GPT-4o-Analyse und PDF-Export-Funktionalität.",
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
      strategy: "KI-gesteuerte Profilanalyse mit lokaler Datenpersistenz",
      client: "Globale Entdecker",
      technology: "Next.js, OpenAI"
    },
    {
      id: 6,
      title: "Smart E-Commerce",
      category: "Web Development",
      description: "Moderne E-Commerce-Plattform mit KI-Produktempfehlungen, Echtzeit-Chat-Support und skalierbarem Node.js-Backend.",
      techStack: ["Node.js", "Express", "React", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/H-Ossama/Smart_E-Commerce_Platform",
      image: "/images/project-2.svg",
      featured: false,
      strategy: "Microservices-fähiges Backend",
      client: "Open Source",
      technology: "Node.js, React"
    },
    {
      id: 7,
      title: "EFET Website",
      category: "Web Development",
      description: "Komplette Neugestaltung und Entwicklung der offiziellen Website der EFET-Gruppe mit verbesserter Leistung und SEO.",
      techStack: ["Next.js", "React", "CMS-Integration", "SEO"],
      githubUrl: "https://github.com/H-Ossama/EFET-Website",
      image: "/images/efet-screenshots/efet-screenshot-1.png",
      screenshots: [
        "/images/efet-screenshots/efet-screenshot-1.png",
        "/images/efet-screenshots/efet-screenshot-2.png",
        "/images/efet-screenshots/efet-screenshot-3.png",
        "/images/efet-screenshots/efet-screenshot-4.png"
      ],
      featured: false,
      strategy: "Performance-orientierte Modernisierung",
      client: "Groupe EFET",
      technology: "Next.js"
    },
    {
      id: 3,
      title: "Job Finder & KI-Lebenslauf-Assistent",
      category: "Web Development",
      description: "Eine leistungsstarke KI-gesteuerte Plattform, die Arbeitssuchenden hilft, ATS-konforme Lebensläufe zu erstellen.",
      techStack: ["Next.js", "Supabase", "React", "KI", "Tailwind CSS"],
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
      strategy: "Integrierte KI-Dienste mit robustem Supabase-Backend",
      client: "Persönliches Projekt",
      technology: "Next.js, Supabase"
    },
    {
      id: 1,
      title: "Car Rental Platform",
      category: "Web Development",
      description: "Komplexes Buchungssystem mit robusten Datenbank-Sperrmechanismen zur Vermeidung von Doppelbuchungen.",
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
      strategy: "ACID-konforme Datenbanktransaktionen",
      client: "AutoRental Agentur",
      technology: "Laravel, MySQL"
    },
    {
      id: 2,
      title: "CinemaHalal",
      category: "Web Development",
      description: "Familiensicherer Streaming-Plattform-Aggregator. Komplexe Backend-Filterung zur Gewährleistung der Inhaltskonformität.",
      techStack: ["Node.js", "Express", "WebTorrent", "TMDB API", "Filteralgorithmen"],
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
      strategy: "Content-Filtering auf API-Ebene",
      client: "Community-Projekt",
      technology: "Node.js, WebTorrent"
    },
    {
      id: 102,
      title: "FINEX",
      category: "Mobile Development",
      description: "Sichere Offline-first Finanz-Tracking-App. Verwendet lokale Verschlüsselung für sofortige Transaktionsaufzeichnung.",
      techStack: ["Expo", "TypeScript", "SQLite", "Verschlüsselung", "React Native"],
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
      strategy: "Local-first Architektur",
      client: "FINEX",
      technology: "TypeScript, SQLite"
    },
    {
      id: 103,
      title: "Tijarati",
      category: "Mobile Development",
      description: "Management-Plattform für Händler mit Inventar, Schuldenverfolgung und KI-gestützten Einblicken.",
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
      client: "Händlergemeinschaft",
      technology: "React Native, KI"
    }
  ],

  mobileProjects: [],

  certifications: [
    {
      name: "IBM Zertifikat für Computernetzwerke und Netzwerksicherheit",
      issuer: "IBM - Coursera",
      date: "12/2024",
      description: "Zertifizierung in Netzwerksicherheit, Netzwerkprotokollen und Netzwerkarchitektur.",
      image: "/certificates/ibm-networks-security.pdf",
      url: "https://www.coursera.org/account/accomplishments/verify/EQIGIS8IV9VK"
    }
  ],

  social: {
    linkedin: "https://linkedin.com/in/h-oussama",
    github: "https://github.com/H-Ossama",
    whatsapp: "+212 658559662",
  },

  resume: "/certificates/Oussama_HATTAN_Resume_ENG_2026.pdf",

  meta: {
    title: "Oussama HATTAN - Backend-Webentwickler",
    description: "Portfolio von Oussama HATTAN, Backend-Webentwickler spezialisiert auf Node.js und Python.",
    keywords: "Oussama HATTAN, Backend-Entwickler, Node.js, Python, API-Architektur, Datenbankdesign",
    author: "Oussama HATTAN",
    url: "https://hattan-portfolio.vercel.app",
  },

  sections: {
    about: { yearsExperience: "Jahre Erfahrung", projectsCompleted: "Abgeschlossene Projekte" },
    skills: { coreSkills: "Kernkompetenzen", description: "Technologien, die ich beherrsche.", summary: "Erworben durch Ausbildung und Praxisprojekte." },
    projects: { featuredProjects: "Arbeit", description: "Ein Einblick in meine neuesten Arbeiten.", moreProjects: "Weitere Projekte", wantToSeeMore: "Wollen Sie mehr sehen?", githubDescription: "Besuchen Sie mein GitHub-Profil für weitere Projekte.", viewGithubProfile: "GitHub-Profil ansehen" },
    mobileProjects: { title: "Mobile Projekte", subtitle: "(KI-gestützt)", description: "Mobile Apps, die mit KI-Unterstützung erstellt wurden." },
    education: { description: "Meine akademische Grundlage.", continuousLearning: "Lebenslanges Lernen", learningDescription: "Lernen hört nie auf." },
    contact: { letsStartConversation: "Lassen Sie uns ein Gespräch beginnen", description: "Bereit, Ihr nächstes Projekt zu besprechen?" }
  }
};

export default portfolioConfig;

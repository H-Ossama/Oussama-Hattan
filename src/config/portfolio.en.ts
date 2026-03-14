export const portfolioConfig = {
  // Personal Information
  personal: {
    name: "Oussama HATTAN",
    title: "Full-Stack Web Developer | React & Node.js Specialist",
    tagline: "Web Developer with strong full-stack skills, specialized in building responsive and scalable web applications.",
    bio: "Web Developer with strong full-stack skills, specialized in building responsive and scalable web applications. Experienced in both front-end (HTML, CSS, JS) and back-end (PHP, Python, SQL, MongoDB) with a focus on TDD, APIs, and network security.",
    location: "M'RIRT, MOROCCO",
    location_description: "Based in Morocco, I am always enthusiastic about taking on new challenges.",
    interests: "When I'm not coding, you can find me exploring the latest web development trends.",
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
    backend: ["Node.js", "Express.js", "PHP", "Laravel", "Python", "REST APIs"],
    database: ["MongoDB", "MySQL"],
    networking: ["Network Security", "Computer Networking", "DB Architecture", "IT Security"],
    development: ["TDD", "APIs", "OAuth", "JWT", "Git", "Agile/Scrum"],
    languages: ["English (Professional)", "Arabic (Native)", "French (Intermediate)"],
    soft_skills: ["Fast Learner", "Technical Analysis", "Problem Solving", "Collaboration"]
  },

  education: [
    {
      degree: "Bachelor in Web Development",
      institution: "MULTIHEXA, Meknès",
      year: "09/2024 - 08/2025",
      description: "Comprehensive program covering DB Architecture and Network Security.",
      certificates: [
        { name: "Diploma Certificate", image: "/certificates/FEDE Bachelor Diplomat.jpg" },
        { name: "Academic Transcript", image: "/certificates/FEDE Relever de note.jpg" }
      ]
    },
    {
      degree: "Software Engineering Certificate",
      institution: "ALX, Casablanca",
      year: "08/2023 - 10/2024",
      description: "Intensive 12-month bootcamp covering full-stack development."
    },
    {
      degree: "Specialized Technician in Computer Systems & Networks",
      institution: "EFET, Meknès",
      year: "09/2021 - 07/2023",
      description: "Specialized in network administration, system security, and IT infrastructure management.",
      certificates: [
        { name: "Diploma Certificate", image: "/certificates/EFET.jpg" }
      ]
    }
  ],

  projects: [
    {
      id: 101,
      title: "Parental Guard",
      category: "Mobile Development",
      description: "Advanced Android parental control system with real-time WebSocket monitoring, background service agents, and secure app locking.",
      techStack: ["Kotlin", "Jetpack Compose", "WebSockets", "Room DB", "Background Services"],
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
      strategy: "Agent-Controller architecture with real-time relay",
      client: "Parental Guard",
      technology: "Kotlin, WebSocket"
    },
    {
      id: 5,
      title: "Immigration Pathways",
      category: "Web Development",
      description: "AI-powered immigration platform that generates personalized migration plans based on user profiles. Features a multi-step wizard, GPT-4o analysis, and PDF export functionality.",
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
      strategy: "AI-driven profile analysis with local data persistence",
      client: "Global Explorers",
      technology: "Next.js, OpenAI"
    },
    {
      id: 6,
      title: "Smart E-Commerce",
      category: "Web Development",
      description: "Modern e-commerce platform featuring AI product recommendations, real-time chat support, and a scalable Node.js backend.",
      techStack: ["Node.js", "Express", "React", "MongoDB", "Socket.io"],
      githubUrl: "https://github.com/H-Ossama/Smart_E-Commerce_Platform",
      image: "/images/project-2.svg",
      featured: false,
      strategy: "Microservices-ready backend",
      client: "Open Source",
      technology: "Node.js, React"
    },
    {
      id: 7,
      title: "EFET Website",
      category: "Web Development",
      description: "Complete redesign and development of the EFET Group official website, improving performance, accessibility, and SEO structure.",
      techStack: ["Next.js", "React", "CMS Integration", "SEO"],
      githubUrl: "https://github.com/H-Ossama/EFET-Website",
      image: "/images/efet-screenshots/efet-screenshot-1.png",
      screenshots: [
        "/images/efet-screenshots/efet-screenshot-1.png",
        "/images/efet-screenshots/efet-screenshot-2.png",
        "/images/efet-screenshots/efet-screenshot-3.png",
        "/images/efet-screenshots/efet-screenshot-4.png"
      ],
      featured: false,
      strategy: "Performance-first modernization",
      client: "Groupe EFET",
      technology: "Next.js"
    },
    {
      id: 3,
      title: "Job Finder & CV AI Assistant",
      category: "Web Development",
      description: "A powerful AI-driven platform that helps job seekers create ATS-compliant CVs and automate their job search process. Features secure auth, AI resume building, and application tracking.",
      techStack: ["Next.js", "Supabase", "React", "AI Integration", "Tailwind CSS"],
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
      strategy: "Integrated AI services with a robust Supabase backend",
      client: "Personal Project",
      technology: "Next.js, Supabase"
    },
    {
      id: 1,
      title: "Car Rental Platform",
      category: "Web Development",
      description: "Complex booking engine with robust database locking mechanisms to prevent double-booking and ensure data integrity.",
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
      strategy: "ACID-compliant database transactions",
      client: "AutoRental Agency",
      technology: "Laravel, MySQL"
    },
    {
      id: 2,
      title: "CinemaHalal",
      category: "Web Development",
      description: "Family-safe streaming platform aggregator. complex backend filtering to ensure content compliance with family values.",
      techStack: ["Node.js", "Express", "WebTorrent", "TMDB API", "Filtering Algorithms"],
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
      strategy: "Content filtering at the API level",
      client: "Community Project",
      technology: "Node.js, WebTorrent"
    },
    {
      id: 102,
      title: "FINEX",
      category: "Mobile Development",
      description: "Secure, offline-first financial tracking app. Uses local encryption and efficient state management for instant transaction recording.",
      techStack: ["Expo", "TypeScript", "SQLite", "Encryption", "React Native"],
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
      strategy: "Local-first architecture",
      client: "FINEX",
      technology: "TypeScript, SQLite"
    },
    {
      id: 103,
      title: "Tijarati",
      category: "Mobile Development",
      description: "Business management platform for merchants, integrating inventory, debt tracking, and AI-powered business insights.",
      techStack: ["React Native", "Firebase", "Gemini AI", "Node.js Function"],
      githubUrl: "https://github.com/H-Ossama/TIJARATI",
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
      image: "/images/Mobile_apps_screenshots/TIJARATI-screenshots/Screenshot_20260108_021801_TIJARATI.jpg",
      featured: false,
      strategy: "Cloud-synced inventory with AI layer",
      client: "Merchant Community",
      technology: "React Native, AI"
    }
  ],

  // Extra Mobile projects rendered redundant by merging above
  mobileProjects: [],

  certifications: [
    {
      name: "IBM Certificate in Computer Networks and Network Security",
      issuer: "IBM - Coursera",
      date: "12/2024",
      description: "Certification in network security, network protocols, and network architecture.",
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
    title: "Oussama HATTAN - Backend Web Developer",
    description: "Portfolio of Oussama HATTAN, Backend Web Developer specializing in Node.js and Python.",
    keywords: "Oussama HATTAN, backend developer, Node.js, Python, API Architecture, Database Design",
    author: "Oussama HATTAN",
    url: "https://hattan-portfolio.vercel.app",
  },

  sections: {
    about: { yearsExperience: "Years Experience", projectsCompleted: "Projects Completed" },
    skills: { coreSkills: "Core Skills", description: "Technologies I've mastered.", summary: "Acquired through formal education and hands-on projects." },
    projects: { featuredProjects: "Work", description: "A showcase of my recent work.", moreProjects: "More Projects", wantToSeeMore: "Want to see more?", githubDescription: "Check out my GitHub for more projects and code samples.", viewGithubProfile: "View GitHub Profile" },
    mobileProjects: { title: "Mobile Projects", subtitle: "(AI-Assisted)", description: "Mobile applications built with AI assistance." },
    education: { description: "My academic background.", continuousLearning: "Continuous Learning", learningDescription: "Learning never stops in the tech world." },
    contact: { letsStartConversation: "Let's Start a Conversation", description: "Ready to discuss your next project?" }
  }
};

export default portfolioConfig;

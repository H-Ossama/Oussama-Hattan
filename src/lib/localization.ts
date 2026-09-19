'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { portfolioConfig as enConfig } from '@/config/portfolio.en';
import { portfolioConfig as frConfig } from '@/config/portfolio.fr';
import { portfolioConfig as deConfig } from '@/config/portfolio.de';

// Type for supported locales
export type Locale = 'en' | 'fr' | 'de';

// Config mapping
const configs = {
  en: enConfig,
  fr: frConfig,
  de: deConfig,
};

export type PortfolioProject = {
  [key: string]: any;
  id: number;
  title: string;
  description: string;
  techStack: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
};

export type PortfolioConfig = {
  [key: string]: any;
  projects: PortfolioProject[];
  mobileProjects?: PortfolioProject[];
};
export const PortfolioConfigContext = createContext<{ config: PortfolioConfig; locale: Locale } | null>(null);

// Helper function to get locale from pathname
export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/');
  const firstSegment = segments[1];

  if (firstSegment === 'en' || firstSegment === 'fr' || firstSegment === 'de') {
    return firstSegment as Locale;
  }

  return 'en';
}

// Hook to get current portfolio configuration based on locale
export function usePortfolioConfig() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const dynamicContent = useContext(PortfolioConfigContext);

  return {
    config: dynamicContent?.config || configs[currentLocale] || configs.en,
    locale: currentLocale,
    isRTL: false, // None of our supported languages are RTL
  };
}

// Direct function to get config by locale (for use in server components, metadata, etc.)
export function getPortfolioConfig(locale: Locale = 'en') {
  return configs[locale] || configs.en;
}

// Helper function to get localized text
export function getLocalizedText(
  text: { en: string; fr: string; de: string } | string,
  locale: Locale = 'en'
): string {
  if (typeof text === 'string') {
    return text;
  }

  return text[locale] || text.en || '';
}

// Language direction helper
export function getLanguageDirection(locale: Locale = 'en'): 'ltr' | 'rtl' {
  // All our supported languages are LTR
  return 'ltr';
}

// Navigation labels in different languages
export const navigationLabels = {
  en: {
    home: 'Home',
    about: 'About',
    skills: 'Skills',
    education: 'Education',
    projects: 'Projects',
    contact: 'Contact',
    resume: 'Resume',
    downloadCV: 'Download CV',
    viewCV: 'View CV',
    blog: 'Blog',
    viewProject: 'View Project',
    sourceCode: 'Source Code',
    liveDemo: 'Live Demo',
    getInTouch: 'Get in Touch',
    sendMessage: 'Send Message',
    backToTop: 'Back to Top',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  fr: {
    home: 'Accueil',
    about: 'À Propos',
    skills: 'Compétences',
    education: 'Formation',
    projects: 'Projets',
    contact: 'Contact',
    resume: 'CV',
    downloadCV: 'Télécharger le CV',
    viewCV: 'Voir le CV',
    blog: 'Blog',
    viewProject: 'Voir le Projet',
    sourceCode: 'Code Source',
    liveDemo: 'Démo en Direct',
    getInTouch: 'Contactez-moi',
    sendMessage: 'Envoyer le Message',
    backToTop: 'Retour en Haut',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
  },
  de: {
    home: 'Startseite',
    about: 'Über mich',
    skills: 'Fähigkeiten',
    education: 'Bildung',
    projects: 'Projekte',
    contact: 'Kontakt',
    resume: 'Lebenslauf',
    downloadCV: 'Lebenslauf herunterladen',
    viewCV: 'Lebenslauf ansehen',
    blog: 'Blog',
    viewProject: 'Projekt ansehen',
    sourceCode: 'Quellcode',
    liveDemo: 'Live-Demo',
    getInTouch: 'Kontakt aufnehmen',
    sendMessage: 'Nachricht senden',
    backToTop: 'Nach oben',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
  },
};

// Hook to get navigation labels
export function useNavigationLabels() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  return navigationLabels[currentLocale] || navigationLabels.en;
}

// Development banner labels
export const developmentBannerLabels = {
  en: {
    title: 'Portfolio Under Development',
    message: 'We sincerely apologize that our portfolio is not yet complete. We are currently in the process of adding new projects and implementing various configurations to enhance your browsing experience. We appreciate your patience and understanding as we work diligently to complete the portfolio as soon as possible.',
    thankYou: 'Thank you for your understanding and continued support.',
  },
  fr: {
    title: 'Portfolio en Développement',
    message: 'Nous nous excusons sincèrement que notre portfolio ne soit pas encore terminé. Nous sommes actuellement en train d\'ajouter de nouveaux projets et d\'implémenter diverses configurations pour améliorer votre expérience de navigation. Nous apprécions votre patience et votre compréhension pendant que nous travaillons assidûment pour terminer le portfolio dès que possible.',
    thankYou: 'Merci pour votre compréhension et votre soutien continu.',
  },
  de: {
    title: 'Portfolio in Entwicklung',
    message: 'Wir entschuldigen uns aufrichtig dafür, dass unser Portfolio noch nicht vollständig ist. Wir sind derzeit dabei, neue Projekte hinzuzufügen und verschiedene Konfigurationen zu implementieren, um Ihr Browsing-Erlebnis zu verbessern. Wir schätzen Ihre Geduld und Ihr Verständnis, während wir fleißig daran arbeiten, das Portfolio so schnell wie möglich zu vervollständigen.',
    thankYou: 'Vielen Dank für Ihr Verständnis und Ihre kontinuierliche Unterstützung.',
  },
};

// Contact form labels
export const contactFormLabels = {
  en: {
    name: 'Full Name',
    email: 'Email Address',
    subject: 'Subject',
    message: 'Message',
    send: 'Send Message',
    sending: 'Sending...',
    successMessage: 'Thank you for your message! I\'ll get back to you soon.',
    errorMessage: 'Sorry, there was an error sending your message. Please try again.',
    nameRequired: 'Name is required',
    emailRequired: 'Email is required',
    emailInvalid: 'Please enter a valid email address',
    subjectRequired: 'Subject is required',
    messageRequired: 'Message is required',
  },
  fr: {
    name: 'Nom Complet',
    email: 'Adresse Email',
    subject: 'Sujet',
    message: 'Message',
    send: 'Envoyer le Message',
    sending: 'Envoi en cours...',
    successMessage: 'Merci pour votre message ! Je vous répondrai bientôt.',
    errorMessage: 'Désolé, il y a eu une erreur lors de l\'envoi de votre message. Veuillez réessayer.',
    nameRequired: 'Le nom est requis',
    emailRequired: 'L\'email est requis',
    emailInvalid: 'Veuillez entrer une adresse email valide',
    subjectRequired: 'Le sujet est requis',
    messageRequired: 'Le message est requis',
  },
  de: {
    name: 'Vollständiger Name',
    email: 'E-Mail-Adresse',
    subject: 'Betreff',
    message: 'Nachricht',
    send: 'Nachricht senden',
    sending: 'Wird gesendet...',
    successMessage: 'Vielen Dank für Ihre Nachricht! Ich werde mich bald bei Ihnen melden.',
    errorMessage: 'Entschuldigung, beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.',
    nameRequired: 'Name ist erforderlich',
    emailRequired: 'E-Mail ist erforderlich',
    emailInvalid: 'Bitte geben Sie eine gültige E-Mail-Adresse ein',
    subjectRequired: 'Betreff ist erforderlich',
    messageRequired: 'Nachricht ist erforderlich',
  },
};

// Hook to get contact form labels
export function useContactFormLabels() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  return contactFormLabels[currentLocale] || contactFormLabels.en;
}

// Hook to get development banner labels
export function useDevelopmentBannerLabels() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  return developmentBannerLabels[currentLocale] || developmentBannerLabels.en;
}

// All labels combined for the comprehensive useLocalization hook
const allLabels = {
  en: {
    ...navigationLabels.en,
    ...contactFormLabels.en,
    developmentBanner: developmentBannerLabels.en,
  },
  fr: {
    ...navigationLabels.fr,
    ...contactFormLabels.fr,
    developmentBanner: developmentBannerLabels.fr,
  },
  de: {
    ...navigationLabels.de,
    ...contactFormLabels.de,
    developmentBanner: developmentBannerLabels.de,
  },
};

// Main localization hook that provides everything
export function useLocalization() {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);
  const config = configs[currentLocale] || configs.en;
  const labels = allLabels[currentLocale] || allLabels.en;

  // Translation function that supports nested keys
  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = labels;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return key; // Return the key itself if translation not found
      }
    }

    return typeof result === 'string' ? result : key;
  };

  return {
    config,
    locale: currentLocale,
    labels,
    t,
    isRTL: false,
  };
}

const localizationUtils = {
  usePortfolioConfig,
  getPortfolioConfig,
  getLocalizedText,
  getLanguageDirection,
  useNavigationLabels,
  useContactFormLabels,
  useDevelopmentBannerLabels,
  useLocalization,
};

export default localizationUtils;

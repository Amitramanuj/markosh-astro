/**
 * SEO utilities for consistent metadata management
 * Provides helpers for generating SEO-optimized metadata across pages
 */

export interface SEOConfig {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

/**
 * Default SEO configuration
 */
export const defaultSEO: Required<Omit<SEOConfig, 'publishedTime' | 'modifiedTime' | 'author' | 'section' | 'tags'>> = {
  title: 'Markosh',
  description: 'Markosh provides top-tier IT staffing and custom software development services to help your business scale.',
  image: '/markosh-logo.png',
  canonical: '',
  noindex: false,
  type: 'website'
};

/**
 * Generate full title with site name
 */
export function generateTitle(title?: string): string {
  if (!title || title === defaultSEO.title) {
    return defaultSEO.title;
  }
  return `${title} | ${defaultSEO.title}`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalURL(path: string, baseURL: string = 'https://markosh.com'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  return `${cleanBase}${cleanPath}`;
}

/**
 * Generate full image URL for social sharing
 */
export function generateImageURL(image: string, baseURL: string = 'https://markosh.com'): string {
  if (image.startsWith('http://') || image.startsWith('https://')) {
    return image;
  }
  const cleanImage = image.startsWith('/') ? image : `/${image}`;
  const cleanBase = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;
  return `${cleanBase}${cleanImage}`;
}

/**
 * Page-specific SEO configurations
 */
export const pageSEO = {
  home: {
    title: 'Elite Tech Talent & Custom Software Development',
    description: 'Accelerate your growth with Markosh\'s top-tier IT staffing and custom software development services. Connect with pre-vetted professionals and build scalable solutions.',
    type: 'website' as const
  },
  about: {
    title: 'About Markosh - Your Technology Partner',
    description: 'Learn about Markosh\'s mission to connect businesses with elite tech talent and deliver custom software solutions that drive growth and innovation.',
    type: 'website' as const
  },
  services: {
    title: 'IT Staffing & Software Development Services',
    description: 'Discover Markosh\'s comprehensive IT staffing, custom software development, AI/ML, and cloud services designed to accelerate your business growth.',
    type: 'website' as const
  },
  industries: {
    title: 'Industries We Serve - Technology Solutions',
    description: 'Markosh serves diverse industries including e-commerce, SaaS, healthcare, finance, education, and manufacturing with tailored technology solutions.',
    type: 'website' as const
  },
  contact: {
    title: 'Contact Markosh - Get Started Today',
    description: 'Ready to accelerate your growth? Contact Markosh today to discuss your IT staffing needs or custom software development project.',
    type: 'website' as const
  },
  resources: {
    title: 'Resources - Case Studies, White Papers & Blog',
    description: 'Explore Markosh\'s resources including case studies, white papers, and blog articles on software development, IT staffing, and business growth.',
    type: 'website' as const
  },
  career: {
    title: 'Careers at Markosh',
    description: 'Stay updated on upcoming career opportunities and join the Markosh talent network for exclusive roles.',
    type: 'website' as const
  }
} as const;

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Markosh",
    "description": "Top-tier IT staffing and custom software development services",
    "url": "https://markosh.com",
    "logo": "https://markosh.com/markosh-logo.png",
    "sameAs": [
      "https://linkedin.com/company/markosh",
      "https://twitter.com/markosh"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0123",
      "contactType": "customer service",
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "US"
    },
    "foundingDate": "2020",
    "numberOfEmployees": "50-100",
    "industry": "Information Technology",
    "services": [
      "IT Staffing",
      "Custom Software Development",
      "Mobile & Web Development",
      "AI & Machine Learning",
      "Cloud & DevOps"
    ]
  };
}

/**
 * Generate structured data for website
 */
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Markosh",
    "url": "https://markosh.com",
    "description": "Top-tier IT staffing and custom software development services",
    "publisher": {
      "@type": "Organization",
      "name": "Markosh"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://markosh.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate structured data for service pages
 */
export function generateServiceStructuredData(serviceName: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Markosh",
      "url": "https://markosh.com"
    },
    "serviceType": "Technology Services",
    "areaServed": "Worldwide"
  };
}

/**
 * Merge SEO configuration with defaults
 */
export function mergeSEOConfig(config: SEOConfig, path: string): Required<SEOConfig> {
  const merged = {
    ...defaultSEO,
    ...config
  };

  return {
    ...merged,
    title: generateTitle(merged.title),
    canonical: merged.canonical || generateCanonicalURL(path),
    image: generateImageURL(merged.image),
    publishedTime: config.publishedTime || '',
    modifiedTime: config.modifiedTime || '',
    author: config.author || '',
    section: config.section || '',
    tags: config.tags || []
  };
}

/**
 * Get SEO configuration for a specific page
 */
export function getPageSEO(page: keyof typeof pageSEO, path: string): Required<SEOConfig> {
  const pageConfig = pageSEO[page];
  return mergeSEOConfig(pageConfig, path);
}

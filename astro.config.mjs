// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs';
import path from 'path';

import react from '@astrojs/react';
import sitemap, { ChangeFreqEnum } from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

/**
 * Sitemap lastmod for git-markdown content (blog posts, case studies),
 * read from each file's frontmatter: `updated` if present, else `published`.
 * @returns {Record<string, Pick<import('@astrojs/sitemap').SitemapItem, 'lastmod' | 'changefreq' | 'priority'>>}
 */
function collectContentLastmod() {
  /** @type {ReturnType<typeof collectContentLastmod>} */
  const entries = {};
  const collections = [
    { dir: 'src/content/blog', route: '/blog/' },
    { dir: 'src/content/case-studies', route: '/case-studies/' },
  ];

  for (const { dir, route } of collections) {
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith('.md')) continue;
      const source = fs.readFileSync(path.join(dir, file), 'utf8');
      if (/^draft:\s*true/m.test(source)) continue;
      const published = source.match(/^published:\s*'?(\d{4}-\d{2}-\d{2})'?/m)?.[1];
      const updated = source.match(/^updated:\s*'?(\d{4}-\d{2}-\d{2})'?/m)?.[1];
      const lastmod = updated ?? published;
      if (!lastmod) continue;
      entries[`${route}${file.replace(/\.md$/, '')}/`] = {
        lastmod,
        changefreq: ChangeFreqEnum.MONTHLY,
        priority: 0.6,
      };
    }
  }

  return entries;
}

const evergreenLastMod = '2026-07-03';
/** @type {Record<string, Pick<import('@astrojs/sitemap').SitemapItem, 'lastmod' | 'changefreq' | 'priority'>>} */
const sitemapMetadataByPath = {
  '/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.WEEKLY, priority: 1.0 },
  '/about/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.6 },
  '/career/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.5 },
  '/contact/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.9 },
  '/industries/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.6 },
  '/mvp-on-us/': { lastmod: '2026-07-05', changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/resources/': { lastmod: '2026-07-05', changefreq: ChangeFreqEnum.WEEKLY, priority: 0.7 },
  '/blog/': { lastmod: '2026-07-05', changefreq: ChangeFreqEnum.WEEKLY, priority: 0.7 },
  '/case-studies/': { lastmod: '2026-07-05', changefreq: ChangeFreqEnum.WEEKLY, priority: 0.7 },
  '/sales/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.9 },
  '/sales-rep-trial/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.9 },
  '/services/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.9 },
  '/services/ai-development/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/services/ai-strategy/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/services/custom-software-development/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/services/it-staffing/': { lastmod: evergreenLastMod, changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/solutions/': { lastmod: '2026-07-07', changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/solutions/outbound-pipeline-pod/': { lastmod: '2026-07-07', changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/solutions/workflow-automation/': { lastmod: '2026-07-07', changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/solutions/embedded-delivery-pod/': { lastmod: '2026-07-07', changefreq: ChangeFreqEnum.MONTHLY, priority: 0.8 },
  '/whitepapers/': { lastmod: '2025-08-04', changefreq: ChangeFreqEnum.WEEKLY, priority: 0.7 },
  '/whitepapers/ai-coding-isnt-economically-sustainable/': {
    lastmod: '2025-08-04',
    changefreq: ChangeFreqEnum.MONTHLY,
    priority: 0.7,
  },
  '/whitepapers/from-sota-to-systems/': {
    lastmod: '2025-07-12',
    changefreq: ChangeFreqEnum.MONTHLY,
    priority: 0.7,
  },
  '/whitepapers/llms-have-hit-walls/': {
    lastmod: '2025-05-18',
    changefreq: ChangeFreqEnum.MONTHLY,
    priority: 0.7,
  },
  ...collectContentLastmod(),
};

/** @param {string} url */
function normalizeSitemapPath(url) {
  const pathname = new URL(url).pathname;
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

// https://astro.build/config
export default defineConfig({
  // Site configuration for proper URL generation
  site: 'https://markosh.com',
  
  integrations: [
    tailwind({
      // Apply base styles automatically
      applyBaseStyles: false,
    }),
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const metadata = sitemapMetadataByPath[normalizeSitemapPath(item.url)];
        return metadata ? { ...item, ...metadata } : item;
      },
    })
  ],
  
  // Static site generation for optimal performance
  output: 'static',
  
  // Trailing slash configuration - ignore for better compatibility
  trailingSlash: 'ignore',
  
  // Build optimizations
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
    // Optimize assets for better caching
    assets: '_astro'
  },
  
  // Enhanced image optimization configuration
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // All imagery is self-hosted; no remote image domains are allowed.
    // Per-image format and quality are set at the <Image /> call sites.
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom'],
            'form-utils': ['@/lib/form-utils'],
            'seo-utils': ['@/lib/seo-utils']
          }
        }
      }
    },
    ssr: {
      noExternal: ['@astrojs/react']
    }
  },
  
  // Performance optimizations
  compressHTML: true,
  
  // Prefetch configuration for better navigation performance
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },


  // Security configuration
  security: {
    checkOrigin: true
  }
});


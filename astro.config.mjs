// @ts-check
import { defineConfig } from 'astro/config';
import path from 'path';

import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  // Site configuration for proper URL generation
  site: 'https://markosh.com',
  
  integrations: [
    tailwind({
      // Apply base styles automatically
      applyBaseStyles: false,
    }),
    react()
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
    // Configure image formats and quality
    domains: ['images.unsplash.com', 'placehold.co', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'placehold.co'
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com'
      }
    ],
    // Default image optimization settings
    formats: ['avif', 'webp', 'png', 'jpg'],
    quality: {
      avif: 80,
      webp: 80,
      png: 80,
      jpg: 80
    }
  },

  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    }
  },
  
  // Performance optimizations
  compressHTML: true,
  
  // Prefetch configuration for better navigation performance
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  }
});
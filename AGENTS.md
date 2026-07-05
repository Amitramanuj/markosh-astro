# Markosh.com - Codex Configuration

This is the project-specific Codex configuration for Markosh.com - a modern business website built with Astro, React, and Tailwind CSS.

## 🚀 Project Overview

**Tech Stack:**
- **Framework**: Astro 5.x (Static Site Generation)
- **UI Library**: React 19.x with TypeScript
- **Styling**: Tailwind CSS 3.x with shadcn/ui components
- **Build Tool**: Vite (via Astro)
- **Deployment**: Cloudflare Pages
- **Package Manager**: npm

**Project Type**: Modern business website with performance optimization focus

## 📁 Project Structure

```
markosh.com-astro/
├── src/
│   ├── components/
│   │   ├── islands/          # React islands (client-side components)
│   │   ├── layout/           # Astro layout components
│   │   ├── sections/         # Page section components
│   │   └── ErrorBoundary.tsx # React error boundary
│   ├── content/              # Content collections (blog/, case-studies/ markdown)
│   ├── layouts/              # Astro layouts
│   ├── pages/                # Astro pages (routes)
│   ├── lib/                  # Utilities and helpers (incl. whitepapers.ts data)
│   ├── hooks/                # React custom hooks
│   ├── styles/               # Global styles
│   └── content.config.ts     # Collection schemas (zod)
├── public/                   # Static assets
├── scripts/                  # Build and test scripts
└── dist/                     # Build output (auto-generated)
```

## 🎨 Design System & Coding Standards

### **Component Architecture**

1. **Astro Components (.astro)**:
   - Server-side rendered by default
   - Use for layouts, static sections, and page templates
   - Follow PascalCase naming: `HeroSection.astro`, `Footer.astro`
   - Place in appropriate subdirectories: `layout/`, `sections/`

2. **React Islands (.tsx)**:
   - Client-side interactive components
   - Place in `src/components/islands/`
   - Use TypeScript strict mode
   - Export as default with descriptive names

3. **Component Patterns**:
   ```typescript
   // ✅ Good: Astro component with proper typing
   ---
   export interface Props {
     title: string;
     description?: string;
   }

   const { title, description } = Astro.props;
   ---

   // ✅ Good: React island with proper exports
   import type { ReactNode } from 'react';

   interface ComponentProps {
     children?: ReactNode;
     className?: string;
   }

   export default function Component({ children, className }: ComponentProps) {
     return <div className={className}>{children}</div>;
   }
   ```

### **Styling Guidelines**

1. **Tailwind CSS**:
   - Use utility-first approach
   - Leverage custom design tokens from `tailwind.config.mjs`
   - Use CSS custom properties for dynamic theming
   - Prefer `clsx` or `cn()` utility for conditional classes

2. **Color System**:
   - Use HSL-based color system with CSS custom properties
   - Follow shadcn/ui color palette: `primary`, `secondary`, `muted`, `accent`
   - Example: `bg-primary text-primary-foreground`

3. **Typography**:
   - Headlines: `font-headline` (Space Grotesk)
   - Body text: `font-body` (Inter)
   - Data/eyebrows/tags: `font-mono` (system mono) — numbered section eyebrows use the pattern `01 — Section Name`
   - Consistent spacing using Tailwind scale

4. **Responsive Design**:
   - Mobile-first approach
   - Use container utility with defined breakpoints
   - Custom breakpoints: `sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1400px`

### **Code Quality Standards**

1. **TypeScript**:
   - Strict mode enabled with additional strict rules
   - Use proper type definitions for all props and functions
   - Leverage path aliases: `@/components/*`, `@/lib/*`, `@/styles/*`
   - No implicit returns, no fallthrough cases, exact optional properties

2. **React Best Practices**:
   - Use functional components with hooks
   - Implement proper error boundaries
   - Optimize with React 19 features (Suspense, concurrent features)
   - Use React Hook Form with Zod validation for forms

3. **Performance Guidelines**:
   - Lazy load components when appropriate (`LazyContactForm`)
   - Use Astro islands for interactivity
   - Implement proper image optimization (Sharp service)
   - Utilize manual chunking for vendor libraries

## 🔧 Development Workflow

### **Commands Reference**

```bash
# Development
npm run dev          # Start dev server with host binding
npm run build        # Build for production
npm run preview      # Preview production build
npm run start        # Alias for dev

# Quality Assurance
npm run check        # Astro check for errors
npm run type-check   # Full TypeScript type checking
npm run lint         # Lint check (same as astro check)
npm run analyze      # Build with bundle analysis

# Utility
npm run clean        # Clean dist and .astro folders
npm run generate:og  # Regenerate social image and favicon PNGs
```

### **File Naming Conventions**

- **Components**: PascalCase (`ContactForm.tsx`, `HeroSection.astro`)
- **Pages**: lowercase with hyphens (`about-us.astro`, `contact.astro`)
- **Utilities**: kebab-case (`form-utils.ts`, `seo-utils.ts`)
- **Config files**: kebab-case (`astro.config.mjs`, `tailwind.config.mjs`)

### **Import Organization**

```typescript
// 1. External libraries
import React from 'react';
import { clsx } from 'clsx';

// 2. Internal utilities and hooks
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

// 3. Components (relative to current file)
import Button from './Button';
import { Dialog } from '@/components/ui/dialog';

// 4. Types (last, with 'type' keyword)
import type { ComponentProps } from './types';
```

## 🚦 Performance Optimizations

### **Current Optimizations**

1. **Build Optimizations**:
   - Manual chunking for React vendor code
   - Inline stylesheets (auto)
   - AVIF/WebP image formats with quality optimization
   - Compressed HTML output

2. **Runtime Optimizations**:
   - Prefetch all links with viewport strategy
   - Hoisted script optimization
   - Content intellisense for better caching

3. **Asset Management**:
   - Sharp service for image processing
   - Multi-format image support (AVIF → WebP → PNG/JPG fallback)
   - Optimized bundle splitting

### **Monitoring & Testing**

- Use `npm run check` and `npm run type-check` for static validation
- Use `npm run build` for production build validation
- Use `npm run preview` for local production preview testing

## 🔒 Security Guidelines

1. **Configuration**:
   - Origin checking enabled
   - No external script execution
   - All imagery self-hosted (no remote image domains)

2. **Form Security**:
   - Client-side validation with Zod
   - Proper error boundaries
   - Toast notifications for user feedback

## 🚢 Deployment Configuration

### **Build Process**

- **Target**: Static site generation (`output: 'static'`)
- **Format**: Directory structure for clean URLs
- **Assets**: Organized in `_astro/` directory with hashing

### **Environment Setup**

- **Site URL**: `https://markosh.com`
- **Deployment**: Cloudflare Pages
- **CDN**: Cloudflare global network

## 📝 Development Notes

### **Key Features**

1. **Contact Forms**: React Hook Form with Zod validation
2. **Interactive Islands**: Lazy-loaded React components
3. **Mobile Navigation**: Responsive mobile menu
4. **Taskade Integration**: Third-party widget integration
5. **SEO Optimization**: Proper meta tags and structured data

### **Common Patterns**

1. **Form Components**: Use controlled components with React Hook Form
2. **Layout Components**: Astro components for server-side rendering
3. **Interactive Elements**: React islands for client-side functionality
4. **Error Handling**: React error boundaries for graceful failures
5. **Loading States**: Lazy loading with proper fallbacks

## 🎯 Future Development Guidelines

### **Adding New Features**

1. **New Page**: Create `.astro` file in `src/pages/`
2. **New Component**: Choose Astro (server) or React (interactive)
3. **New Utility**: Add to `src/lib/` with proper TypeScript types
4. **New Hook**: Add to `src/hooks/` following React patterns
5. **New Blog Post / Case Study**: Add a `.md` file to `src/content/blog/` or `src/content/case-studies/` (schemas in `src/content.config.ts`); publishing = commit + push. Case-study copy must follow the compliance rules: anonymized, structural facts only, no invented client outcomes.

### **Testing New Changes**

```bash
# 1. Type checking
npm run type-check

# 2. Build validation
npm run build

# 3. Preview testing
npm run preview
```

### **Before Deployment**

- [ ] All TypeScript errors resolved
- [ ] Build completes without errors
- [ ] Performance tests pass
- [ ] Manual testing on preview build
- [ ] Responsive design verified

---

**Last Updated**: July 2026
**Astro Version**: 5.12.9
**Node Version**: 18+ required
**Package Manager**: npm (lockfile: package-lock.json)

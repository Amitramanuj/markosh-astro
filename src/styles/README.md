# CSS Scoping Strategy for Astro Components

## Overview

This document outlines the CSS scoping strategy implemented for the Markosh Astro migration to ensure component isolation and prevent style conflicts.

## Scoping Approaches

### 1. Astro Scoped Styles

Astro automatically scopes styles defined in `<style>` blocks within `.astro` components:

```astro
---
// Component logic
---

<div class="card">
  <h2>Title</h2>
</div>

<style>
  .card {
    /* This style is automatically scoped to this component */
    background: var(--card);
    border: 1px solid var(--border);
  }
</style>
```

### 2. Global Styles

Global styles are defined in `src/styles/globals.css` and include:
- Tailwind base, components, and utilities
- CSS custom properties (design tokens)
- Global component classes (like `.btn-gradient`)
- Third-party widget customizations (Taskade)

### 3. Tailwind Utility Classes

Primary styling approach using Tailwind utility classes:
- Consistent design system through CSS custom properties
- Responsive design utilities
- Component variants through class composition

### 4. Component-Specific Styles

For complex components that need custom styling:
- Use Astro's scoped `<style>` blocks
- Leverage CSS custom properties for consistency
- Avoid global class pollution

## Design Token System

All colors and design tokens are defined as CSS custom properties in `globals.css`:

```css
:root {
  --background: 240 50% 98%;
  --foreground: 224 39% 10%;
  --primary: 243 55% 58%;
  --accent: 239 85% 66%;
  /* ... more tokens */
}
```

These tokens are consumed through Tailwind's color system:

```javascript
// tailwind.config.mjs
colors: {
  background: 'hsl(var(--background))',
  primary: 'hsl(var(--primary))',
  // ...
}
```

## Font Loading Strategy

Fonts are loaded optimally through:

1. **Preconnect**: Early connection to Google Fonts
2. **Font Display Swap**: Prevents layout shift during font loading
3. **Font Family Fallbacks**: System fonts as fallbacks

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link 
  href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Poppins:wght@400;500;600;700;800;900&display=swap" 
  rel="stylesheet" 
/>
```

## Component Isolation Best Practices

1. **Use Tailwind utilities first** for consistent styling
2. **Scoped styles for complex layouts** that can't be achieved with utilities
3. **CSS custom properties** for dynamic values and theming
4. **Avoid global classes** except for reusable component patterns
5. **Namespace custom classes** when global styles are necessary

## Third-Party Widget Styling

Taskade widget customization is handled through global utilities with high specificity:

```css
.taskade-chat-button {
  background: linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--accent)) 100%) !important;
  /* ... more overrides */
}
```

This approach ensures the widget matches the site's design system while maintaining functionality.
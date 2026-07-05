import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Git-based content: markdown files in src/content/, no CMS or backend.
 * Publishing = add a .md file and push. See Development notes in CLAUDE.md.
 */

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    category: z.string(),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    updated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    readTimeMinutes: z.number().int().positive(),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    sector: z.string(),
    family: z.enum(['Sell', 'Staff', 'Build', 'Strategy']),
    published: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    // Structural engagement facts only — never client performance claims.
    results: z.array(z.object({ value: z.string(), label: z.string() })),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };

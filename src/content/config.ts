import { defineCollection, z } from "astro:content"
import { TOPICS } from "../lib/topics"

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    permalink: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    topics: z.array(z.enum(TOPICS)).default([]),
    header: z.object({ teaser: z.string().optional() }).optional(),
    draft: z.boolean().optional(),
  }),
})

export const collections = { blog }

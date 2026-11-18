import type { Loader } from "astro/loaders";
import { z } from "astro/zod";
import { fetchDocuments, fetchPublication, rkeyOf } from "./pds";
import { slugify } from "./prepare";

const postSchema = z.object({
  rkey: z.string(),
  cid: z.string(),
  title: z.string(),
  description: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  tags: z.array(z.string()).default([]),
  /** Where the post lives on Leaflet. */
  leafletUrl: z.string().url(),
  /** The Leaflet block content, rendered by `prepareDocument`. */
  content: z.unknown(),
});

/**
 * Loads the publication's posts from the PDS at build time. Entry ids are
 * title slugs; the record key is kept in `rkey`.
 */
export function leafletLoader(): Loader {
  return {
    name: "leaflet-standard-site",
    schema: postSchema,
    async load(context) {
      const { store, logger } = context;
      const [publication, records] = await Promise.all([
        fetchPublication(),
        fetchDocuments(),
      ]);
      const baseUrl = publication.url.replace(/\/+$/, "");

      // Oldest first, so an older post keeps its slug if a newer post reuses
      // the title.
      records.sort((a, b) =>
        a.value.publishedAt.localeCompare(b.value.publishedAt),
      );

      store.clear();
      const taken = new Set<string>();
      for (const record of records) {
        const rkey = rkeyOf(record.uri);
        const { value } = record;

        let slug = slugify(value.title) || rkey;
        if (taken.has(slug)) slug = `${slug}-${rkey}`;
        taken.add(slug);

        const data = await context.parseData({
          id: slug,
          data: {
            rkey,
            cid: record.cid,
            title: value.title,
            description: value.description || undefined,
            publishedAt: value.publishedAt,
            updatedAt: value.updatedAt,
            tags: value.tags ?? [],
            leafletUrl: `${baseUrl}${value.path ?? `/${rkey}`}`,
            content: value.content,
          },
        });
        store.set({
          id: slug,
          data,
          digest: context.generateDigest(record.cid),
        });
      }
      logger.info(`Loaded ${records.length} posts from ${baseUrl}`);
    },
  };
}

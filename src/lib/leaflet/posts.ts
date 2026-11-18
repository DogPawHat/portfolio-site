import { getCollection } from "astro:content";
import type { Post } from "./loader";

/**
 * Every blog post, newest first.
 *
 * The result is typed from the loader's schema instead of Astro's generated
 * collection types, so type checking works before `astro sync` has run (as in
 * CI, where the lint job never builds the site).
 */
export async function getPosts(): Promise<Post[]> {
  const posts: Post[] = await getCollection("blog");
  return posts.sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );
}

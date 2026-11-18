import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { BLOG_DESCRIPTION, SITE_TITLE } from "../consts";
import { getPosts } from "../lib/leaflet/posts";

export const GET: APIRoute = async (context) => {
  const posts = await getPosts();
  return rss({
    title: `Blog - ${SITE_TITLE}`,
    description: BLOG_DESCRIPTION,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      categories: post.data.tags,
      link: `/blog/${post.id}/`,
    })),
  });
};

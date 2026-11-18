// A fingerprint of the posts this build contains. The scheduled function in
// netlify/functions compares it with the PDS to decide whether to rebuild.
import type { APIRoute } from "astro";
import { BLOG, versionOf } from "../../lib/leaflet/pds";
import { getPosts } from "../../lib/leaflet/posts";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const version = versionOf(
    posts.map((post) => ({
      uri: `at://${BLOG.did}/site.standard.document/${post.data.rkey}`,
      cid: post.data.cid,
    })),
  );
  return Response.json({ version });
};

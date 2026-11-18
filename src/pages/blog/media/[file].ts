// Copies the images used in posts from the PDS into the built site, so
// readers don't depend on the PDS being reachable.
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { blobUrl } from "../../../lib/leaflet/pds";
import { collectBlobs, mediaFileName } from "../../../lib/leaflet/prepare";

export const getStaticPaths = (async () => {
  const posts = await getCollection("blog");
  const blobs = posts.flatMap((post) => collectBlobs(post.data.content));
  const byName = new Map(blobs.map((blob) => [mediaFileName(blob), blob]));
  return [...byName].map(([file, blob]) => ({
    params: { file },
    props: { cid: blob.ref.$link, mimeType: blob.mimeType },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const response = await fetch(await blobUrl(props.cid));
  if (!response.ok) {
    throw new Error(`Could not download blob ${props.cid}: ${response.status}`);
  }
  return new Response(await response.arrayBuffer(), {
    headers: { "content-type": props.mimeType },
  });
};

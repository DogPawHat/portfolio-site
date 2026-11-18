// Copies the images used in posts from the PDS into the built site, so
// readers don't depend on the PDS being reachable. Animated images also get a
// still frame (see `media.ts`).
import type { APIRoute, GetStaticPaths } from "astro";
import {
  downloadBlob,
  isAnimated,
  stillFileName,
  stillFrame,
} from "../../../lib/leaflet/media";
import { getPosts } from "../../../lib/leaflet/posts";
import { collectBlobs, mediaFileName } from "../../../lib/leaflet/prepare";
import type { BlobRef } from "../../../lib/leaflet/types";

type Props = {
  blob: BlobRef;
  /** Serve the image's still frame rather than the image itself. */
  still: boolean;
};

export const getStaticPaths = (async () => {
  const posts = await getPosts();
  const blobs = posts.flatMap((post) => collectBlobs(post.data.content));
  const byName = new Map(blobs.map((blob) => [mediaFileName(blob), blob]));
  const paths: { params: { file: string }; props: Props }[] = [];
  for (const [file, blob] of byName) {
    paths.push({ params: { file }, props: { blob, still: false } });
    if (await isAnimated(blob)) {
      paths.push({
        params: { file: stillFileName(blob) },
        props: { blob, still: true },
      });
    }
  }
  return paths;
}) satisfies GetStaticPaths;

export const GET: APIRoute<Props> = async ({ props }) => {
  const { blob, still } = props;
  if (still) {
    return new Response(await stillFrame(blob), {
      headers: { "content-type": "image/webp" },
    });
  }
  return new Response(await downloadBlob(blob.ref.$link), {
    headers: { "content-type": blob.mimeType },
  });
};

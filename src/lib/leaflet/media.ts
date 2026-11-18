// The images used in posts, downloaded from the PDS once per build. Animated
// ones also get a still frame, which readers who prefer reduced motion see
// instead, and which anyone can switch to with the pause button.
import sharp from "sharp";
import { blobUrl } from "./pds";
import type { BlobRef } from "./types";

const downloads = new Map<string, Promise<ArrayBuffer>>();

export function downloadBlob(cid: string): Promise<ArrayBuffer> {
  let download = downloads.get(cid);
  if (!download) {
    download = (async () => {
      const response = await fetch(await blobUrl(cid));
      if (!response.ok) {
        throw new Error(`Could not download blob ${cid}: ${response.status}`);
      }
      return response.arrayBuffer();
    })();
    downloads.set(cid, download);
  }
  return download;
}

/** Formats that can hold more than one frame. */
const MAYBE_ANIMATED = new Set([
  "image/gif",
  "image/webp",
  "image/png",
  "image/avif",
]);

/**
 * Whether an image has more than one frame. This reads the file itself, since
 * a GIF can be a single still frame and a WebP or PNG can be animated.
 */
export async function isAnimated(blob: BlobRef): Promise<boolean> {
  if (!MAYBE_ANIMATED.has(blob.mimeType)) return false;
  const bytes = await downloadBlob(blob.ref.$link);
  const { pages = 1 } = await sharp(bytes).metadata();
  if (pages > 1) return true;
  // libvips reads an animated PNG as one frame. Its acTL chunk gives it away.
  if (blob.mimeType !== "image/png") return false;
  const png = Buffer.from(bytes);
  const actl = png.indexOf("acTL");
  return actl !== -1 && actl < png.indexOf("IDAT");
}

/** File name under /blog/media/ that an animated image's still is served from. */
export function stillFileName(blob: BlobRef): string {
  return `${blob.ref.$link}.still.webp`;
}

/** The first frame of an animated image, as a WebP of the same size. */
export async function stillFrame(
  blob: BlobRef,
): Promise<Uint8Array<ArrayBuffer>> {
  const bytes = await downloadBlob(blob.ref.$link);
  const webp = await sharp(bytes).webp({ quality: 80 }).toBuffer();
  return new Uint8Array(webp);
}

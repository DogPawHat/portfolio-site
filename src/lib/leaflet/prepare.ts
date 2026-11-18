// Walks a Leaflet document once, in reading order, and turns it into a simple
// tree the Astro components can render. Doing this up front keeps footnote
// numbering correct across blocks and sub-pages.
import { type Footnote, renderRichText } from "./richtext";
import type {
  BlobRef,
  LeafletBlock,
  LeafletContent,
  LeafletListItem,
  LeafletPage,
} from "./types";

export interface ListItem {
  html: string;
  checked?: boolean;
  children: ListItem[];
}

export type Prepared =
  | { kind: "text"; html: string }
  | { kind: "heading"; level: number; html: string; id: string }
  | { kind: "quote"; html: string }
  | { kind: "code"; code: string; lang: string }
  | {
      kind: "image";
      /** The image file, so it can be checked for animation. */
      blob: BlobRef;
      src: string;
      alt: string;
      width?: number;
      height?: number;
    }
  | { kind: "list"; ordered: boolean; start?: number; items: ListItem[] }
  | {
      kind: "website";
      href: string;
      title: string;
      description?: string;
      image?: string;
    }
  | { kind: "subpage"; blocks: Prepared[] }
  | { kind: "rule" }
  | { kind: "unsupported"; type: string };

export interface PreparedDocument {
  blocks: Prepared[];
  footnotes: Footnote[];
}

const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/svg+xml": "svg",
};

/** File name under /blog/media/ that a blob is served from. */
export function mediaFileName(blob: BlobRef): string {
  return `${blob.ref.$link}.${EXTENSIONS[blob.mimeType] ?? "bin"}`;
}

/** Every blob referenced anywhere in a record, so each can be downloaded. */
export function collectBlobs(value: unknown, found: BlobRef[] = []): BlobRef[] {
  if (Array.isArray(value)) {
    for (const item of value) collectBlobs(item, found);
  } else if (value && typeof value === "object") {
    const object = value as Record<string, unknown>;
    if (object.$type === "blob" && object.ref) {
      found.push(object as unknown as BlobRef);
    } else {
      for (const item of Object.values(object)) collectBlobs(item, found);
    }
  }
  return found;
}

export function slugify(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isLeafletContent(content: unknown): content is LeafletContent {
  return (
    typeof content === "object" &&
    content !== null &&
    (content as { $type?: string }).$type === "pub.leaflet.content" &&
    Array.isArray((content as { pages?: unknown }).pages)
  );
}

export function prepareDocument(content: unknown): PreparedDocument {
  const footnotes: Footnote[] = [];
  if (!isLeafletContent(content)) return { blocks: [], footnotes };

  const pages = content.pages;
  const headingIds = new Set<string>();
  const visited = new Set<LeafletPage>();

  // Leaflet lets a post start its headings at any level. Shift them so the
  // post's top-level heading always becomes an <h2> under the page title.
  const levels = (pages[0]?.blocks ?? [])
    .map(({ block }) => block)
    .filter((block) => block.$type === "pub.leaflet.blocks.header")
    .map((block) => block.level ?? 1);
  const shift = 2 - (levels.length > 0 ? Math.min(...levels) : 1);

  const headingId = (text: string) => {
    const base = slugify(text) || "section";
    let id = base;
    for (let n = 2; headingIds.has(id); n++) id = `${base}-${n}`;
    headingIds.add(id);
    return id;
  };

  const listItems = (items: LeafletListItem[] = []): ListItem[] =>
    items.map((item) => ({
      html: renderRichText(
        item.content?.plaintext,
        item.content?.facets,
        footnotes,
      ),
      checked: item.checked,
      children: listItems(item.children),
    }));

  const preparePage = (page: LeafletPage): Prepared[] => {
    visited.add(page);
    const prepared: Prepared[] = [];
    for (const { block } of page.blocks ?? []) {
      const result = prepareBlock(block);
      if (result) prepared.push(result);
    }
    return prepared;
  };

  const prepareBlock = (block: LeafletBlock): Prepared | undefined => {
    const type = block.$type.replace("pub.leaflet.blocks.", "");
    switch (type) {
      case "text": {
        // Leaflet stores blank lines as empty text blocks; the page's own
        // paragraph spacing replaces them.
        if (!block.plaintext?.trim()) return undefined;
        return {
          kind: "text",
          html: renderRichText(block.plaintext, block.facets, footnotes),
        };
      }
      case "header":
        return {
          kind: "heading",
          level: Math.max(2, Math.min(6, (block.level ?? 1) + shift)),
          html: renderRichText(block.plaintext, block.facets, footnotes),
          id: headingId(block.plaintext ?? ""),
        };
      case "blockquote":
        return {
          kind: "quote",
          html: renderRichText(block.plaintext, block.facets, footnotes),
        };
      case "code":
        return {
          kind: "code",
          code: block.plaintext ?? "",
          lang: block.language || "plaintext",
        };
      case "image":
        if (!block.image) return undefined;
        return {
          kind: "image",
          blob: block.image,
          src: `/blog/media/${mediaFileName(block.image)}`,
          alt: block.alt ?? "",
          width: block.aspectRatio?.width,
          height: block.aspectRatio?.height,
        };
      case "unorderedList":
      case "orderedList":
        return {
          kind: "list",
          ordered: type === "orderedList",
          start: block.startIndex,
          items: listItems(block.children),
        };
      case "website":
        if (!block.src) return undefined;
        return {
          kind: "website",
          href: block.src,
          title: block.title || block.src,
          description: block.description,
          image: block.previewImage
            ? `/blog/media/${mediaFileName(block.previewImage)}`
            : undefined,
        };
      case "page": {
        // A sub-page embedded in the post. Render it inline, once.
        const page = pages.find((candidate) => candidate.id === block.id);
        if (!page || visited.has(page)) return undefined;
        return { kind: "subpage", blocks: preparePage(page) };
      }
      case "horizontalRule":
        return { kind: "rule" };
      default:
        return { kind: "unsupported", type };
    }
  };

  const first = pages[0];
  return { blocks: first ? preparePage(first) : [], footnotes };
}

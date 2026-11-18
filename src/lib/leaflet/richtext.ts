import type { Facet, FacetFeature } from "./types";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const FACET = "pub.leaflet.richtext.facet#";

export interface Footnote {
  number: number;
  html: string;
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

/** Only link to schemes a blog post should ever use. */
function safeHref(uri: string | undefined): string | undefined {
  if (!uri) return undefined;
  if (uri.startsWith("/") || uri.startsWith("#")) return uri;
  try {
    const { protocol } = new URL(uri);
    return ["http:", "https:", "mailto:"].includes(protocol) ? uri : undefined;
  } catch {
    return undefined;
  }
}

const INLINE_TAGS: [feature: string, tag: string][] = [
  ["code", "code"],
  ["bold", "strong"],
  ["italic", "em"],
  ["underline", "u"],
  ["strikethrough", "s"],
  ["highlight", "mark"],
];

/**
 * Turn Leaflet rich text (plain text plus byte-offset facets) into HTML.
 *
 * Footnotes found along the way are appended to `footnotes` and replaced with
 * a numbered reference. Pass no array when rendering a footnote's own body.
 */
export function renderRichText(
  plaintext: string = "",
  facets: Facet[] = [],
  footnotes?: Footnote[],
): string {
  const bytes = encoder.encode(plaintext);
  const clamp = (offset: number) => Math.max(0, Math.min(offset, bytes.length));

  // Split the text at every facet edge so overlapping facets nest cleanly.
  const edges = new Set([0, bytes.length]);
  for (const facet of facets) {
    edges.add(clamp(facet.index.byteStart));
    edges.add(clamp(facet.index.byteEnd));
  }
  const sorted = [...edges].sort((a, b) => a - b);

  let html = "";
  for (let i = 0; i < sorted.length - 1; i++) {
    const start = sorted[i]!;
    const end = sorted[i + 1]!;
    const covering = facets.filter(
      (facet) =>
        clamp(facet.index.byteStart) <= start &&
        clamp(facet.index.byteEnd) >= end,
    );
    const features = new Map<string, FacetFeature>();
    for (const facet of covering) {
      for (const feature of facet.features) {
        if (feature.$type.startsWith(FACET)) {
          features.set(feature.$type.slice(FACET.length), feature);
        }
      }
    }

    // A footnote facet covers a one-character marker in the text. Swap the
    // marker for a numbered link to the note.
    const footnote = features.get("footnote");
    if (footnote && footnotes) {
      const isFirstPiece = covering.some(
        (facet) =>
          facet.features.includes(footnote) &&
          clamp(facet.index.byteStart) === start,
      );
      if (isFirstPiece) {
        const number = footnotes.length + 1;
        footnotes.push({
          number,
          // A trailing line break would push the note's "↩" link onto a
          // line of its own.
          html: renderRichText(
            footnote.contentPlaintext,
            footnote.contentFacets,
          ).replace(/(?:<br>)+$/, ""),
        });
        html += `<sup><a href="#fn-${number}" id="fnref-${number}" aria-label="Footnote ${number}">${number}</a></sup>`;
      }
      continue;
    }

    let piece = escapeHtml(decoder.decode(bytes.subarray(start, end)));
    piece = piece.replaceAll("\n", "<br>");
    for (const [name, tag] of INLINE_TAGS) {
      if (features.has(name)) piece = `<${tag}>${piece}</${tag}>`;
    }

    const mention = features.get("didMention");
    const href =
      safeHref(features.get("link")?.uri) ??
      (mention?.did
        ? `https://bsky.app/profile/${encodeURIComponent(mention.did)}`
        : undefined);
    if (href) piece = `<a href="${escapeHtml(href)}">${piece}</a>`;

    html += piece;
  }
  return html;
}

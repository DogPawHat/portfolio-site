// The parts of the standard.site and Leaflet record shapes that this site
// reads. Everything is optional-tolerant because the records come from the
// network.

export interface PdsRecord<T> {
  uri: string;
  cid: string;
  value: T;
}

export interface StandardPublication {
  url: string;
  name: string;
  description?: string;
}

export interface StandardDocument {
  site: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  path?: string;
  description?: string;
  tags?: string[];
  bskyPostRef?: { uri: string; cid: string };
  content?: LeafletContent | { $type: string };
}

export interface LeafletContent {
  $type: "pub.leaflet.content";
  pages: LeafletPage[];
}

export interface LeafletPage {
  $type: string;
  id?: string;
  blocks?: { block: LeafletBlock }[];
}

export interface BlobRef {
  $type: "blob";
  mimeType: string;
  ref: { $link: string };
}

export interface Facet {
  index: { byteStart: number; byteEnd: number };
  features: FacetFeature[];
}

export interface FacetFeature {
  $type: string;
  uri?: string;
  did?: string;
  footnoteId?: string;
  contentPlaintext?: string;
  contentFacets?: Facet[];
}

export interface LeafletListItem {
  content?: LeafletBlock;
  checked?: boolean;
  children?: LeafletListItem[];
}

/** One loose shape for every block; `$type` says which fields are present. */
export interface LeafletBlock {
  $type: string;
  plaintext?: string;
  facets?: Facet[];
  level?: number;
  language?: string;
  image?: BlobRef;
  alt?: string;
  aspectRatio?: { width: number; height: number };
  children?: LeafletListItem[];
  startIndex?: number;
  id?: string;
  src?: string;
  title?: string;
  description?: string;
  previewImage?: BlobRef;
}

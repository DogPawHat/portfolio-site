// Plain-fetch access to the blog's atproto records. This file has no Astro
// imports so the Netlify scheduled function can share it.
import { createHash } from "node:crypto";
import type { PdsRecord, StandardDocument, StandardPublication } from "./types";

/** The Leaflet publication ("Dublin Tech Musings") this site renders. */
export const BLOG = {
  did: "did:plc:ouf3tlvrji6zhxh6jdzgecup",
  publicationRkey: "3mk42l4ennc2a",
} as const;

const PUBLICATION_URI = `at://${BLOG.did}/site.standard.publication/${BLOG.publicationRkey}`;

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: { accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} from ${url}`);
  }
  return (await response.json()) as T;
}

interface DidDocument {
  service?: { id: string; type: string; serviceEndpoint: string }[];
}

let pdsPromise: Promise<string> | undefined;

/**
 * Look up which PDS currently hosts the account, so the site keeps working if
 * the account moves to another server.
 */
function resolvePds(did: string = BLOG.did): Promise<string> {
  pdsPromise ??= (async () => {
    const url = did.startsWith("did:web:")
      ? `https://${decodeURIComponent(did.slice("did:web:".length))}/.well-known/did.json`
      : `https://plc.directory/${did}`;
    const doc = await fetchJson<DidDocument>(url);
    const pds = doc.service?.find(
      (service) =>
        service.id.endsWith("#atproto_pds") ||
        service.type === "AtprotoPersonalDataServer",
    );
    if (!pds) throw new Error(`No PDS listed in the DID document for ${did}`);
    return pds.serviceEndpoint.replace(/\/+$/, "");
  })();
  return pdsPromise;
}

async function listRecords<T>(
  pds: string,
  collection: string,
): Promise<PdsRecord<T>[]> {
  const records: PdsRecord<T>[] = [];
  let cursor: string | undefined;
  do {
    const query = new URLSearchParams({
      repo: BLOG.did,
      collection,
      limit: "100",
    });
    if (cursor) query.set("cursor", cursor);
    const page = await fetchJson<{ cursor?: string; records: PdsRecord<T>[] }>(
      `${pds}/xrpc/com.atproto.repo.listRecords?${query}`,
    );
    records.push(...page.records);
    cursor = page.records.length > 0 ? page.cursor : undefined;
  } while (cursor);
  return records;
}

/** Every document that belongs to the publication, in no particular order. */
export async function fetchDocuments(): Promise<PdsRecord<StandardDocument>[]> {
  const pds = await resolvePds();
  const records = await listRecords<StandardDocument>(
    pds,
    "site.standard.document",
  );
  return records.filter((record) => record.value.site === PUBLICATION_URI);
}

export async function fetchPublication(): Promise<StandardPublication> {
  const pds = await resolvePds();
  const query = new URLSearchParams({
    repo: BLOG.did,
    collection: "site.standard.publication",
    rkey: BLOG.publicationRkey,
  });
  const record = await fetchJson<PdsRecord<StandardPublication>>(
    `${pds}/xrpc/com.atproto.repo.getRecord?${query}`,
  );
  return record.value;
}

export async function blobUrl(cid: string): Promise<string> {
  const pds = await resolvePds();
  const query = new URLSearchParams({ did: BLOG.did, cid });
  return `${pds}/xrpc/com.atproto.sync.getBlob?${query}`;
}

export function rkeyOf(uri: string): string {
  return uri.slice(uri.lastIndexOf("/") + 1);
}

/**
 * A fingerprint of the published posts. It changes whenever a post is added,
 * edited or removed, which is how the scheduled function knows to rebuild.
 */
export function versionOf(records: { uri: string; cid: string }[]): string {
  const lines = records
    .map((record) => `${rkeyOf(record.uri)}:${record.cid}`)
    .sort();
  return createHash("sha256").update(lines.join("\n")).digest("hex");
}

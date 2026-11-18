// Runs hourly on Netlify. If the posts on the PDS differ from the ones in the
// live site, it triggers a new build through a Netlify build hook.
//
// Setup: create a build hook (Site configuration → Build & deploy → Build
// hooks) and save its URL as the BLOG_BUILD_HOOK_URL environment variable.
import { fetchDocuments, versionOf } from "../../src/lib/leaflet/pds";

export default async () => {
  const hook = process.env.BLOG_BUILD_HOOK_URL;
  if (!hook) {
    console.log("BLOG_BUILD_HOOK_URL is not set; skipping.");
    return;
  }

  const site = process.env.URL ?? "https://dogpawhat.tech";
  const live = await fetch(`${site}/blog/version.json`);
  if (!live.ok) {
    // Don't rebuild in a loop if the live site can't tell us its version.
    console.log(`Could not read the live version (${live.status}); skipping.`);
    return;
  }
  const { version: liveVersion } = (await live.json()) as { version: string };
  const pdsVersion = versionOf(await fetchDocuments());

  if (liveVersion === pdsVersion) {
    console.log("Blog is up to date.");
    return;
  }
  const triggered = await fetch(hook, { method: "POST" });
  console.log(`Posts changed; build hook responded ${triggered.status}.`);
};

export const config = { schedule: "@hourly" };

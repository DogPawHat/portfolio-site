import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
// @ts-check
import { defineConfig } from "astro/config";

// A blog post is reachable by its Leaflet record key (13 characters) as well
// as its title slug. Those pages only forward, so keep them out of the sitemap.
const RECORD_KEY_PAGE = /\/blog\/[2-7a-z]{13}\/$/;

/**
 * Astro builds each record-key address as a small forwarding page. On Netlify,
 * also list them in `_redirects` so they are served as real 301 redirects.
 * @returns {import("astro").AstroIntegration}
 */
function netlifyBlogRedirects() {
  return {
    name: "netlify-blog-redirects",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const blogDir = fileURLToPath(new URL("blog/", dir));
        const rules = [];
        for (const name of await readdir(blogDir)) {
          if (!RECORD_KEY_PAGE.test(`/blog/${name}/`)) continue;
          const html = await readFile(`${blogDir}${name}/index.html`, "utf8");
          const target = html.match(
            /http-equiv="refresh" content="\d+;url=([^"]+)"/,
          )?.[1];
          if (target) rules.push(`/blog/${name} ${target} 301!`);
        }
        await writeFile(
          fileURLToPath(new URL("_redirects", dir)),
          `${rules.join("\n")}\n`,
        );
        logger.info(`Wrote ${rules.length} redirects to _redirects`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  site: "https://dogpawhat.tech",
  integrations: [
    mdx(),
    sitemap({ filter: (page) => !RECORD_KEY_PAGE.test(page) }),
    netlifyBlogRedirects(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});

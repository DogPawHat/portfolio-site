# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Primary: people evaluating Ciarán for work.** Recruiters, hiring managers, interviewers, and potential collaborators. They arrive from a CV, LinkedIn, an application or an intro, usually just before or during a conversation about a role. They want to know quickly who he is, what he's good at, what he has built, and how to get in touch.
- **Secondary: other developers.** Engineers who find the site through a blog post, Bluesky, GitHub or a talk. They come to read the writing and may follow along through RSS or Bluesky.

When the two conflict, hiring comes first. The writing supports the hiring case and does not compete with it.

## Product Purpose

This is the personal site of Ciarán Curley, a software engineer based in Dublin, Ireland, with 8+ years building web applications and a focus on TypeScript, React and modern web technologies.

Over the next year, success means:

1. **Getting contacted.** Visitors reach out by email or LinkedIn about roles, contracts or collaborations.
2. **Showing the work.** A projects / brag-sheet page shows real work and its impact.
3. **Getting the writing read.** Blog posts are found, shared and followed through RSS and Bluesky.

## Positioning

The site's claim is about one specific person, so a generic template can't make it. Its proof is first-hand technical writing from real experiments (React 19.2 `Activity`, MCP in Cursor on WSL) and the work Ciarán will list on the projects page. Its edge comes from his own voice and his real work, not from adjectives about skill.

## Operating Context

- Visitors usually come from a link: a CV, LinkedIn, a Bluesky post, a GitHub profile, a shared blog post or an RSS reader. Many arrive on a blog post rather than the home page.
- Hiring visitors often skim, sometimes on a phone and sometimes between interviews.
- Contact channels: email, Bluesky (`dogpawhat.tech`), GitHub (`dogpawhat`), LinkedIn (`dogpawhat`).

## Capabilities and Constraints

- **Stack:** Astro 7, Tailwind CSS 4 (with `@tailwindcss/typography`), MDX, `@astrojs/rss` and `@astrojs/sitemap`, built with Vite+ and pnpm. The output is a static site.
- **Domain:** `dogpawhat.tech`. `astro.config.mjs` still has `site: "https://example.com"`, so canonical, RSS and OG URLs are wrong until it's updated.
- **Routes:** home (`/`), blog index (`/blog`), blog posts (`/blog/[slug]`), RSS (`/rss.xml`).
- **Blog content collection:** `src/content/blog/`, with frontmatter fields title, description, pubDate, optional updatedDate and optional heroImage.
- **Planned (from TODO.md):** a bio on the home page, better links, and a projects / brag-sheet route.
- **Open:** which projects, employers, roles, talks and results appear on the projects page and in the bio. Ciarán will supply these.

## Brand Commitments

- **Name:** Ciarán Curley, always with the fada on the á. The handle is `dogpawhat`.
- **Blog content is off-limits.** Never edit, rewrite, retitle or "improve" the text or frontmatter of anything in `src/content/blog/`. Design work may change how posts are presented, but never the words.
- **Voice for new non-blog copy (bio, project write-ups):** not yet decided. Ask before writing it, and don't assume a register.

## Evidence on Hand

- Three published blog posts in `src/content/blog/`: "Well here we are now" (Mar 2025), "Best way to use MCP Servers with Cursor in WSL" (May 2025) and "Some notes on the React 19.2 Activity component" (Oct 2025).
- Bio facts already on the home page: based in Dublin, 8+ years building web applications, specialises in TypeScript, React and modern web tech.
- Public profiles: GitHub, Bluesky and LinkedIn (linked from `src/components/SocialLinks.astro`).
- Photo asset: `src/assets/park-path.jpg`.
- **Absent, and must not be made up:** projects, employers, job titles, clients, talks, metrics, testimonials and endorsements. These are placeholders until Ciarán provides them.

## Product Principles

1. **Hiring visitors first.** Who he is, what he does and how to reach him should be obvious within seconds, on any device.
2. **Real proof only.** Every claim must trace back to something real: a post, a repo, or work he has listed himself. Leave a gap visible rather than fill it with invented material.
3. **His words are his.** Blog content is never touched, and new copy in his name needs his sign-off.
4. **Contact is always one step away,** from every page, including blog posts reached from outside.
5. **The site is part of the portfolio.** Its performance, accessibility and code quality are evidence of his skills.

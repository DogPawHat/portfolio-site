---
name: Ciarán Curley
description: Personal site and blog of a Dublin software engineer, set against the local park he walks through.
colors:
  paper: "#f5f4e9"
  paper-sunk: "#e9e7d8"
  paper-bright: "#fdfcf7"
  ink: "#1e2414"
  ink-soft: "#535843"
  canopy: "#3b4823"
  tarmac: "#86806c"
  text-on-photo: "#ffffff"
  sky: "#005c9b"
  sky-deep: "#004077"
  sky-pale: "#b8e5ff"
typography:
  display:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "6rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  display-mobile:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  page-title:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  page-title-mobile:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  post-title:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "3rem"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.025em"
  post-title-mobile:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.111
    letterSpacing: "-0.025em"
  entry-title:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.333
  body-lead:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.778
  body-mobile:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.429
  photo-label:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  lg: "8px"
  2xl: "16px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
  4xl: "80px"
components:
  social-chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.full}"
    padding: "12px"
    size: "48px"
  social-chip-hover:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.paper-bright}"
  social-label:
    textColor: "{colors.text-on-photo}"
    typography: "{typography.photo-label}"
  social-label-hover:
    textColor: "{colors.sky-pale}"
  photo-link:
    textColor: "{colors.text-on-photo}"
  photo-link-hover:
    textColor: "{colors.sky-pale}"
  text-link:
    textColor: "{colors.sky}"
  text-link-hover:
    textColor: "{colors.sky-deep}"
  reading-panel:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.2xl}"
    padding: "40px 20px"
  post-entry-title:
    textColor: "{colors.ink}"
    typography: "{typography.entry-title}"
  post-entry-title-hover:
    textColor: "{colors.sky}"
  inset-surface:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
  link-card-hover:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
  code-block:
    backgroundColor: "{colors.paper-bright}"
    textColor: "{colors.ink}"
  inline-code:
    backgroundColor: "{colors.paper-sunk}"
    textColor: "{colors.ink}"
---

# Design System: Ciarán Curley

## Overview

**Creative North Star: "The Local Walk"**

The site opens on a photograph of Ciarán's local park in Dublin: a tarmac path curving between mown grass and tall trees, under autumn light with blue sky behind. He took it on one of his walks, and the rest of the site follows from it. The interface gets out of the way. Type sits directly on the photo, lifted off it by soft black text shadows, and the few UI surfaces are plain birch-bark paper. Nothing competes with the park.

The site is a homepage and a blog. The homepage sets its type straight on the photograph. The blog has an index and a page per post, and puts its long-form text on an opaque paper panel in front of the same photograph.

The feel is **calm, open and legible**. Density is low. A single left-aligned column holds a very large name, one paragraph, a link to the blog and a row of contact links, with plenty of photo visible around them. The typeface is Atkinson Hyperlegible, chosen for legibility rather than display flair, and it fits the mood: friendly, plain and readable at any size.

The supporting palette is sampled from the photograph: birch-bark paper for surfaces, the deep shade under the trees for ink, and the sky for the one interactive accent. The photograph is the authority. When the system grows, new color, mood and material should come from the park.

**Key Characteristics:**

- A full-bleed, fixed park photograph behind every page, as the site's single source of atmosphere.
- White type lifted off the photo by layered black text shadows; no scrims or panels behind short text.
- One typeface (Atkinson Hyperlegible) in regular and bold only.
- Light paper surfaces with dark ink text and a single sky-blue accent used for interaction.
- Left-aligned, single-column, generous margins; the photo shows through.

## Colors

A warm paper-and-ink UI palette with one sky-blue accent, all of it sampled from the photograph's birch bark, tree shade, tarmac and open sky. The tokens are authored in OKLCH in the stylesheet; the hex values in the frontmatter are their sRGB equivalents.

### Primary

- **Open Sky** (`sky`): The only accent hue. Used for inline links, the fill a social chip turns on hover, the hover color of post titles in the blog index, the hostname line on link cards, the text selection background and the scrollbar thumb on hover.
- **Deep Sky** (`sky-deep`): Hover color for inline links.
- **Pale Sky** (`sky-pale`): Hover tint for white links and labels that sit on the photo, which keeps them legible there.

### Neutral

- **Birch Paper** (`paper`): Opaque fill for the reading panels and the social chips. This is the main surface material.
- **Sunk Paper** (`paper-sunk`): Inset surfaces inside a panel: link cards, embedded sub-pages and inline code chips. Also horizontal rules, table row lines and the scrollbar track.
- **Bright Paper** (`paper-bright`): Code block background, the hover fill of a link card, the icon on a hovered social chip and selected text.
- **Shade Ink** (`ink`): Default text color on paper, and the icon color on social chips at rest.
- **Soft Ink** (`ink-soft`): Secondary text on paper: post descriptions, dates, tags, list counters and captions.
- **Canopy** (`canopy`): Body background. You only see it while the photo loads or wherever the photo doesn't reach.
- **Tarmac** (`tarmac`): List bullets, the rule beside a quote, table header lines and the scrollbar thumb.
- **Open White** (`text-on-photo`): Every piece of type that sits directly on the photograph.

### Named Rules

**The Park Is the Palette Rule.** The photograph sets the color mood, and every UI color is sampled from it: birch bark for paper, tree shade for ink and canopy, the path for tarmac, the sky for the accent. When a new color is needed (a second accent, a tag color, a highlight), sample it from the park first: grass green, shaded foliage, tarmac charcoal, birch-bark cream, autumn-leaf orange, open sky. Reach for a stock Tailwind hue only after that.

**The One Accent Rule.** Sky is the only saturated hue in the UI, and it means "interactive". Don't add a second accent without retiring sky or deriving the new one from the park.

## Typography

**Display Font:** Atkinson Hyperlegible, self-hosted as `Atkinson` (falling back to sans-serif)
**Body Font:** Atkinson Hyperlegible
**Character:** One humanist sans that does everything. It was designed for low-vision legibility, so it reads clearly over a busy photo, and it carries a plain, friendly voice instead of a portfolio-template polish. Only regular (400) and bold (700) are loaded, so any intermediate weight renders as one of the two. Both are self-hosted WOFF2 files; regular is preloaded on every page, bold only on the blog pages, since the home page sets no bold type. Code is set in the browser's monospace stack; no mono font is loaded.

### Hierarchy

- **Display** (400; 6rem on desktop, 3.75rem on mobile; line-height 1; tracking -0.025em): The name on the home page and nothing else. Its weight is regular, not bold, because the size does the work.
- **Page Title** (400; 4.5rem on desktop, 3rem on mobile; line-height 1; tracking -0.025em): The title of the blog index, set on the photo.
- **Post Title** (700; 3rem on desktop, 2.25rem on mobile; tracking -0.025em; balanced wrapping): The title of a post, at the top of its reading panel.
- **Entry Title** (700, 1.5rem, 1.333): Post titles in the blog index.
- **Body Lead** (400, 1.25rem, 1.4): The intro paragraph on the photo, capped at about 42rem wide, and the link to the blog under it. Also a post's description under its title, in Soft Ink.
- **Body** (400; 1.125rem with line-height 1.778 from `md`, 1rem with 1.75 below it): Long-form text on the reading panel. Phones get the smaller size so a line holds a sensible number of words in the narrower column.
- **Photo Label** (400, 1rem, 1.5): The labels under the social link chips. They sit straight on the photo, often over sunlit grass on a phone, so they get a step more size than Label.
- **Label** (400, 0.875rem, 1.429): The byline, date and tags under a post title, the dates in the blog index, and the small lines on link cards. Label type stays on paper; anything that small is too faint on the photo.

### Named Rules

**The Two Weights Rule.** Use only 400 and 700. Big type stays regular; bold is for headings that need weight at smaller sizes.

## Layout

There is one centered container, 72rem (1152px) wide, with 24px side and 48px vertical padding on mobile, rising to 64px and 80px from the `md` breakpoint (768px). Nearly every responsive change happens at that breakpoint. The one exception is the thumbnail on a link card, which appears from `sm` (640px).

- **Home:** One left-aligned column. The name, then a lead paragraph capped at about 42rem, then the link to the blog, then the social row (32px gaps, wrapping). Content starts at the top and the rest of the viewport is photograph.
- **Blog index:** A row of two links on the photo (back to the home page, and the RSS feed), the page title on the photo, then a paper panel holding the list of posts, then the social link chips on the photo. The panel is capped at 48rem and sits at the left edge of the container, so the photo stays visible beside it on wide screens.
- **Blog post:** A row of two links on the photo, spread across the panel's 48rem width, then the reading panel with the post's title, description, byline, date and tags above the text, then the social link chips on the photo so contact is one step away.

Links above a panel sit 32px clear of what follows, and the blog index title sits 40px above its panel. Below `md`, both panels reach out 12px past the container's 24px gutter (a negative side margin), so they sit 12px from the screen edge with a sliver of photo still showing on either side, while the text on the photo keeps the full 24px gutter. That gives a text column of 256px at a 320px screen and 311px at 375px. The reading panel has 20px side and 40px vertical padding on mobile, rising to 48px and 56px from `md`, where the panel sits flush with the container; the index panel has 20px and 16px, rising to 48px and 32px, with 24px above and below each entry.

The spacing rhythm follows Tailwind's 4px scale, using 8 / 12 / 16 / 24 / 32 / 40 / 48 / 56 / 64 / 80px. There is no site header, nav bar or footer. Each page is just the container on the photograph.

## Elevation & Depth

Depth comes from the photograph. The UI stays nearly flat on top of it. The photo is fixed to the viewport, so content scrolls over a still landscape. Short type is separated from the image with layered black text shadows; long-form text gets an opaque paper panel. Inside a panel, depth is tonal: Sunk Paper sits a step below the panel and Bright Paper a step above. There are no box shadows.

### Shadow Vocabulary

- **Photo Lift, strong** (Tailwind `text-shadow-lg` in black at 50–80%): The display name and the blog index title (50%), and the lead paragraph, the link to the blog and the social chip labels (80%). Longer or smaller text gets the heavier shadow; big type needs less.
- **Photo Lift, light** (Tailwind `text-shadow-md` in black at 60%): The links above a panel, which sit over the darker foliage at the top of the photo.

### Named Rules

**The Shadow-Lift Rule.** Any text sitting directly on the photograph carries a black text shadow. Text without one never touches the photo.

## Shapes

The shapes are soft and simple. Interactive icons sit in perfect circles (`rounded.full`). Reading panels have generously rounded corners (16px), and the surfaces and images inside them have gentler ones (8px). Inline code sits in a small chip with 0.3em corners. Surfaces have no borders. The only lines are inside long-form text: horizontal rules and table row lines in Sunk Paper, and the rule beside a quote and under a table header in Tarmac.

## Components

### Social Link Chips (signature)

A row of round paper buttons, each with a small label underneath. This is the site's main call to action.

- **Shape:** A circle, 48px across, holding a 24px Lucide-style stroke icon (or the custom Bluesky mark).
- **Rest:** A Birch Paper fill with a Shade Ink icon. The label below is Open White in Photo Label type with the strong Photo Lift shadow (black at 80%), so it holds up where the chips land on bright grass on a phone.
- **Hover:** The fill turns Open Sky, the icon turns Bright Paper and the label tints to Pale Sky. The colors transition over 150ms with the standard ease.
- **Focus:** The shared white focus ring around the whole link (see Focus and Selection).
- **Set:** Email, Bluesky, GitHub and LinkedIn, in that order.

### Reading Panel

The opaque paper surface that carries anything longer than a short paragraph.

- **Shape:** Birch Paper with 16px corners, capped at 48rem wide, no border and no shadow.
- **Post header:** The Post Title in Shade Ink, the description in Body Lead and Soft Ink, then one meta line in Label type and Soft Ink: "By Ciarán Curley · date · tags".
- **Byline:** Many visitors land on a post from a shared link, and on a phone the page title is the only other place the name appears. So the name sits in the meta line, linking to the home page (`rel="author"`), as an underlined Open Sky link that darkens to Deep Sky on hover. It sits on paper rather than in the link row on the photo, so it stays legible and reads as a byline rather than navigation, and it is always in the first phone viewport. The name and the date never break inside themselves; long tag lists wrap after them. Like the links on the photo, it carries a 44px tap area (see Tap Areas). The 16px gap above the line keeps that box clear of the description.
- **Text:** Tailwind Typography (`prose md:prose-lg`, uncapped inside the panel: 16px body below `md`, 18px from it) with its colors remapped to the palette: body, headings, bold text and quotes in Shade Ink; counters and captions in Soft Ink; bullets and the quote rule in Tarmac; horizontal rules in Sunk Paper; links in Open Sky.
- **Images:** 8px corners, at the size Leaflet records so nothing shifts as they load. Alt text comes from the post on Leaflet and is never written by the site.
- **Animated images:** At build time the site reads each post image and, if it has more than one frame (an animated GIF, WebP, AVIF or PNG), saves its first frame as a WebP of the same size. Readers who set `prefers-reduced-motion: reduce` get that still frame through a `<picture>` source, even without JavaScript. Under every animated image sits a pause button in Label type and Open Sky (Deep Sky on hover), with a 16px Lucide pause or play icon and the label "Pause animation" or "Play animation". It switches between the animation and the still for anyone, starts paused for reduced-motion readers, and has a 44px-tall tap area whose lower 12px overlaps the gap below. Without JavaScript the button stays hidden, so there is never a control that does nothing.
- **Footnotes:** A numbered list at the end of the post, after a horizontal rule, in 0.875rem type below `md` and 1rem from it. Footnote markers inside headings are set at half the heading's size.
- **Footnote tap targets:** A footnote marker or a "↩" back-link is only a few pixels wide, so each carries an invisible, absolutely positioned `::after` box, 32px square and centred on it. It widens the tap area without moving the text or changing the line height. Where that box overlaps a neighbouring link, the link wins: other links in the text sit one layer above it (`position: relative; z-index: 1`).
- **Wrapping:** Long-form text uses `overflow-wrap: anywhere`, so bare URLs (common in footnotes) and long inline code break to fit the column instead of pushing the page sideways. Paragraphs and list items use `text-wrap: pretty` and headings `text-wrap: balance`, which matters most in the phone-width column. Code blocks are the exception: they never wrap and scroll inside their own box.

### Post List

The blog index: a Reading Panel holding one entry per post, with no dividers between them.

- **Entry:** The Entry Title in Shade Ink (balanced wrapping), the description at 1.125rem in Soft Ink, and the date in Label type and Soft Ink. The whole entry is one link.
- **Hover:** The title turns Open Sky over 150ms.

### Inset Surfaces

Sunk Paper blocks with 8px corners that sit inside a Reading Panel.

- **Link card:** A link to another site, showing a bold title, up to two lines of description in Label type and Soft Ink, and the hostname in Label type and Open Sky. A 160px thumbnail sits on the right from `sm` up. On hover the fill lifts to Bright Paper over 150ms and the text stays Shade Ink.
- **Sub-page:** An embedded page from the post, set as an aside with the same text styles as the panel around it.

### Code

- **Block:** Bright Paper background with the Shiki theme `github-light-high-contrast` for syntax colors. Set at 14px below `md` and 16px from it; long lines scroll sideways inside the block rather than wrapping.
- **Inline:** A Sunk Paper chip (0.3em corners, 0.15em by 0.35em padding) in Shade Ink at 0.875em and weight 400, with no backticks around it.

### Links

- **Inline:** Open Sky, darkening to Deep Sky on hover (set globally on `a`). Inside long-form text they are underlined.
- **On the photo:** Open White with a Photo Lift shadow, tinting to Pale Sky on hover over 150ms. The link to the blog on the home page is this at Body Lead size, underlined with a 4px offset. These links carry a 44px tap area (see Tap Areas).

### Navigation

There is no persistent header, nav or footer. The blog pages carry plain text links on the photo above their panel, at 1rem with the light Photo Lift shadow: back to the home page and out to the RSS feed on the index, and back to the index and out to the post's Leaflet original on a post. Each link carries a 44px tap area (see Tap Areas). The social link chips close every page.

### Tap Areas

Text links are drawn at their text size, but a thumb needs more. Two kinds of invisible `::after` box widen their hit areas without moving any layout or stretching the focus ring, which still hugs the text:

- **Short text links** (the links above a panel, the link to the blog, the byline) use the `tap-area` utility in `global.css`: a box as wide as the link and at least 44px tall, centred on it. Leave room above and below such a link for the box to reach without covering its neighbour.
- **Footnote markers and "↩" back-links** sit inside running text, so they get a 32px square instead (see Reading Panel).

The pause button under an animated image gets its height from `min-height` instead, and the social chips and the whole-entry links in the blog index are already taller than 44px.

### Focus and Selection

- **Focus:** Every focusable element gets a 2px outline in its own text color, offset by 3px, with 2px corners. That makes the ring white on the photo and Open Sky around a link on paper.
- **Selection:** An Open Sky background with Bright Paper text.
- **Scrollbar:** A Tarmac thumb on a Sunk Paper track; the thumb turns Open Sky on hover.

## Do's and Don'ts

### Do:

- **Do** treat the park photograph as the site's atmosphere: full-bleed, fixed, anchored to the top (`background-position: top`), and served as AVIF (quality 50) through `image-set()`, with a WebP (quality 60) fallback declared first for browsers that can't parse it. Keep the full 2000px width: on a portrait phone `cover` scales the photo to the screen height, so savings come from encoding, not dimensions.
- **Do** put a black text shadow under every piece of type that sits directly on the photograph (The Shadow-Lift Rule).
- **Do** move text that runs longer than a short paragraph onto an opaque Birch Paper panel, so it stays legible over grass and foliage.
- **Do** keep to Atkinson Hyperlegible in weights 400 and 700.
- **Do** sample any new color from the park before reaching for a stock hue (The Park Is the Palette Rule).
- **Do** keep every page left-aligned and single-column, with plenty of photograph visible around it.
- **Do** step surfaces inside a panel down to Sunk Paper or up to Bright Paper instead of adding borders or shadows.

### Don't:

- **Don't** cover the photograph with full-page panels, dark overlays or gradients that hide the park.
- **Don't** add a second accent hue next to sky (The One Accent Rule).
- **Don't** use font weights other than 400 and 700; Atkinson has no other weights loaded.
- **Don't** set long-form text directly on the photograph without a surface behind it.

---
name: Ciarán Curley
description: Personal site and blog of a Dublin software engineer, set against the local park he walks through.
colors:
  bg-primary: "#111827"
  bg-secondary: "#1f2937"
  rule: "#374151"
  border: "#4b5563"
  text-secondary: "#9ca3af"
  text-muted-light: "#d1d5db"
  text-primary: "#f9fafb"
  text-on-photo: "#ffffff"
  accent: "#818cf8"
  accent-dark: "#6366f1"
  accent-deep: "#4f46e5"
  accent-pale: "#c7d2fe"
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
  headline:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 700
    lineHeight: 1.111
  headline-section:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.4
  body-lead:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.4
  body-prose:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.778
  body:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Atkinson, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.429
rounded:
  lg: "8px"
  xl: "12px"
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
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.full}"
    padding: "12px"
    size: "48px"
  social-chip-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.text-on-photo}"
  social-label:
    textColor: "{colors.text-on-photo}"
    typography: "{typography.label}"
  social-label-hover:
    textColor: "{colors.accent-pale}"
  text-link:
    textColor: "{colors.accent}"
  text-link-hover:
    textColor: "{colors.accent-dark}"
  post-card:
    backgroundColor: "{colors.bg-secondary}"
    textColor: "{colors.text-muted-light}"
    rounded: "{rounded.lg}"
    padding: "24px"
  post-card-title:
    textColor: "{colors.text-on-photo}"
    typography: "{typography.title}"
  post-card-date:
    textColor: "{colors.accent}"
    typography: "{typography.label}"
  post-hero-image:
    rounded: "{rounded.xl}"
    height: "400px"
---

# Design System: Ciarán Curley

## Overview

**Creative North Star: "The Local Walk"**

The site opens on a photograph of Ciarán's local park in Dublin: a tarmac path curving between mown grass and tall trees, under autumn light with blue sky behind. He took it on one of his walks, and the rest of the site follows from it. The interface gets out of the way. Type sits directly on the photo, lifted off it by soft black text shadows, and the few UI surfaces are plain dark slate. Nothing competes with the park.

The feel is **calm, open and legible**. Density is low. A single left-aligned column holds a very large name, one paragraph and a row of contact links, with plenty of photo visible around them. The typeface is Atkinson Hyperlegible, chosen for legibility rather than display flair, and it fits the mood: friendly, plain and readable at any size.

The dark slate and indigo supporting palette came with the site's starter template. It is the current UI palette and stays coherent for now, but the photograph is the authority. When the system grows, new color, mood and material should come from the park.

**Key Characteristics:**
- A full-bleed, fixed park photograph behind every page, as the site's single source of atmosphere.
- White type lifted off the photo by layered black text shadows; no scrims or panels behind short text.
- One typeface (Atkinson Hyperlegible) in regular and bold only.
- Dark slate surfaces with a single indigo accent used for interaction and dates.
- Left-aligned, single-column, generous margins; the photo shows through.

## Colors

A quiet cool-slate UI palette with one indigo accent, set against the photograph's saturated greens, tarmac grays and sky blue.

### Primary
- **Dusk Indigo** (`accent`): The only accent hue. Used for inline links, post dates and the hover tint on interactive elements. It reads as dusk sky against the slate.
- **Deep Indigo** (`accent-dark`): Hover color for inline links.
- **Indigo Ink** (`accent-deep`): The fill a social chip turns on hover. This is the strongest saturated color the UI uses.
- **Indigo Haze** (`accent-pale`): Hover tint for the labels under the social chips, which keeps them legible on the photo.

### Neutral
- **Night Slate** (`bg-primary`): Body background. You only see it while the photo loads or wherever the photo doesn't reach.
- **Slate Surface** (`bg-secondary`): Opaque fill for social chips and post cards. This is the one surface material.
- **Slate Rule** (`rule`): The hairline under a blog post's header.
- **Slate Border** (`border`): Scrollbar thumb.
- **Mist Gray** (`text-secondary`): Icons at rest, and post metadata on article pages.
- **Pale Mist** (`text-muted-light`): Post excerpt text on cards.
- **Paper White** (`text-primary`): Default body text color.
- **Open White** (`text-on-photo`): Every piece of type that sits directly on the photograph, plus card titles.

### Named Rules
**The Park Is the Palette Rule.** The photograph sets the color mood. When a new color is needed (a second accent, a tag color, a highlight), sample it from the park first: grass green, shaded foliage, tarmac charcoal, birch-bark cream, autumn-leaf orange, open sky. Reach for another stock Tailwind hue only after that.

**The One Accent Rule.** Indigo is the only saturated hue in the UI, and it means "interactive" or "date". Don't add a second accent without retiring indigo or deriving the new one from the park.

## Typography

**Display Font:** Atkinson Hyperlegible, self-hosted as `Atkinson` (falling back to sans-serif)
**Body Font:** Atkinson Hyperlegible
**Label/Mono Font:** The Tailwind Typography default monospace stack, inside blog post code blocks only

**Character:** One humanist sans that does everything. It was designed for low-vision legibility, so it reads clearly over a busy photo, and it carries a plain, friendly voice instead of a portfolio-template polish. Only regular (400) and bold (700) are loaded, so any intermediate weight renders as one of the two.

### Hierarchy
- **Display** (400; 6rem on desktop, 3.75rem on mobile; line-height 1; tracking -0.025em): The name on the home page and nothing else. Its weight is regular, not bold, because the size does the work.
- **Headline** (700, 2.25rem, 1.111): Blog post titles.
- **Headline Section** (700, 1.875rem, 1.2): Page headings such as "Blog".
- **Title** (700, 1.25rem, 1.4): Post card titles.
- **Body Lead** (400, 1.25rem, 1.4): The intro paragraph on the photo, capped at about 42rem wide.
- **Body Prose** (400, 1.125rem, 1.778): Blog post body, set with Tailwind Typography's inverted large prose inside a 48rem reading column.
- **Body** (400, 1rem, 1.5): Card excerpts, clamped to three lines.
- **Label** (400, 0.875rem, 1.429): Social link labels and dates.

### Named Rules
**The Two Weights Rule.** Use only 400 and 700. Big type stays regular; bold is for headings that need weight at smaller sizes.

## Layout

There is one centered container, 72rem (1152px) wide, with 24px side and 48px vertical padding on mobile, rising to 64px and 80px from the `md` breakpoint (768px). That is the only breakpoint the site uses.

- **Home:** One left-aligned column. The name, then a lead paragraph capped at about 42rem, then the social row (32px gaps, wrapping). Content starts at the top and the rest of the viewport is photograph.
- **Blog index:** A section heading, then a grid of post cards: one column on mobile, two from `md`, with 24px gutters.
- **Blog post:** The hero image spans the full container, capped at 400px tall. Below it, a centered 48rem reading column holds a centered header block (date, title, hairline rule), then the prose.

The spacing rhythm follows Tailwind's 4px scale, using 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80px. There is no site header, nav bar or footer. Each page is just the container on the photograph.

## Elevation & Depth

Depth comes from the photograph. The UI stays nearly flat on top of it. The photo is fixed to the viewport, so content scrolls over a still landscape. Type is separated from the image with layered black text shadows instead of panels. The only box shadows are a soft lift under post cards, which grows on hover, and under the blog post hero image.

### Shadow Vocabulary
- **Photo Lift, strong** (Tailwind `text-shadow-lg` in black at 50–80%): The display name (50%) and the lead paragraph (80%). Longer text gets the heavier shadow.
- **Photo Lift, light** (Tailwind `text-shadow-md` in black at 60%): Small labels on the photo.
- **Card Rest** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): Post cards and the post hero image.
- **Card Hover** (`box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)`): A post card on hover, easing in over 300ms.

### Named Rules
**The Shadow-Lift Rule.** Any text sitting directly on the photograph carries a black text shadow. Text without one never touches the photo.

## Shapes

The shapes are soft and simple. Interactive icons sit in perfect circles (`rounded.full`). Content containers have gently rounded corners: 8px on cards and 12px on the larger post hero image. Images are cropped with `object-fit: cover`. There are no visible borders on surfaces; the only line is the hairline rule under a post header.

## Components

### Social Link Chips (signature)
A row of round slate buttons, each with a small label underneath. This is the site's main call to action.
- **Shape:** A circle, 48px across, holding a 24px Lucide-style stroke icon (or the custom Bluesky mark).
- **Rest:** A Slate Surface fill with a Mist Gray icon. The label below is Open White in Label type with the light Photo Lift shadow.
- **Hover:** The fill turns Indigo Ink, the icon turns white and the label tints to Indigo Haze. The colors transition over 150ms with the standard ease.
- **Focus:** Browser default; there is no custom focus style yet.
- **Set:** Email, Bluesky, GitHub and LinkedIn, in that order.

### Post Cards
- **Corner Style:** Gently rounded (8px), with the image clipped to the corners.
- **Background:** Slate Surface, opaque, so the excerpt text never sits on the photograph.
- **Shadow Strategy:** Card Rest, rising to Card Hover (see Elevation & Depth).
- **Border:** None.
- **Internal Padding:** 24px below a 192px-tall cover image.
- **Content:** A Title in Open White, the date in Dusk Indigo (Label), and the excerpt in Pale Mist, clamped to three lines. The whole card is one link.

### Links
- **Inline:** Dusk Indigo, darkening to Deep Indigo on hover. Underlining inside prose follows the Typography plugin defaults.

### Navigation
None. There is no persistent header, nav or footer. Pages are reached by direct links.

### Blog Post Header
A centered block containing the date (Mist Gray) with an italic "Last updated" line when one applies, then the Headline title, then a Slate Rule hairline. It sits above the inverted large prose column.

## Do's and Don'ts

### Do:
- **Do** treat the park photograph as the site's atmosphere: full-bleed, fixed, anchored to the top (`background-position: top`), and served as compressed WebP.
- **Do** put a black text shadow under every piece of type that sits directly on the photograph (The Shadow-Lift Rule).
- **Do** move text that runs longer than a short paragraph onto an opaque Slate Surface, as the post cards do, so it stays legible over grass and foliage.
- **Do** keep to Atkinson Hyperlegible in weights 400 and 700.
- **Do** sample any new color from the park before reaching for a stock hue (The Park Is the Palette Rule).
- **Do** keep the home page left-aligned and single-column, with plenty of photograph visible around it.

### Don't:
- **Don't** cover the photograph with full-page panels, dark overlays or gradients that hide the park.
- **Don't** add a second accent hue next to indigo (The One Accent Rule).
- **Don't** use font weights other than 400 and 700; Atkinson has no other weights loaded.
- **Don't** set long-form text directly on the photograph without a surface behind it.

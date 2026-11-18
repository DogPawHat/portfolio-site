import { defineCollection } from "astro:content";
import { leafletLoader } from "./lib/leaflet/loader";

// Blog posts are written on Leaflet and read from the PDS at build time.
const blog = defineCollection({ loader: leafletLoader() });

export const collections = { blog };

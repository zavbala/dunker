import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://dunker.app",
  integrations: [tailwind(), sitemap(), mdx(), react()],
  adapter: vercel({ webAnalytics: { enabled: true } }),
});

import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import { defineConfig } from "astro/config";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://dunker.app",
  integrations: [tailwind(), sitemap(), mdx(), react(), svelte()],
  adapter: vercel({
    webAnalytics: {
      enabled: true
    }
  })
});
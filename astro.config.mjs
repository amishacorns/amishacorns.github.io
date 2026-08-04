import { defineConfig } from "astro/config"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"

// https://astro.build/config
export default defineConfig({
  site: "https://www.jordandotzel.com",
  integrations: [sitemap(), solidJs(), tailwind({ applyBaseStyles: false })],
})

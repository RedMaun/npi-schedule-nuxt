// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // ...
    "@pinia/nuxt",
    "nuxt-pdfmake",
    "@vite-pwa/nuxt",
  ],
  plugins: ["~/plugins/font-awesome.js", "~/plugins/gesture.js"],
  css: ["~/assets/css/main.css"],
  pwa: {
    strategies: "injectManifest",
  },
  ssr: false,
});

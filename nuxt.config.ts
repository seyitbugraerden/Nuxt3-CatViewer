export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "shadcn-nuxt"],

  shadcn: {
    prefix: "",

    componentDir: "./components/ui",
  },

  vite: {
    server: {
      proxy: {
        "/api": {
          target: `${process.env.CATAPI_URL}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/login": {
          target: `${process.env.POCKETHOST_URL}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/login/, ""),
        },
      },
    },
  },
});

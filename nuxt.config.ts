// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxt/content"],
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },
  devtools: { enabled: true },
  devServer: {},
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  alias: {
    "@static": "/static",
  },
  plugins: [],
  css: ["~/static/css/default.css"],
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({ importStyle: false, resolveIcons: true }),
        ],
      }),
    ],
    ssr: {
      noExternal: ["ant-design-vue"],
    },
  },
});

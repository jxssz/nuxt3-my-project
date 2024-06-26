// https://nuxt.com/docs/api/configuration/nuxt-config
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { defineNuxtConfig } from "nuxt/config";

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
  plugins: ["@/plugins/prism.js"],
  css: ["@static/css/default.css", "@static/editor/editor.css"],
  vite: {
    plugins: [
      Components({
        resolvers: [
          AntDesignVueResolver({ importStyle: false, resolveIcons: false }),
        ],
      }),
    ],
    ssr: {
      noExternal: ["ant-design-vue"],
    },
  },
  runtimeConfig: {
    // // 私有环境变量（仅在服务器端可用）
    // apiBase: "http://api.jxihub.cn",
    // // 公共环境变量（在客户端和服务器端都可用）
    public: {
      apiBase: process.env.BASE_URL,
      apiUpload: process.env.UPLOAD,
      static: process.env.STATIC,
      // baseUrl: process.env.BASE_URL,
    },
  },
  nitro: {
    // devProxy: {
    //   "/api": {
    //     target: "http://127.0.0.1:8080/api",
    //     prependPath: true,
    //     changeOrigin: true,
    //   },
    // },
    // routeRules: {
    //   "/api/": {
    //     proxy: "http://api.jxihub.cn/",
    //   },
    // },
  },
});

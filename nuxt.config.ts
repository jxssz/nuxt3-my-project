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
  runtimeConfig: {
    // // 私有环境变量（仅在服务器端可用）
    // apiBase: "http://api.jxihub.cn",
    // // 公共环境变量（在客户端和服务器端都可用）
    public: {
      apiBase: 'https://api.jxihub.cn',
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://127.0.0.1:8080/api",
        prependPath: true,
        changeOrigin: true,
      },
    },
    // routeRules: {
    //   "/api/": {
    //     proxy: "http://api.jxihub.cn/",
    //   },
    // },
  },
});

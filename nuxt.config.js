const bodyParser = require("body-parser");
const axios = require("axios");

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: "universal",
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: "server",
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: "Nuxt blog",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
      }
    ]
  },
  loading: { color: "red", height: "5px", duration: 5000 },
  /*
   ** Global CSS
   */
  css: [
    // '~assets/styles/main.css'
  ],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {},
  env: {
    baseUrl: process.env.BASE_URL || "https://nuxt-blog-3fefa.firebaseio.com",
    fbAPIKey: "AIzaSyCIlUV0briUnhmfaXtJ1BRfs4fDmACZBa4"
  },
  router: {
    middleware: "log"
  },
  serverMiddleware: [bodyParser.json(), "~/api"],
  generate: {
    routes: function() {
      return axios
        .get("https://nuxt-blog-3fefa.firebaseio.com/posts.json")
        .then(res => {
          const routes = [];
          for (const key in res.data) {
            routes.push('/posts/' + key)
          }
          return routes
        });
    }
  }
};

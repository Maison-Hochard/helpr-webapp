import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: "fade",
      mode: "out-in"
    },
  },

  css: ["~/assets/style/main.scss"],

  build: {
    transpile: ["@heroicons/vue"],
  },

  modules: [
    "nuxt-icon",
    "@nuxt/image-edge",
    "nuxt-headlessui",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt"
  ],

  runtimeConfig: {
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      jwtSecret: process.env.JWT_SECRET
    },
    public: {
      appDomain: process.env.FRONTEND_URL,
      appEnv: process.env.APP_ENV,
      apiUrl: process.env.API_URL
    }
  },

  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "fr"],
      messages: {
        en,
        fr
      }
    }
  },

  image: {
    dir: "assets/media"
  }
});

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

  routeRules: {
    "/**": { cors: true },
  },

  modules: [
    "nuxt-icon",
    "@nuxt/image-edge",
    "nuxt-headlessui",
    "@nuxtjs/i18n",
    "@nuxtjs/tailwindcss",
    "@vueuse/nuxt",
    "nuxt-mailer",
    "@pinia/nuxt"
  ],

  imports: {
    dirs: ["store"],
  },

  runtimeConfig: {
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASSWORD,
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      authSecret: process.env.AUTH_TOKEN_SECRET
    },
    public: {
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackUrl: process.env.GITHUB_CALLBACK_URL
      },
      linear: {
        clientId: process.env.LINEAR_CLIENT_ID,
        clientSecret: process.env.LINEAR_CLIENT_SECRET,
        callbackUrl: process.env.LINEAR_CALLBACK_URL
      },
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

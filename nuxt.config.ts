import en from "./locales/en.json";
import fr from "./locales/fr.json";

export default defineNuxtConfig({
  app: {
    layoutTransition: { name: "layout", mode: "out-in" },
    pageTransition: {
      name: "fade",
      mode: "out-in",
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
    "@vueuse/nuxt",
    "nuxt-mailer",
    "@pinia/nuxt",
    "@nuxt/content",
    "@nuxtjs/supabase",
  ],

  imports: {
    dirs: ["store"],
  },

  runtimeConfig: {
    mailerUser: process.env.MAILER_USER,
    mailerPass: process.env.MAILER_PASSWORD,
    private: {
      stripeSecretKey: process.env.STRIPE_SECRET_KEY,
      authSecret: process.env.AUTH_TOKEN_SECRET,
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    },
    public: {
      googleClientId: process.env.GOOGLE_CLIENT_ID,
      github: {
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackUrl: process.env.GITHUB_CALLBACK_URL,
      },
      linear: {
        clientId: process.env.LINEAR_CLIENT_ID,
        clientSecret: process.env.LINEAR_CLIENT_SECRET,
        callbackUrl: process.env.LINEAR_CALLBACK_URL,
      },
      appDomain: process.env.FRONTEND_URL,
      appEnv: process.env.APP_ENV,
      apiUrl: process.env.API_URL,
    },
  },

  i18n: {
    vueI18n: {
      legacy: false,
      locale: "en",
      fallbackLocale: "en",
      availableLocales: ["en", "fr"],
      messages: {
        en,
        fr,
      },
    },
  },

  image: {
    alias: {
      supabase: "https://uynsrkwqyplqhfrmdaqw.supabase.co/storage/v1/object/public",
    },
    domains: ["uynsrkwqyplqhfrmdaqw.supabase.co"],
    dir: "assets/media",
  },
});

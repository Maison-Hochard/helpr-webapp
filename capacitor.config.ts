import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.helpr.app",
  appName: "helpr",
  webDir: ".output/public",
  bundledWebRuntime: false,
  server: {
    hostname: "helpr-api-production.up.railway.app",
    androidScheme: "https",
    iosScheme: "https",
    url: "https://www.helprapp.fr",
    cleartext: true,
  },
  android: {
    allowMixedContent: true,
  },
};

export default config;

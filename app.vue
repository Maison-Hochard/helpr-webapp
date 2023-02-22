<script setup lang="ts">
import { useUser } from "~/composables/UseAuth";

const { locale } = useI18n();

useHead({
  title: useAppConfig().appTitle,
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { name: "description", content: useAppConfig().appDescription },
    { name: "keywords", content: "Home" },
  ],
  link: [
    {
      rel: "icon",
      type: "image/x-icon",
      href: "/favicon.ico",
    },
  ],
  script: [
    {
      src: "https://kit.fontawesome.com/b3fb3aef7b.js",
      crossorigin: "anonymous",
    },
  ],
});

const theme = computed(() => useGlobalStore().getTheme);

onMounted(() => {
  const userLocale = useLocalStorage("locale", "en");
  const userTheme = useLocalStorage("theme", "dark");

  useGlobalStore().setTheme(userTheme.value);
  useGlobalStore().setLocale(userLocale.value);
  locale.value = userLocale.value;
});

await useUser();
</script>

<template>
  <Html :data-theme="theme">
    <Body class="bg-primary m-0 p-0 text-primary overflow-x-hidden">
      <EnvChecker />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
import ThemeSwitcher from "~/components/settings/ThemeSwitcher.client.vue";

definePageMeta({
  name: "Settings",
  title: "Settings",
  description: "Settings",
});
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="bg-secondary px-4 py-5 sm:p-6 rounded-lg">
      <h3 class="text-lg font-medium leading-6 text-primary">
        {{ $t("settings.title") }}
      </h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>{{ $t("settings.description") }}</p>
      </div>
      <div class="mt-5 flex gap-4 items-center">
        <span class="text-muted">{{ $t("settings.language") }}:</span>
        <LanguageSelector :isText="true" />
      </div>
    </div>
    <div class="bg-secondary px-4 py-5 sm:p-6 rounded-lg">
      <h3 class="text-lg font-medium leading-6 text-primary">
        {{ $t("settings.theme") }}
      </h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>{{ $t("settings.theme_description") }}</p>
      </div>
      <div class="mt-5 flex gap-4">
        <ThemeSwitcher :is-card="true" class="w-full" />
      </div>
    </div>
  </div>
</template>

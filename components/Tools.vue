<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
import ThemeSwitcher from "~/components/settings/ThemeSwitcher.client.vue";
</script>

<template>
  <div class="flex justify-center flex-row gap-3">
    <ThemeSwitcher />
    <LanguageSelector />
  </div>
</template>

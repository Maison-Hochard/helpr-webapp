<script setup lang="ts">
definePageMeta({
  middleware: ["auth"],
  name: "App",
  title: "App",
  description: "App",
  layout: "app",
});
</script>

<template>
  <div class="w-full">
    <NuxtPage />
  </div>
</template>

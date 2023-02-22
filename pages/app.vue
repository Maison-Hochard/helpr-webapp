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
  <div class="md:pl-64 w-full">
    <NuxtPage class="m-4" />
  </div>
</template>

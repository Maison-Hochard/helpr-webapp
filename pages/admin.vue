<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
  layout: "admin",
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
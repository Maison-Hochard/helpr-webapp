<script setup lang="ts">
import Navbar from "~/components/layout/Navbar.vue";
import CommandConsole from "~/components/layout/CommandConsole.vue";
</script>

<template>
  <div>
    <CommandConsole />
    <Helper />
    <Navbar />
    <slot />
  </div>
</template>

<style scoped></style>

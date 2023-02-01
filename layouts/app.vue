<script setup lang="ts">
import CommandConsole from "~/components/layout/CommandConsole.vue";
import Sidebar from "~/components/layout/Sidebar.vue";
</script>

<template>
  <div class="h-screen flex">
    <CommandConsole />
    <Sidebar />
    <slot />
  </div>
</template>

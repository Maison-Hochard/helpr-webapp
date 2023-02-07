<script setup lang="ts">
defineProps({
  provider: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <img
      class="block h-6 w-auto lg:hidden"
      :src="'https://storage.cloud.google.com/helpr/' + provider + '-logo-white.svg'"
      :alt="provider + ' logo'"
    />
    <img
      class="hidden h-6 w-auto lg:block"
      :src="'https://storage.cloud.google.com/helpr/' + provider + '-logo-white.svg'"
      :alt="provider + ' logo'"
    />
  </div>
</template>
<script setup lang="ts">
defineProps({
  provider: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: false,
  },
});

</script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <div v-if="!source">
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
    <div v-else>
      <img
        class="block h-6 w-auto lg:hidden"
        :src="source"
        :alt="provider + ' logo'"
      />
      <img
        class="hidden h-6 w-auto lg:block"
        :src="source"
        :alt="provider + ' logo'"
      />
    </div>
  </div>
</template>
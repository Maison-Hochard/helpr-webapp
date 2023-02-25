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

const baseUrl = "https://uynsrkwqyplqhfrmdaqw.supabase.co/storage/v1/object/public/logo/";

const theme = computed(() => {
  const currentTheme = useGlobalStore().getTheme;
  if (currentTheme.includes("light")) {
    return "dark";
  } else {
    return "light";
  }
});
</script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <div v-if="!source">
      <img
        class="block h-6 w-auto lg:hidden"
        :src="baseUrl + theme + '/' + provider + '-logo.svg'"
        :alt="provider + ' logo'"
      />
      <img
        class="hidden h-6 w-auto lg:block"
        :src="baseUrl + theme + '/' + provider + '-logo.svg'"
        :alt="provider + ' logo'"
      />
    </div>
    <div v-else>
      <img class="block h-6 w-auto lg:hidden" :src="source" :alt="provider + ' logo'" />
      <img class="hidden h-6 w-auto lg:block" :src="source" :alt="provider + ' logo'" />
    </div>
  </div>
</template>

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
      <nuxt-img class="block h-6 w-auto lg:hidden" :src="'/supabase/logo/' + theme + '/' + provider + '-logo.svg'" />
      <nuxt-img class="hidden h-6 w-auto lg:block" :src="'/supabase/logo/' + theme + '/' + provider + '-logo.svg'" />
    </div>
    <div v-else>
      <nuxt-img class="block h-6 w-auto lg:hidden" :src="source" :alt="provider + ' logo'" />
      <nuxt-img class="hidden h-6 w-auto lg:block" :src="source" :alt="provider + ' logo'" />
    </div>
  </div>
</template>

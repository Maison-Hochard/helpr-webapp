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
  size: {
    type: Number,
    required: false,
    default: 6,
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
      <nuxt-img
        class="block lg:hidden"
        :src="'/supabase/logo/' + theme + '/' + provider + '-logo.svg'"
        :class="['w-' + size, 'h-' + size]"
      />
      <nuxt-img
        class="hidden w-auto lg:block"
        :src="'/supabase/logo/' + theme + '/' + provider + '-logo.svg'"
        :class="['w-' + size, 'h-' + size]"
      />
    </div>
    <div v-else>
      <nuxt-img class="block w-auto lg:hidden" :src="source" :alt="provider + ' logo'" :class="['h-' + size]" />
      <nuxt-img class="hidden w-auto lg:block" :src="source" :alt="provider + ' logo'" :class="['h-' + size]" />
    </div>
  </div>
</template>

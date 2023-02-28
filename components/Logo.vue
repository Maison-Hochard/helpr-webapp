<script setup lang="ts">
const applicationName = useAppConfig().appName;
defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
  size: {
    type: Number,
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
  <div>
    <NuxtLink to="/" class="flex flex-shrink-0 items-center" id="logo">
      <nuxt-img
        class="block w-auto lg:hidden"
        :class="size ? 'h-' + size : 'h-6'"
        :src="'/supabase/logo/' + theme + '/helpr-logo.svg'"
      />
      <nuxt-img
        class="hidden w-auto lg:block"
        :class="size ? 'h-' + size : 'h-6'"
        :src="'/supabase/logo/' + theme + '/helpr-logo.svg'"
      />
      <span class="text-md font-bold text-primary ml-2" v-if="isText">
        {{ applicationName }}
      </span>
    </NuxtLink>
  </div>
</template>

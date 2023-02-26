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
  <div>
    <NuxtLink to="/" class="flex flex-shrink-0 items-center">
      <img
        class="block w-auto lg:hidden"
        :class="size ? 'h-' + size : 'h-6'"
        :src="baseUrl + theme + '/helpr-logo.svg'"
        :alt="applicationName"
      />
      <img
        class="hidden w-auto lg:block"
        :class="size ? 'h-' + size : 'h-6'"
        :src="baseUrl + theme + '/helpr-logo.svg'"
        :alt="applicationName"
      />
      <span class="text-md font-bold text-primary ml-2" v-if="isText">
        {{ applicationName }}
      </span>
    </NuxtLink>
  </div>
</template>

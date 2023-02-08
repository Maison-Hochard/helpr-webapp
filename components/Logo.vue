<script setup lang="ts">
const applicationName = useAppConfig().appName;
defineProps({
  isText: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div>
    <NuxtLink to="/" class="flex flex-shrink-0 items-center">
      <img
        class="block h-6 w-auto lg:hidden"
        src="../assets/media/helpr-logo-icon-md-blanc.svg"
        :alt="applicationName"
      />
      <img
        class="hidden h-6 w-auto lg:block"
        src="../assets/media/helpr-logo-icon-md-blanc.svg"
        :alt="applicationName"
      />
      <span class="text-md font-bold text-primary ml-2" v-if="isText">
      {{ applicationName }}
    </span>
    </NuxtLink>
  </div>
</template>
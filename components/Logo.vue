<script setup lang="ts">
const applicationName = useAppConfig().applicationName;
const logo = "../assets/media/helpr-logo-icon-md-blanc.svg";

defineProps({
  isText: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div class="flex flex-shrink-0 items-center">
    <img
      class="block h-6 w-auto lg:hidden"
      :src="logo"
      :alt="applicationName"
    />
    <img
      class="hidden h-6 w-auto lg:block"
      :src="logo"
      :alt="applicationName"
    />
    <span class="text-md font-bold text-primary ml-2" v-if="isText">
      {{ applicationName }}
    </span>
  </div>
</template>
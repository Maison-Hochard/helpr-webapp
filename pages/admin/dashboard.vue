<script setup lang="ts">
definePageMeta({
  name: "Dashboard",
  title: "Dashboard",
});

const data = ref([]);
</script>

<template>
  <form class="space-y-6">
    <div class="bg-secondary px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <Loader v-if="true" />
      <UsersTable :users="data" v-else/>
    </div>
  </form>
</template>

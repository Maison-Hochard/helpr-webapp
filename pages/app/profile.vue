<script setup>
definePageMeta({
  name: "Profile",
  title: "Profile",
});

const resetError = (error) => {
  error.value = null;
  useRouter().back();
};
</script>

<template>
  <div>
    <NuxtErrorBoundary>
      <NuxtPage />
      <template #error="{ error }">
        <div class="p-8 bg-secondary rounded-md">
          <h2 class="text-4xl font-bold">Error</h2>
          <p>{{ error }}</p>
          <button @click="resetError(error)" class="bg-blue-500 text-white p-2 rounded-md">Retry</button>
        </div>
      </template>
    </NuxtErrorBoundary>
  </div>
</template>

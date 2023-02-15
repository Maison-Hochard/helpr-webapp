<script setup lang="ts">
definePageMeta({
  name: "My Flows",
  title: "My Flows",
});
</script>

<template>
  <div class="bg-secondary shadow sm:rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">My Flows</h3>
      <div class="mt-2 max-w-xl text-sm text-muted">
        <p>Here you can see all your flows. You can create a new flow by clicking the button below.</p>
      </div>
      <div class="mt-5 flex gap-4">
        <button class="btn-primary" @click="() => useRouter().push('/app/create-flow')">Create Flow</button>
      </div>
      <div class="mt-5 flex gap-4"></div>
    </div>
  </div>
</template>

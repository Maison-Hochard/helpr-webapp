<script setup lang="ts">
import { TrashIcon, GlobeAltIcon, LockClosedIcon } from "@heroicons/vue/24/outline";
defineProps({
  flow: {
    type: Object,
    required: true,
  },
  refresh: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="bg-secondary shadow rounded-lg">
    <div>
      <div class="px-4 py-5 sm:p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <h3 class="text-lg font-medium leading-6 text-primary">{{ flow.name }}</h3>
            <GlobeAltIcon v-if="flow.public" class="h-5 w-5 text-muted mt-1" aria-hidden="true" />
            <LockClosedIcon v-else class="h-5 w-5 text-muted mt-1" aria-hidden="true" />
          </div>
          <Switch :model-value="flow.enabled" @update:value="flow.enabled = $event" />
        </div>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>{{ flow.description }}</p>
        </div>
        <div class="mt-6 flex items-center justify-between">
          <div class="flex gap-4">
            <img
              v-for="provider in flow.providers"
              :key="provider.id"
              :src="provider.logo"
              class="h-6 w-6 rounded-full"
              :alt="provider.name"
            />
          </div>
          <div>
            <TrashIcon
              class="h-5 w-5 text-muted hover:text-red-500 cursor-pointer"
              @click="deleteFlow(flow.id, refresh)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

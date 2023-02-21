<script setup lang="ts">
defineProps({
  flowName: {
    type: String,
    required: true,
  },
  flowEnabled: {
    type: Boolean,
    required: true,
  },
  flowTrigger: {
    type: Object,
    required: true,
  },
  flowActions: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="mt-10 flex flex-col mb-20 text-muted text-sm border border-muted p-2">
    <span>Debug:</span><br />
    <span>Flow name: {{ flowName }}</span>
    <span>Flow enabled: {{ flowEnabled }}</span>
    <span>Flow trigger: {{ flowTrigger.name }}</span>
    <span>Flow actions: {{ flowActions.map((action) => action.name) }}</span>
  </div>
</template>

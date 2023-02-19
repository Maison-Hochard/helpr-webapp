<script setup lang="ts">
defineProps({
  providers: {
    type: Array,
    required: true,
  },
});
const flowStore = useFlowStore();
const selectedProvider = ref();
const selectedTrigger = ref();

function setTrigger() {
  flowStore.setTriggerId(selectedTrigger.value.id);
}

function deleteTrigger() {
  flowStore.setTriggerId(0);
}
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-primary">Select a trigger</h3>
    <div class="flex flex-wrap gap-4 mt-4">
      <Dropdown v-model="selectedProvider" :items="providers" label="Select a provider" :is-logo="true" />
      <Dropdown
        v-if="selectedProvider"
        v-model="selectedTrigger"
        :items="selectedProvider.triggers"
        label="Select a trigger"
        :is-logo="false"
      />
      <div v-if="selectedTrigger" class="flex flex-col gap-4">
        <div class="flex flex-row gap-4">
          <div class="flex flex-col">
            <p class="text-md font-bold">
              {{ selectedTrigger.title }}
            </p>
            <p class="text-sm text-muted">
              {{ selectedTrigger.description }}
            </p>
          </div>
          <div class="flex flex-col">
            <p class="text-md font-bold">
              {{ selectedTrigger.provider.name }}
            </p>
            <p class="text-sm text-muted">
              {{ selectedTrigger.provider.description }}
            </p>
          </div>
        </div>
        <div class="flex flex-row gap-4">
          <button class="btn-primary" @click="setTrigger">Add trigger</button>
          <button class="btn-secondary" @click="deleteTrigger">Delete trigger</button>
        </div>
      </div>
    </div>
  </div>
</template>

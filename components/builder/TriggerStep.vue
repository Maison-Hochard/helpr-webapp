<script setup lang="ts">
const props = defineProps({
  providers: {
    type: Array,
    required: true,
  },
});
const flow = useFlowStore().getFlow;

const selectedProvider = ref(
  flow.trigger?.provider
    ? props.providers.find((provider) => provider.name.toLowerCase() === flow.trigger.provider)
    : ref(),
);
const selectedTrigger = ref(flow.trigger) || ref();

function saveTrigger() {
  useFlowStore().saveTrigger(selectedTrigger.value);
}
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-primary">{{ selectedTrigger?.title || "Select a trigger" }}</h3>
    <h4 class="text-sm text-muted">{{ selectedTrigger?.description || "" }}</h4>
    <div class="flex flex-wrap gap-4 mt-4">
      <Dropdown
        v-model="selectedProvider"
        :placeholder="'Linear, Github, etc...'"
        :items="providers"
        label="Select a provider"
        :is-logo="true"
      />
      <Dropdown
        v-if="selectedProvider"
        v-model="selectedTrigger"
        placeholder="When a new issue is created, etc..."
        :items="selectedProvider.triggers"
        label="Select a trigger"
        :is-logo="false"
      />
      <button class="btn-secondary" @click="saveTrigger">Save Trigger</button>
    </div>
  </div>
</template>

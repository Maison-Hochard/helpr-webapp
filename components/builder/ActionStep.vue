<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/20/solid";
const props = defineProps({
  providers: {
    type: Array,
    required: true,
  },
  actionId: {
    type: Number,
    required: true,
  },
});
const flowStore = useFlowStore();

const flow = flowStore.getFlow;

const selectedProvider = ref();
const selectedAction = ref();

function saveAction() {
  flowStore.saveAction(props.actionId, selectedAction.value);
}
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <div class="flex flex-row justify-between">
      <h3 class="text-lg leading-6 font-medium text-primary">Action</h3>
      <TrashIcon
        class="h-6 w-6 text-muted cursor-pointer hover:text-red-600"
        @click="flowStore.removeAction(actionId)"
      />
    </div>
    <div class="flex flex-wrap gap-4 mt-4">
      <Dropdown v-model="selectedProvider" :items="providers" label="Select a provider" :is-logo="true" />
      <Dropdown
        v-if="selectedProvider"
        v-model="selectedAction"
        :items="selectedProvider.actions"
        label="Select an action"
        :is-logo="false"
      />
      <div v-if="selectedAction">
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-4">
            <div class="flex flex-col">
              <p class="text-md font-bold">
                {{ selectedAction.title }}
              </p>
              <p class="text-sm text-muted">
                {{ selectedAction.description }}
              </p>
            </div>
          </div>
        </div>
        <button class="btn-secondary" @click="saveAction">Save Action</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TrashIcon } from "@heroicons/vue/24/outline";
const props = defineProps({
  providers: {
    type: Array,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  action: {
    type: Object,
    required: true,
  },
});
const flowStore = useFlowStore();

const flow = flowStore.getFlow;

const selectedProvider = ref(
  flow.actions?.find((action) => action.index === props.index)?.endpoint
    ? props.providers.find(
        (provider) =>
          provider.name.toLowerCase() === flow.actions.find((action) => action.index === props.index)?.endpoint,
      )
    : ref(),
);
const selectedAction = ref(flow.actions.find((action) => action.index === props.index)) || ref();
const payload = ref(selectedAction.value?.payload) || ref({});

function saveAction() {
  selectedAction.value.payload = payload.value;
  flowStore.saveAction(props.index, selectedAction.value);
  useSuccessToast("Action saved!");
}

function removeAction() {
  flowStore.deleteAction(props.index);
}
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <div class="flex flex-row justify-between">
      <div>
        <h3 class="text-lg leading-6 font-medium text-primary">{{ action.title }}</h3>
        <h4 class="text-sm text-muted">{{ action.description || "" }}</h4>
      </div>
      <TrashIcon class="h-6 w-6 text-muted cursor-pointer hover:text-red-600" @click="removeAction" />
    </div>
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
        v-model="selectedAction"
        :items="selectedProvider.actions"
        :placeholder="'Create a new issue, etc...'"
        label="Select an action"
        :is-logo="false"
      />
      <div v-if="selectedAction" id="createPayload" class="flex flex-col gap-4 w-full">
        <div v-for="(field, key) in selectedAction.variables" :key="key" class="flex flex-col gap-2">
          <label class="text-primary">{{ field.title }}</label>
          <textarea class="bg-primary text-primary p-2 focus:outline-none rounded-md" v-model="payload[field.name]" />
        </div>
      </div>
    </div>
    <button class="btn-secondary mt-4" @click="saveAction">Save Action</button>
  </div>
</template>

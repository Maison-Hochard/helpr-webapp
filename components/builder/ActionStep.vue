<script setup lang="ts">
import { TrashIcon, CheckBadgeIcon } from "@heroicons/vue/24/outline";
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

const filteredProviders = computed(() => {
  return props.providers.filter((provider) => provider._count.actions > 0);
});

const selectedAction = ref(flow.actions.find((action) => action.index === props.index)) || ref();
const payload = ref(selectedAction.value?.payload) || ref({});

function saveAction() {
  if (selectedAction.value?.name !== "empty") {
    selectedAction.value.payload = payload.value;
    flowStore.saveAction(props.index, selectedAction.value);
    useSuccessToast("Action saved!");
  } else {
    useErrorToast("Please select an action");
  }
}

type VariablesValues = {
  [key: string]: any;
};

const variablesValues = ref<VariablesValues>({});

function removeAction() {
  flowStore.deleteAction(props.index);
  variablesValues.value = {};
}

async function getProviderDataForAction(provider: string) {
  try {
    const { data } = await useAPI(`/${provider}/data`, "GET");
    variablesValues.value = data;
  } catch (error) {
    useErrorToast("Error while fetching data from provider");
  }
}
</script>

<template>
  <form class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6" @submit.prevent="saveAction">
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
        :items="filteredProviders"
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
          <div class="flex flex-row gap-2">
            <label class="text-primary">{{ field.title }}</label>
            <span v-if="field.required" class="text-red-600">*</span>
          </div>
          <div v-if="variablesValues && Object.keys(variablesValues).length > 0">
            <textarea
              v-if="field.type === 'textarea'"
              type="text"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              v-model="payload[field.key]"
              :required="field.required"
            />
            <Switch v-else-if="field.type === 'boolean'" v-model="payload[field.key]" :required="field.required" />
            <select
              v-else-if="field.type === 'select'"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              v-model="payload[field.key]"
              :required="field.required"
            >
              <option v-for="data in variablesValues[field.key]" :key="data.value" :value="data.value">
                {{ data.name }}
              </option>
            </select>
            <input
              v-else
              :type="field.type"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              v-model="payload[field.key]"
              :required="field.required"
            />
          </div>
          <div v-else>
            <textarea
              type="text"
              rows="2"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
              v-model="payload[field.key]"
              :required="field.required"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-2 items-center mt-4">
      <button class="btn-secondary" type="submit">Save Action</button>
      <button
        class="btn-secondary"
        type="button"
        @click="getProviderDataForAction(selectedProvider.name)"
        :disabled="!selectedProvider"
        :class="{ 'cursor-not-allowed': !selectedProvider }"
      >
        Get data for trigger
      </button>
      <div class="flex flex-row gap-2 items-center" v-if="variablesValues && Object.keys(variablesValues).length > 0">
        <CheckBadgeIcon class="h-6 w-6 text-muted text-green-600" />
        <span class="text-sm text-muted">Connected to provider</span>
      </div>
    </div>
  </form>
</template>

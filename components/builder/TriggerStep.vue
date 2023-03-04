<script setup lang="ts">
import { CheckBadgeIcon } from "@heroicons/vue/24/outline";
const props = defineProps({
  providers: {
    type: Array,
    required: true,
  },
});
const flowStore = useFlowStore();
const flow = flowStore.getFlow;
const where = ref(flow.where || "");

const selectedProvider = ref(
  flow.trigger?.provider
    ? props.providers.find((provider) => provider.name.toLowerCase() === flow.trigger.provider)
    : ref(),
);

const selectedTrigger = computed(() => flow.trigger || ref());

const filteredProviders = computed(() => {
  return props.providers.filter((provider) => provider._count.triggers > 0);
});

const variables = computed(() => {
  return selectedTrigger.value?.variables || {};
});

type VariablesValues = {
  [key: string]: any;
};

const variablesValues = ref<VariablesValues>({});

async function getProviderDataForAction(provider: string) {
  try {
    const { data } = await useAPI(`/${provider}/data`, "GET");
    variablesValues.value = data;
  } catch (error) {
    useErrorToast("Error while fetching data from provider");
  }
}

function saveTrigger() {
  if (selectedTrigger.value?.id) {
    flowStore.saveTrigger(selectedTrigger.value, where.value);
    useSuccessToast("Trigger saved!");
  } else {
    useErrorToast("Please select a trigger");
  }
}
</script>

<template>
  <form class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6" @submit.prevent="saveTrigger">
    {{ where }}
    <h3 class="text-lg leading-6 font-medium text-primary">{{ selectedTrigger?.title || "Select a trigger" }}</h3>
    <h4 class="text-sm text-muted">{{ selectedTrigger?.description || "" }}</h4>
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
        v-model="flow.trigger"
        placeholder="When a new issue is created, etc..."
        :items="selectedProvider.triggers"
        label="Select a trigger"
        :is-logo="false"
      />
      <div v-if="selectedTrigger?.variables" class="w-full">
        <div v-for="(variable, key) in variables" :key="key" class="flex flex-col gap-2">
          <div v-if="variable.webhook" class="flex flex-col gap-2">
            <div class="flex flex-row gap-2">
              <label class="text-primary">{{ variable.title }}</label>
              <span v-if="variable.required" class="text-red-600">*</span>
            </div>
            <input
              v-model="where"
              v-if="variable.type !== 'select'"
              :required="variable.required"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm placeholder-gray-600"
              type="text"
              placeholder="Where your flow should trigger"
            />
            <select
              v-model="where"
              v-else-if="variable.type === 'select' && variablesValues[variable.key]"
              :required="variable.required"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm placeholder-gray-600"
            >
              <option v-for="option in variablesValues[variable.key]" :key="option.value" :value="option.value">
                {{ option.name }}
              </option>
            </select>
            <input
              v-model="where"
              v-else
              :required="variable.required"
              class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm placeholder-gray-600"
              type="text"
              placeholder="Where your flow should trigger"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-row gap-2 items-center">
        <button class="btn-secondary" type="submit">Save Trigger</button>
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
    </div>
  </form>
</template>

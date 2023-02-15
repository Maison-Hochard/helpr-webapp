<script lang="ts" setup>
import { getUserProviders } from "~/composables/useProvider";
import { flowBuilderData } from "~/types/Flow";

definePageMeta({
  name: "Create-Flow",
  title: "Create Flow",
});

const { data: providers, pending } = await useLazyAsyncData<flowBuilderData>(async () => {
  return await getUserProviders();
});
console.log("Provider", providers.value);

const flowName = ref("");

const flowDescription = ref("");

const selectedTrigger = ref();

const selectedProviders = ref([]);

const selectedActions = ref([]);

const actionsPayload = ref([]);

const flow = computed(() => {
  return {
    name: flowName.value,
    description: flowDescription.value,
    triggerId: selectedTrigger.value?.id,
    triggerName: selectedTrigger.value?.name,
    actions: selectedActions.value.map((action) => {
      return {
        id: action?.id,
        name: action?.name,
        provider: action?.provider,
        payload: actionsPayload.value,
      };
    }),
  };
});

async function createFlow() {
  console.log("Flow", flow.value);
}

const toggleSelectedProvider = (provider: string) => {
  if (selectedProviders.value.includes(provider)) {
    selectedProviders.value = selectedProviders.value.filter((p: any) => p !== provider);
  } else {
    selectedProviders.value.push(provider);
  }
};

const toggleSelectedAction = (action: string) => {
  if (selectedActions.value.includes(action)) {
    selectedActions.value = selectedActions.value.filter((a: any) => a !== action);
  } else {
    selectedActions.value.push(action);
  }
};
</script>

<template>
  <div>
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">Create Flow</h3>
      <p class="mt-1 text-sm text-muted">Create a new flow.</p>
    </div>
    <Loader v-if="pending" />
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6" v-else>
      <h3 class="text-lg font-medium leading-6 text-primary">Select a provider and a trigger to get started</h3>
      <div class="w-1/2 mt-5 flex flex-col gap-4">
        <input
          v-model="flowName"
          id="flow-name"
          name="flow-name"
          type="text"
          autocomplete="flow-name"
          placeholder="Flow Name"
          class="input w-full"
        />
        <input
          v-model="flowDescription"
          id="flow-description"
          name="flow-description"
          type="text"
          autocomplete="flow-description"
          placeholder="Flow Description"
          class="input w-full"
        />
        <select v-model="selectedTrigger" id="flow-trigger" name="flow-trigger" class="input w-full">
          <option value="" disabled selected>Select a trigger</option>
          <option v-for="trigger in providers[0].triggers" :key="trigger.name" :value="trigger">
            {{ trigger.name }}
          </option>
        </select>
      </div>
      <div class="flex flex-row mt-10 gap-5">
        <div class="flex flex-col gap-4">
          <div
            v-for="provider in providers"
            :key="provider.provider"
            class="flex flex-row gap-5"
            :class="selectedProviders.includes(provider) ? 'bg-accent-faded p-4' : ''"
          >
            <ProviderLogo
              :provider="provider.name"
              :source="provider.logo"
              @click="toggleSelectedProvider(provider)"
              class="cursor-pointer"
            />
            <div v-if="selectedProviders.includes(provider)">
              <div v-for="action in provider.actions" :key="action.name" class="flex flex-row gap-5 cursor-pointer">
                <h3
                  class="text-lg font-medium leading-6 text-primary"
                  :class="selectedActions.includes(action) ? 'text-accent' : ''"
                  @click="toggleSelectedAction(action)"
                >
                  {{ action.title }}
                </h3>
                <p class="mt-1 text-sm text-muted">
                  {{ action.description }}
                </p>
                <div v-if="selectedActions.includes(action)">
                  <div v-for="variable in action.variables" :key="variable.name">
                    <input
                      v-model="actionsPayload[variable.name]"
                      id="flow-name"
                      name="flow-name"
                      type="text"
                      autocomplete="flow-name"
                      placeholder="Flow Name"
                      class="input w-full"
                    />
                    <p class="mt-1 text-sm text-muted">
                      {{ variable.name }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-10">
        <button @click="createFlow" class="btn btn-primary">Create Flow</button>
      </div>
    </div>
    {{ flow }}
  </div>
</template>

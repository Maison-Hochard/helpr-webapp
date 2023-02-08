<script lang="ts" setup>
import { getAuthenticatedProviders, getProviders } from "~/composables/useServices";

definePageMeta({
  name: "Create-Flow",
  title: "Create Flow",
});

const { data: providers, pending: providersPending } = await useLazyAsyncData(async () => {
  return await getProviders();
});

const { data: services, pending: servicesPending } = await useLazyAsyncData(async () => {
  return await getAuthenticatedProviders();
});

const selectedProviders = ref([]);

const selectedActions = ref([]);

const flowName = ref("");

const flowDescription = ref("");

const flowTrigger = ref(Trigger.INSTANT);

const flow = computed(() => {
  return {
    name: flowName.value,
    description: flowDescription.value,
    trigger: flowTrigger.value,
    actions: selectedActions.value,
  };
});

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

const createFlow = async () => {};

const enum Trigger {
  INSTANT = 1,
  EVERY_15_MINUTES = 2,
  EVERY_30_MINUTES = 3,
  ON_CREATE = 4,
}
</script>

<template>
  <div>
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">Create Flow</h3>
      <p class="mt-1 text-sm text-muted">Create a new flow.</p>
    </div>
    <Loader v-if="providersPending || servicesPending" />
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6" v-else>
      <h3 class="text-lg font-medium leading-6 text-primary">Select a provider to start the flow</h3>
      <div class="w-1/2 mt-5 flex flex-col gap-4">
        <input
          v-model="flowName"
          id="flow-name"
          name="flow-name"
          type="text"
          autocomplete="flow-name"
          placeholder="Flow Name"
          class="input"
        />
        <input
          v-model="flowDescription"
          id="flow-description"
          name="flow-description"
          type="text"
          autocomplete="flow-description"
          placeholder="Flow Description"
          class="input"
        />
        <select v-model="flowTrigger" class="input">
          <option value="1">Instant</option>
          <option value="2">Every 15 minutes</option>
          <option value="3">Every 30 minutes</option>
          <option value="4">On Create</option>
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
              <div
                v-for="action in provider.actions"
                :key="action.name"
                class="flex flex-row gap-5 cursor-pointer"
                @click="toggleSelectedAction(action)"
              >
                <h3
                  class="text-lg font-medium leading-6 text-primary"
                  :class="selectedActions.includes(action) ? 'text-accent' : ''"
                >
                  {{ action.title }}
                </h3>
                <p class="mt-1 text-sm text-muted">
                  {{ action.description }}
                </p>
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

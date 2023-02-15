// This is a page which will be used to create a new flow in few steps // first step is to give a name to the flow //
second step is to select a trigger // third step is to select an action // fourth step is to provide the payload for the
action // then the flow will be created and the user will be redirected to the flow page

<script setup lang="ts">
import { Action, flowBuilderData, Trigger } from "~/types/Flow";
import { getUserProviders } from "~/composables/useProvider";
import { PlusIcon } from "@heroicons/vue/20/solid";
import TriggerStep from "~/components/builder/triggerStep.vue";
import ActionStep from "~/components/builder/actionStep.vue";

definePageMeta({
  name: "New Flow",
  title: "New Flow",
});

const { data: providers, pending } = await useLazyAsyncData<flowBuilderData>(async () => {
  return await getUserProviders();
});
console.log("Provider", providers.value);

const flowName = ref("Flow " + Math.floor(Math.random() * 1000));

const flow = computed(() => {
  return {
    name: flowName.value,
    triggerId: selectedTrigger.value,
    actions: selectedActions.value,
  };
});

async function createFlow() {
  console.log("Flow", flow.value);
}

const selectedTrigger = ref<Trigger>();
const selectedActions = ref<Action[]>([]);

const nbActions = ref(0);

// maybe here a function to add an action to the flow and then a component to select the action and provide the payload

function addActionFromStep(action: Action) {
  selectedActions.value.push(action);
}

function addAction() {
  nbActions.value++;
}

useHead({
  title: flowName.value,
});
</script>

<template>
  <div>
    <form class="m-4">
      <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
        <input
          v-model="flowName"
          class="bg-transparent border-none w-full text-3xl font-bold text-primary focus:outline-none"
        />
        <p class="mt-1 text-sm text-muted">You can change the name of the flow just by clicking on it.</p>
      </div>
      <Loader v-if="pending" />
      <div v-else class="flex flex-col gap-4 mt-4">
        <TriggerStep :providers="providers" @update:modelValue="selectedTrigger = $event" />
        <div v-for="action in nbActions" :key="action">
          <ActionStep :providers="providers" @update:modelValue="addActionFromStep($event)" />
          <button class="btn-secondary w-full" @click="nbActions-- && selectedActions.pop()">Remove Action</button>
        </div>
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-muted" />
          </div>
          <div class="relative flex justify-center">
            <button
              @click="addAction"
              type="button"
              class="inline-flex items-center rounded-full border border-muted bg-secondary px-4 py-1.5 text-sm font-medium leading-5 text-muted"
            >
              <PlusIcon class="-ml-1.5 mr-1 h-5 w-5 text-muted" aria-hidden="true" />
              <span>Add Action</span>
            </button>
          </div>
        </div>
        <button @click="createFlow" class="btn-primary w-full">Save Flow</button>
        {{ flow }}
      </div>
    </form>
  </div>
</template>

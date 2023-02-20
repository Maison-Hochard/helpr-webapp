// This is a page which will be used to create a new flow in few steps // first step is to give a name to the flow //
second step is to select a trigger // third step is to select an action // fourth step is to provide the payload for the
action // then the flow will be created and the user will be redirected to the flow page

<script setup lang="ts">
import { flowBuilderData } from "~/types/Flow";
import { getUserProviders } from "~/composables/useProvider";
import { PlusIcon } from "@heroicons/vue/20/solid";
import TriggerStep from "~/components/builder/TriggerStep.vue";
import ActionStep from "~/components/builder/ActionStep.vue";
import { useFlowStore } from "~/store/flowStore";

definePageMeta({
  name: "New Flow",
  title: "New Flow",
});

const { data: providers, pending } = await useLazyAsyncData<flowBuilderData>(async () => {
  return await getUserProviders();
});

const flowStore = useFlowStore();

const flow = flowStore.getFlow;

async function createFlow() {
  useErrorToast("Aie, this feature is not implemented yet :(");
  // await addFlow(flow.value);
}

useHead({
  title: flow.name,
});
</script>

<template>
  <div>
    <div class="m-4">
      <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
        <input
          v-model="flow.name"
          @input="flow.name = $event.target.value"
          class="bg-transparent border-none w-full text-3xl font-bold text-primary focus:outline-none"
        />
        <p class="mt-1 text-sm text-muted">You can change the name of the flow just by clicking on it.</p>
      </div>
      <Loader v-if="pending" />
      <div v-else class="flex flex-col gap-4 mt-4">
        <TriggerStep :providers="providers" />
        <ActionStep
          v-for="action in flow.actions"
          :key="action.id"
          :action="action"
          :index="flow.actions.indexOf(action)"
          :providers="providers"
        />
        <div class="relative">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t border-muted" />
          </div>
          <div class="relative flex justify-center">
            <button
              @click="flowStore.addAction"
              type="button"
              class="inline-flex items-center rounded-full border border-muted bg-secondary px-4 py-1.5 text-sm font-medium leading-5 text-muted"
            >
              <PlusIcon class="-ml-1.5 mr-1 h-5 w-5 text-muted" aria-hidden="true" />
              <span>Add Action</span>
            </button>
          </div>
        </div>
        <button @click="createFlow" class="btn-primary w-full">Save Flow</button>
        <div id="debug" class="flex flex-col mb-20">
          <span>Flow name: {{ flow.name }}</span>
          <span>Flow trigger: {{ flow.trigger.name }}</span>
          <span>Flow actions: {{ flow.actions.map((action) => action.name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

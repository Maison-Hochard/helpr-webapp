<script setup lang="ts">
import { PlusIcon } from "@heroicons/vue/24/outline";
import TriggerStep from "~/components/builder/TriggerStep.vue";
import ActionStep from "~/components/builder/ActionStep.vue";
import Debug from "~/components/builder/Debug.vue";
import { useFlowStore } from "~/store/flowStore";
import { flowBuilderData } from "~/types/Flow";
import { endDrag, onDragEnter, onDragOver, onDrop, startDrag } from "~/composables/Builder/useBuilder";

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

const variables = computed(() => {
  const triggerVariables = flow.trigger?.variables?.map((variable) => variable.value) || [];
  const actionVariables = flow.actions?.flatMap((action) => action.variables?.map((variable) => variable.value)) || [];
  return [...triggerVariables, ...actionVariables];
});

useHead({
  title: flow.name,
});
</script>

<template>
  <div>
    <div class="m-4">
      <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6 flex items-center justify-between">
        <div>
          <input
            v-model="flow.name"
            @input="flow.name = $event.target.value"
            class="bg-transparent border-none w-full text-3xl font-bold text-primary focus:outline-none"
          />
          <p class="mt-1 text-sm text-muted">You can change the name of the flow just by clicking on it.</p>
        </div>
        <Switch v-model="flow.enabled" />
      </div>
      <FlowLoader v-if="pending" :nb-items="4" />
      <div v-else class="flex flex-col gap-4 mt-4">
        <TriggerStep :providers="providers" />
        <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
          <h3 class="text-lg leading-6 font-medium text-primary">Variables</h3>
          <p class="text-sm text-muted">
            You can use these variables in your actions. Just click on them to copy them to your clipboard and paste
            them in your action.
          </p>
          <div class="flex flex-wrap gap-4 mt-4" v-if="variables.length > 0">
            <button
              v-for="variable in variables"
              :key="variable"
              class="btn-secondary"
              @click="copyToClipboard(variable)"
            >
              {{ variable }}
            </button>
          </div>
          <div v-else class="text-muted text-center mt-4">No variables found</div>
        </div>
        <div class="flex flex-col gap-4 mt-4" @dragover.prevent @dragenter.prevent @drop="onDrop">
          <ActionStep
            v-for="action in flow.actions"
            :key="action.index"
            :action="action"
            :index="action.index"
            :providers="providers"
            class="drag-el"
            draggable="false"
            @dragstart="startDrag($event, action.index)"
            @dragend="endDrag"
            @dragenter="onDragEnter($event, action.index)"
            @dragover="onDragOver"
          />
        </div>
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
        <Debug
          :flow-actions="flow.actions"
          :flow-trigger="flow.trigger"
          :flow-enabled="flow.enabled"
          :flow-name="flow.name"
        />
      </div>
    </div>
  </div>
</template>

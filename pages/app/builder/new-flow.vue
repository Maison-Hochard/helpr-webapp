<script setup lang="ts">
import { flowBuilderData } from "~/types/Flow";
import { getUserProviders } from "~/composables/useProvider";
import { PlusIcon } from "@heroicons/vue/24/outline";
import TriggerStep from "~/components/builder/TriggerStep.vue";
import ActionStep from "~/components/builder/ActionStep.vue";
import { useFlowStore } from "~/store/flowStore";
import FlowLoader from "~/components/FlowLoader.vue";

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

let dragActionIndex = -1;
let targetActionIndex = -1;

function startDrag(event: DragEvent, index: number) {
  dragActionIndex = index;
}

function endDrag() {
  dragActionIndex = -1;
  targetActionIndex = -1;
}

function onDrop() {
  if (dragActionIndex >= 0 && targetActionIndex >= 0 && dragActionIndex !== targetActionIndex) {
    flowStore.moveAction(dragActionIndex, targetActionIndex);
  }
}

function onDragEnter(event: DragEvent, index: number) {
  if (dragActionIndex >= 0 && dragActionIndex !== index) {
    targetActionIndex = index;
  }
}

function onDragOver(event: DragEvent) {
  event.preventDefault();
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
        <div class="drop-zone flex flex-col gap-4 mt-4" @dragover.prevent @dragenter.prevent @drop="onDrop">
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
        <div id="debug" class="mt-10 flex flex-col mb-20 text-muted text-sm border border-muted p-2">
          <span>Debug:</span><br />
          <span>Flow name: {{ flow.name }}</span>
          <span>Flow enabled: {{ flow.enabled }}</span>
          <span>Flow trigger: {{ flow.trigger.name }}</span>
          <span>Flow actions: {{ flow.actions.map((action) => action.name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

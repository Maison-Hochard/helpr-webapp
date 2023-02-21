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
  // retrieve variables in flow.trigger and flow.actions
  const triggerVariables = flow.trigger?.variables?.map((variable) => variable.value) || [];
  return triggerVariables;
});
const test = ref("");

useHead({
  title: flow.name,
});
</script>

<template>
  <div>
    {{ variables }}
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
        <InputTest v-model="test" :variables="variables" />
        <TriggerStep :providers="providers" />
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
        <div id="debug" class="flex flex-col mb-20 text-muted text-sm">
          <span>Flow name: {{ flow.name }}</span>
          <span>Flow trigger: {{ flow.trigger.name }}</span>
          <span>Flow actions: {{ flow.actions.map((action) => action.name) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

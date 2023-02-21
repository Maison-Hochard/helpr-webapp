<script setup lang="ts">
import { Action } from "~/types/Flow";
import { Variable } from "~/store/flowStore";

const props = defineProps({
  flow: {
    type: Object,
    required: true,
  },
});

const variables = computed((): string[] => {
  const triggerVariables = props.flow.trigger?.variables?.map((variable: Variable) => variable.value) || [];
  const actionVariables =
    props.flow.actions?.flatMap((action: Action) => action.variables?.map((variable) => variable.value)) || [];
  return [...triggerVariables, ...actionVariables];
});
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-primary">Variables</h3>
    <p class="text-sm text-muted">
      You can use these variables in your actions. Just click on them to copy them to your clipboard and paste them in
      your action.
    </p>
    <div class="flex flex-wrap gap-4 mt-4" v-if="variables.length > 0">
      <button v-for="variable in variables" :key="variable" class="btn-secondary" @click="copyToClipboard(variable)">
        {{ variable }}
      </button>
    </div>
    <div v-else class="text-muted text-center mt-4">No variables found</div>
  </div>
</template>

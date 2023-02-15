<script setup lang="ts">
import { Action } from "~/types/Flow";

const props = defineProps({
  actions: {
    type: Array,
    required: true,
  },
});

const selectedAction = ref<Action>();
const payload = ref({});

const emit = defineEmits(["update:modelValue"]);

const action = computed(() => {
  return {
    id: selectedAction.value?.id,
    payload: payload.value,
  };
});

function addAction() {
  emit("update:modelValue", action.value);
}
</script>

<template>
  <div>
    <select v-model="selectedAction" class="btn-secondary w-full text-muted">
      <option disabled value="">Select an action</option>
      <option v-for="action in actions" :key="action.id" :value="action">
        {{ action.title }}
      </option>
    </select>
    <div v-if="selectedAction">
      <div class="my-6">
        <h4 class="text-lg font-bold">{{ selectedAction.title }}</h4>
        <p class="mt-1">
          {{ selectedAction.description }}
        </p>
      </div>
      <div v-for="variable in selectedAction.variables" :key="variable.id" class="flex flex-col">
        <div class="flex gap-4">
          <div>
            <p class="text-md font-bold">
              {{ variable.name }}
            </p>
            <p>
              {{ variable.description }}
            </p>
            <input v-model="payload[variable.value]" class="btn-secondary w-full" />
          </div>
        </div>
      </div>
      <button class="btn-primary mt-4" @click="addAction">Add action</button>
    </div>
  </div>
</template>

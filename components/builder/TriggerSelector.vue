<script setup lang="ts">
defineProps({
  triggers: {
    type: Object,
    required: true,
  },
});

const selectedTrigger = ref({});

function toggleSelectedTrigger(trigger: any) {
  if (selectedTrigger.value === trigger) {
    selectedTrigger.value = {};
    updateValue("");
  } else {
    selectedTrigger.value = trigger;
    updateValue(trigger.id);
  }
}
const emit = defineEmits(["update:value"]);

function updateValue(value: string) {
  emit("update:value", value);
}
</script>

<template>
  <div class="flex flex-col">
    <div
      v-for="trigger in triggers"
      :key="trigger.id"
      class="flex flex-col cursor-pointer"
      @click="toggleSelectedTrigger(trigger)"
      :class="selectedTrigger === trigger ? 'text-accent' : ''"
    >
      <div class="flex">
        <div>
          <h4 class="text-lg font-bold">{{ trigger.name }}</h4>
          <p class="mt-1">
            {{ trigger.description }}
          </p>
        </div>
      </div>
      <div class="flex flex-col">
        <div v-for="option in trigger.options" :key="option.id" class="flex flex-col">
          <div class="flex">
            <div>
              <h4 class="text-lg font-bold">{{ option.name }}</h4>
              <p class="mt-1">
                {{ option.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

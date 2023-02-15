<script setup lang="ts">
import ProviderCard from "~/components/builder/providerCard.vue";
import TriggerSelector from "~/components/builder/triggerSelector.vue";

defineProps({
  providers: {
    type: Array,
    required: true,
  },
});

const selectedProvider = ref();
const selectedTrigger = ref();

const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-primary">Select a trigger</h3>
    <div class="flex flex-wrap gap-4 mt-4">
      <ProviderCard
        class="cursor-pointer flex flex-row items-center"
        v-for="provider in providers"
        :key="provider.id"
        :name="provider.name"
        :description="provider.description"
        :logo="provider.logo"
        @click="selectedProvider = provider"
        :class="selectedProvider === provider ? 'border-accent' : 'border-gray-500'"
      />
      <TriggerSelector
        :triggers="selectedProvider.triggers"
        v-if="selectedProvider"
        v-model="selectedTrigger"
        @update:modelValue="updateValue"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProviderCard from "~/components/builder/providerCard.vue";
import ActionSelector from "~/components/builder/actionSelector.vue";

defineProps({
  providers: {
    type: Array,
    required: true,
  },
});

const selectedProvider = ref();
const selectedAction = ref();

const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string) {
  emit("update:modelValue", value);
}
</script>

<template>
  <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
    <h3 class="text-lg leading-6 font-medium text-primary">Select action</h3>
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
      <ActionSelector
        :actions="selectedProvider.actions"
        v-if="selectedProvider"
        v-model="selectedAction"
        @update:modelValue="updateValue"
      />
    </div>
  </div>
</template>

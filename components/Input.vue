<template>
  <input
    class="input"
    type="text"
    :placeholder="props.label"
    :value="props.value"
    v-on:input="updateValue($event.target.value)"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  value: String,
  label: String,
});
const emit = defineEmits(["update:modelValue"]);

function updateValue(value: string) {
  emit("update:modelValue", value);
}
</script>
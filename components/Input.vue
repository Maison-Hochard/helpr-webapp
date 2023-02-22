<template>
  <input
    class="input w-full"
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
const emit = defineEmits(["update:value"]);

function updateValue(value: string) {
  emit("update:value", value);
}
</script>

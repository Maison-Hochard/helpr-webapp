<script setup>
defineProps({
  variables: {
    type: Array,
    required: true,
  },
});

const value = ref("");

const showDropdown = ref(false);
function copyToClipboard(variable) {
  const input = document.createElement("input");
  input.setAttribute("value", variable);
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  useSuccessToast("Copied to clipboard");
  showDropdown.value = false;
}
</script>

<template>
  <div>
    <textarea class="input w-full" v-model="value" @focus="showDropdown = true" />
    <div v-if="showDropdown" class="dropdown">
      <div
        v-for="variable in variables"
        :key="variable"
        class="dropdown-item cursor-pointer"
        @click="copyToClipboard(variable)"
      >
        {{ variable }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const globalStore = useGlobalStore();

const availableThemes = ["dark", "light"];
const theme = ref("");

const setTheme = (newTheme: string) => {
  theme.value = newTheme;
  document.documentElement.setAttribute("data-theme", newTheme);
  globalStore.setTheme(newTheme);
  useLocalStorage("theme", newTheme).value = newTheme;
};

onMounted(() => {
  const userTheme = useLocalStorage("theme", "dark").value;
  if (userTheme) {
    setTheme(userTheme);
  }
});
</script>

<template>
  <select v-model="theme" @change="setTheme(theme)" class="input">
    <option v-for="theme in availableThemes" :key="theme" :value="theme">
      {{ theme }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { CheckIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const globalStore = useGlobalStore();

const availableThemes = [
  {
    name: "Dark",
    value: "dark",
    icon: MoonIcon
  },
  {
    name: "Light",
    value: "light",
    icon: SunIcon
  }
];
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
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton as="button"
                class="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-primary bg-secondary border border-transparent rounded-md hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <span class="mr-2">Theme</span>
      <div v-for="theme in availableThemes" :key="theme.value">
        <div v-if="theme.value === globalStore.theme">
          <component :is="theme.icon" class="w-5 h-5" />
        </div>
      </div>
    </MenuButton>
    <MenuItems as="div"
               class="absolute right-0 w-56 mt-2 origin-top-right bg-secondary divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <MenuItem v-for="theme in availableThemes" :key="theme.name" as="button" @click="setTheme(theme.value)"
                class="flex justify-between w-full px-4 py-2 text-sm text-primary hover:bg-secondary">
        <span>{{ theme.name }}</span>
        <CheckIcon class="w-5 h-5" v-if="theme.value === globalStore.theme" />
      </MenuItem>
    </MenuItems>
  </Menu>
</template>

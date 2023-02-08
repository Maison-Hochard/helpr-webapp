<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { CheckIcon, MoonIcon, SunIcon } from "@heroicons/vue/24/outline";

const globalStore = useGlobalStore();

const availableThemes = [
  {
    name: "Dark",
    value: "dark",
    icon: MoonIcon,
  },
  {
    name: "Light",
    value: "light",
    icon: SunIcon,
  },
];
const theme = ref({});

const setTheme = (newTheme: string) => {
  theme.value = newTheme;
  document.documentElement.setAttribute("data-theme", newTheme);
  globalStore.setTheme(newTheme);
  useLocalStorage("theme", newTheme).value = newTheme;
};

const themeName = computed(() => {
  return availableThemes.find((t) => t.value === theme.value)?.name;
});

onMounted(() => {
  const userTheme = useLocalStorage("theme", "dark").value;
  if (userTheme) {
    setTheme(userTheme);
  }
});
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      as="button"
      class="inline-flex gap-2 justify-center w-full px-4 py-2 text-sm font-medium text-primary border border-transparent rounded-md"
    >
      <span>{{ themeName }}</span>
      <div v-for="theme in availableThemes" :key="theme.value">
        <div v-if="theme.value === globalStore.theme">
          <component :is="theme.icon" class="w-5 h-5" />
        </div>
      </div>
    </MenuButton>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        as="div"
        class="absolute w-56 mt-2 origin-center bg-primary border border-muted divide-y divide-muted rounded-md shadow-lg outline-none"
      >
        <MenuItem
          v-for="theme in availableThemes"
          :key="theme.name"
          as="button"
          @click="setTheme(theme.value)"
          class="flex justify-between w-full px-4 py-2 text-sm text-primary hover:bg-secondary"
        >
          <span>{{ theme.name }}</span>
          <CheckIcon class="w-5 h-5" v-if="theme.value === globalStore.theme" />
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

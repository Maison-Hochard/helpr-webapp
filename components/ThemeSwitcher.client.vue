<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useLocalStorage } from "@vueuse/core";

defineProps({
  isText: {
    type: Boolean,
    default: true,
  },
});

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

const currentTheme = computed(() => {
  return availableThemes.find((t) => t.value === globalStore.getTheme);
});

const setTheme = (newTheme: string) => {
  globalStore.setTheme(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  useLocalStorage("theme", newTheme).value = newTheme;
};
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton
      as="button"
      class="inline-flex gap-2 justify-center w-full px-4 py-2 text-sm font-medium text-primary border border-transparent rounded-md"
    >
      <component :is="currentTheme.icon" class="w-5 h-5" />
      <span v-if="isText">{{ currentTheme.name }}</span>
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
        class="absolute mt-2 origin-center bg-primary border border-muted divide-y divide-muted rounded-md shadow-lg outline-none"
      >
        <MenuItem
          v-for="theme in availableThemes"
          :key="theme.name"
          as="button"
          @click="setTheme(theme.value)"
          class="flex justify-between w-full px-4 py-2 text-sm text-primary hover:bg-secondary"
        >
          <div class="flex items-center gap-2">
            <component :is="theme.icon" class="w-5 h-5" />
            <span>{{ theme.name }}</span>
          </div>
        </MenuItem>
      </MenuItems>
    </transition>
  </Menu>
</template>

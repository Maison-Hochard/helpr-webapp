<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useLocalStorage } from "@vueuse/core";

defineProps({
  isText: {
    type: Boolean,
    default: true,
  },
  isCard: {
    type: Boolean,
    default: false,
  },
});

const globalStore = useGlobalStore();

const availableThemes = [
  {
    name: "Lime",
    value: "lime",
    icon: MoonIcon,
  },
  {
    name: "Cosmos",
    value: "cosmos",
    icon: MoonIcon,
  },
  {
    name: "Ardent",
    value: "ardent",
    icon: MoonIcon,
  },
  {
    name: "Nebula",
    value: "nebula",
    icon: MoonIcon,
  },
  {
    name: "Light Lime",
    value: "light-lime",
    icon: SunIcon,
  },
  {
    name: "Light Cosmos",
    value: "light-cosmos",
    icon: SunIcon,
  },
  {
    name: "Light Ardent",
    value: "light-ardent",
    icon: SunIcon,
  },
  {
    name: "Light Nebula",
    value: "light-nebula",
    icon: SunIcon,
  },
];

const currentTheme = computed(() => {
  return availableThemes.find((t) => t.value === globalStore.getTheme);
});

const setTheme = (newTheme: string) => {
  globalStore.setTheme(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  useLocalStorage("helpr_theme", newTheme).value = newTheme;
};
</script>

<template>
  <div>
    <Menu as="div" class="relative inline-block text-left" v-if="!isCard">
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
    <div v-else class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      <div
        v-for="theme in availableThemes"
        :key="theme.name"
        :data-theme="theme.value"
        class="cursor-pointer bg-primary rounded-md p-3 w-full border-2 border-muted"
        :class="{ 'border-2 border-accent border-': currentTheme.value === theme.value }"
      >
        <div class="flex flex-col gap-2" @click="setTheme(theme.value)">
          <div class="flex gap-2">
            <component :is="theme.icon" class="w-5 h-5 text-accent" />
            <h3 class="text-sm font-medium text-primary">{{ theme.name }}</h3>
          </div>
          <div id="preview" class="mt-2 w-full flex flex-col gap-2">
            <div class="flex gap-2 w-full">
              <div class="bg-secondary rounded-full h-4 w-4"></div>
              <div class="bg-secondary rounded-md h-4 w-full"></div>
            </div>
            <div class="flex gap-2 w-full">
              <div class="bg-secondary rounded-md h-4 w-1/2"></div>
              <div class="bg-secondary rounded-md h-4 w-1/2"></div>
            </div>
            <div class="flex gap-2 w-full justify-center">
              <div class="bg-secondary rounded-full h-4 w-4"></div>
              <div class="bg-secondary rounded-full h-4 w-4"></div>
              <div class="bg-secondary rounded-full h-4 w-4"></div>
            </div>
            <div class="flex gap-2 w-full">
              <div class="gradient rounded-md h-4 w-1/3"></div>
            </div>
            <div class="flex gap-2 w-full">
              <div class="bg-secondary rounded-md h-4 w-1/2"></div>
              <div class="bg-secondary rounded-md h-4 w-1/2"></div>
            </div>
            <div class="bg-secondary rounded-md h-4 w-full"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

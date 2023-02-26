<script setup lang="ts">
import { MoonIcon, SunIcon } from "@heroicons/vue/24/outline";
import { useLocalStorage } from "@vueuse/core";
import ThemeCard from "~/components/settings/ThemeCard.vue";

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
const userStore = useUserStore();

const premium = {
  name: "Premium",
  value: "premium",
  icon: MoonIcon,
};

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
  return availableThemes.find((t) => t.value === globalStore.getTheme) || premium;
});

const setTheme = (newTheme: string) => {
  globalStore.setTheme(newTheme);
  document.documentElement.setAttribute("data-theme", newTheme);
  useLocalStorage("helpr_theme", newTheme).value = newTheme;
};
</script>

<template>
  <div>
    <div v-if="userStore.isPremium || userStore.isAdmin" class="w-full mb-8">
      <ThemeCard
        :key="premium.name"
        :data-theme="premium.value"
        :name="premium.name"
        :icon="premium.icon"
        :is-active="premium.value === currentTheme.value"
        :available-themes="availableThemes"
        @click="setTheme(premium.value)"
      />
    </div>
    <div class="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
      <ThemeCard
        v-for="theme in availableThemes"
        :key="theme.name"
        :data-theme="theme.value"
        :name="theme.name"
        :icon="theme.icon"
        :is-active="theme.value === currentTheme.value"
        :available-themes="availableThemes"
        @click="setTheme(theme.value)"
      />
    </div>
  </div>
</template>

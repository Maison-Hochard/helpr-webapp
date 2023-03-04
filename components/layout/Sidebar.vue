<script setup lang="ts">
import { ArrowLeftOnRectangleIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
import { Role } from "~/types/Role";
const { t } = useI18n();

const appNav = getNavigation("app");
const userNav = getNavigation("user");
const adminNav = getNavigation("admin");

const userStore = useUserStore();

const user = computed(() => {
  return userStore.getUser;
});

async function logout() {
  await useFetch("/api/auth/logout", {
    method: "POST",
  });
  useSuccessToast(t("profile.logout") + " " + user.value?.username ?? "");
  userStore.logout();
  useRouter().push("/login");
}
</script>

<template>
  <div>
    <div class="hidden fixed flex w-64 flex-col md:flex lg:flex-shrink-0 overflow-hidden h-full">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col border-r border-muted bg-primary">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <Logo :isText="true" :isLogo="true" />
          </div>
          <nav class="mt-5 flex-1" aria-label="Sidebar">
            <div class="space-y-1 px-2">
              <NuxtLink
                to="/app/builder/new-flow"
                class="mb-2 flex items-center px-2 py-2 text-sm font-medium rounded-md text-white gradient"
              >
                <PlusCircleIcon class="mr-3 flex-shrink-0 h-6 w-6 text-white" aria-hidden="true" />
                Create Flow
              </NuxtLink>
              <NuxtLink
                v-for="item in appNav"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.to === $route.path
                    ? 'bg-accent-faded text-accent'
                    : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
                :aria-current="item.name === $route.name ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.to === $route.path ? 'text-accent' : 'text-muted group-hover:text-accent',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </NuxtLink>
            </div>
            <hr class="my-5 border-t border-muted" aria-hidden="true" />
            <div class="space-y-1 px-2">
              <NuxtLink
                v-for="item in userNav"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.to === $route.path
                    ? 'bg-accent-faded text-accent'
                    : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
                :aria-current="item.name === $route.name ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.to === $route.path ? 'text-accent' : 'text-muted group-hover:text-accent',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </NuxtLink>
            </div>
            <hr class="my-5 border-t border-muted" aria-hidden="true" v-if="user && user.role === Role.ADMIN" />
            <div class="flex-1 space-y-1 px-2" v-if="user && user.role === Role.ADMIN">
              <NuxtLink
                v-for="item in adminNav"
                :key="item.name"
                :to="item.to"
                :class="[
                  item.to === $route.path
                    ? 'bg-accent-faded text-accent'
                    : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                  'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                ]"
                :aria-current="item.name === $route.name ? 'page' : undefined"
              >
                <component
                  :is="item.icon"
                  :class="[
                    item.to === $route.path ? 'text-accent' : 'text-muted group-hover:text-accent',
                    'mr-3 flex-shrink-0 h-6 w-6',
                  ]"
                  aria-hidden="true"
                />
                {{ item.name }}
              </NuxtLink>
            </div>
            <hr class="my-5 border-t border-muted" aria-hidden="true" />
            <div class="space-y-1 px-2">
              <button
                type="button"
                class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-accent-faded hover:text-accent"
                @click="logout"
              >
                <ArrowLeftOnRectangleIcon class="mr-3 h-6 w-6 flex-shrink-0 text-muted group-hover:text-accent-hover" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

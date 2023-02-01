<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CogIcon, SquaresPlusIcon, XMarkIcon } from "@heroicons/vue/24/outline";

const user = await useUser();

const default_avatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const sidebarOpen = ref(false);

const navigation = getNavigation("app");
const secondaryNavigation = [
  { name: "Apps", to: "#", icon: SquaresPlusIcon },
  { name: "Settings", to: "#", icon: CogIcon },
];
</script>

<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog
        as="div"
        class="relative z-40 lg:hidden"
        @close="sidebarOpen = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild
            as="template"
            enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full"
            enter-to="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0"
            leave-to="-translate-x-full"
          >
            <DialogPanel
              class="relative flex w-full max-w-xs flex-1 flex-col bg-primary focus:outline-none"
            >
              <TransitionChild
                as="template"
                enter="ease-in-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in-out duration-300"
                leave-from="opacity-100"
                leave-to="opacity-0"
              >
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false"
                  >
                    <span class="sr-only">Close sidebar</span>
                    <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <Logo :isText="false" />
                </div>
                <nav aria-label="Sidebar" class="mt-5">
                  <div class="space-y-1 px-2">
                    <NuxtLink
                      v-for="item in navigation"
                      :key="item.name"
                      :to="item.to"
                      :class="[
                        item.name === $route.name
                          ? 'bg-gray-100 text-primary'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-primary',
                        'group flex items-center px-2 py-2 text-base font-medium rounded-md',
                      ]"
                      :aria-current="
                        item.name === $route.name ? 'page' : undefined
                      "
                    >
                      <component
                        :is="item.icon"
                        :class="[
                          item.name === $route.name
                            ? 'text-gray-500'
                            : 'text-gray-400 group-hover:text-gray-500',
                          'mr-4 h-6 w-6',
                        ]"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                  <hr class="my-5 border-t border-muted" aria-hidden="true" />
                  <div class="space-y-1 px-2">
                    <NuxtLink
                      v-for="item in secondaryNavigation"
                      :key="item.name"
                      :to="item.to"
                      class="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-primary"
                    >
                      <component
                        :is="item.icon"
                        class="mr-4 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </NuxtLink>
                  </div>
                </nav>
              </div>
              <div class="flex flex-shrink-0 border-t border-muted p-4">
                <a to="#" class="group block flex-shrink-0">
                  <div class="flex items-center">
                    <div>
                      <img
                        class="inline-block h-10 w-10 rounded-full"
                        :src="user?.profilePicture || default_avatar"
                        alt=""
                      />
                    </div>
                    <div class="ml-3">
                      <p
                        class="text-base font-medium text-primary group-hover:text-primary"
                      >
                        {{ user.firstname }} {{ user.lastname }}
                      </p>
                      <p
                        class="text-sm font-medium text-muted group-hover:text-gray-700"
                      >
                        View profile
                      </p>
                    </div>
                  </div>
                </a>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:flex-shrink-0 overflow-hidden h-full">
      <div class="flex w-64 flex-col">
        <!-- Sidebar component, swap this element with another sidebar if you like -->
        <div
          class="flex min-h-0 flex-1 flex-col border-r border-muted bg-primary"
        >
          <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div class="flex flex-shrink-0 items-center px-4">
              <Logo :isText="false" :isLogo="true" />
            </div>
            <nav class="mt-5 flex-1" aria-label="Sidebar">
              <div class="space-y-1 px-2">
                <NuxtLink
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.to"
                  :class="[
                    item.name === $route.name
                      ? 'bg-accent-faded text-accent'
                      : 'text-gray-600 hover:bg-accent-faded hover:text-accent',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md',
                  ]"
                  :aria-current="item.name === $route.name ? 'page' : undefined"
                >
                  <component
                    :is="item.icon"
                    :class="[
                      item.name === $route.name
                        ? 'text-accent'
                        : 'text-muted group-hover:text-accent',
                      'mr-3 flex-shrink-0 h-6 w-6',
                    ]"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </div>
              <hr class="my-5 border-t border-muted" aria-hidden="true" />
              <div class="flex-1 space-y-1 px-2">
                <NuxtLink
                  v-for="item in secondaryNavigation"
                  :key="item.name"
                  :to="item.to"
                  class="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-muted hover:bg-accent-faded hover:text-accent"
                >
                  <component
                    :is="item.icon"
                    class="mr-3 h-6 w-6 flex-shrink-0 text-muted group-hover:text-accent-hover"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </div>
            </nav>
          </div>
          <div class="flex flex-shrink-0 border-t border-muted p-4">
            <NuxtLink
              to="/app/profile"
              class="group block w-full flex-shrink-0"
            >
              <div class="flex items-center">
                <div>
                  <img
                    class="inline-block h-9 w-9 rounded-full"
                    :src="user?.profilePicture || default_avatar"
                    alt=""
                  />
                </div>
                <div class="ml-3">
                  <p
                    class="text-sm font-medium text-gray-700 group-hover:text-primary"
                  >
                    {{ user.firstname }} {{ user.lastname }}
                  </p>
                  <p
                    class="text-xs font-medium text-gray-500 group-hover:text-muted"
                  >
                    View profile
                  </p>
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

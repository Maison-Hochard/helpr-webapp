<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

const navigation = getNavigation("home");

const user = useUserStore().getUser;
</script>

<template>
  <Disclosure as="nav" class="backdrop-blur-lg bg-primary-opacity/40 sticky top-0 z-10" v-slot="{ open }">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-14 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            <span class="sr-only">Open main menu</span>
            <i class="fas fa-bars" v-if="!open"></i>
            <i class="fas fa-times" v-else></i>
          </DisclosureButton>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <div class="flex flex-shrink-0 items-center">
            <Logo :isText="true" />
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <NuxtLink
                v-for="item in navigation"
                :to="{ name: item.name }"
                :key="item.name"
                class="text-primary font-medium transition duration-300 ease-in-out"
                :class="[
                  item.name === $route.name
                    ? 'bg-accent-faded text-accent hover:text-muted'
                    : 'text-primary hover:text-muted',
                  'px-4 py-1 rounded-md text-sm font-medium',
                ]"
              >
                {{ $t("navigation." + item.name.toLowerCase()) }}
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="absolute gap-5 inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <LanguageSelector class="hidden md:flex px-2 py-1" />
          <div class="hidden tablet:block h-6 w-px bg-accent-faded border-l border-gray-200 border-opacity-25"></div>
          <client-only>
            <NuxtLink
              v-if="user"
              to="/app/profile"
              class="text-inverted bg-accent hover:bg-accent-hover px-4 py-1 rounded-md text-sm font-medium"
            >
              <span class="ml-2">Open App</span>
            </NuxtLink>
            <div v-else class="hidden tablet:flex gap-2">
              <NuxtLink
                :to="{ name: 'Login' }"
                class="text-primary hover:bg-gray-800 hover:text-white px-4 py-1 rounded-md text-sm font-medium"
              >
                {{ $t("navigation.login") }}
              </NuxtLink>
              <NuxtLink
                :to="{ name: 'Signup' }"
                class="text-inverted bg-accent hover:bg-accent-hover px-4 py-1 rounded-md text-sm font-medium"
              >
                {{ $t("navigation.signup") }}
              </NuxtLink>
            </div>
          </client-only>
        </div>
      </div>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0"
      enter-to-class="transform opacity-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <DisclosurePanel class="sm:hidden" v-slot="{ close }">
        <div class="space-y-1 px-2 pt-2 pb-3">
          <NuxtLink
            @click="close()"
            v-for="item in navigation"
            :to="{ name: item.name }"
            :key="item.name"
            :class="[
              item.name === $route.name
                ? 'bg-accent-faded text-accent'
                : 'text-gray-300 hover:bg-gray-800 hover:text-white',
              'block px-4 py-1 rounded-md text-primary font-medium',
            ]"
          >
            {{ $t("navigation." + item.name.toLowerCase()) }}
          </NuxtLink>
        </div>
        <div class="flex flex-col items-center justify-center py-5">
          <LanguageSelector :isText="true" />
        </div>
        <client-only>
          <div class="py-5 border-t border-gray-800 items-center text-center" v-if="!user">
            <NuxtLink
              @click="close()"
              :to="{ name: 'Login' }"
              class="text-primary hover:bg-gray-800 hover:text-white px-4 py-1 rounded-md text-sm font-medium"
            >
              {{ $t("navigation.login") }}
            </NuxtLink>
            <NuxtLink
              @click="close()"
              :to="{ name: 'Signup' }"
              class="text-inverted bg-accent hover:bg-accent-hover px-4 py-1 rounded-md text-sm font-medium"
            >
              {{ $t("navigation.signup") }}
            </NuxtLink>
          </div>
        </client-only>
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>

<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel, Dialog, DialogPanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";
import LanguageSelector from "~/components/settings/LanguageSelector.vue";

const navigation = getNavigation("home");

const user = computed(() => {
  return useUserStore().getUser;
});

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="backdrop-blur-lg bg-primary-opacity/40 sticky top-0 z-10">
    <nav class="mx-auto flex max-w-7xl items-center justify-between py-3 px-4" aria-label="Global">
      <div class="flex flex-1">
        <div class="hidden lg:flex lg:gap-x-12">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="text-sm font-semibold leading-6 text-primary hover:text-accent"
            >{{ $t(item.name.toLowerCase()) }}</NuxtLink
          >
        </div>
        <div class="flex lg:hidden">
          <button
            type="button"
            class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-primary"
            @click="mobileMenuOpen = true"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon class="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>
      <Logo :isText="true" :size="6" />
      <div class="flex flex-1 justify-end items-center gap-x-4">
        <LanguageSelector />
        <div v-if="!user" class="hidden lg:flex lg:gap-x-4">
          <NuxtLink to="/login" class="btn-primary py-1">{{ $t("login") }}</NuxtLink>
          <NuxtLink to="/signup" class="btn-secondary py-1">{{ $t("signup") }}</NuxtLink>
        </div>
        <NuxtLink to="/app/my-flows" class="hidden md:block btn-secondary py-1" v-else>Open app</NuxtLink>
      </div>
    </nav>
    <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
      <div class="fixed inset-0 z-10" />
      <DialogPanel class="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-primary py-3 px-4">
        <div class="flex items-center justify-between">
          <div class="flex flex-1">
            <button type="button" class="-m-2.5 rounded-md p-2.5 text-primary" @click="mobileMenuOpen = false">
              <span class="sr-only">Close menu</span>
              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Logo :isText="true" :size="6" />
        </div>
        <div class="mt-6 space-y-2">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.to"
            class="-mx-3 block rounded-lg py-2 px-3 text-base font-semibold leading-7 text-primary hover:bg-gray-50"
            >{{ $t(item.name.toLowerCase()) }}</NuxtLink
          >
        </div>
        <div class="mt-10 flex flex-col gap-y-2">
          <LanguageSelector :is-text="true" />
          <div class="flex flex-col gap-y-2" v-if="!user">
            <NuxtLink to="/login" class="btn-primary py-1">{{ $t("login") }}</NuxtLink>
            <NuxtLink to="/signup" class="btn-secondary py-1">{{ $t("signup") }}</NuxtLink>
          </div>
          <NuxtLink to="/app/my-flows" class="btn-secondary py-1" v-else>Open app</NuxtLink>
        </div>
      </DialogPanel>
    </Dialog>
  </header>
</template>

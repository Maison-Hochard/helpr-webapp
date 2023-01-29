<script setup lang="ts">
import { MenuButton, Menu, MenuItems } from "@headlessui/vue";
import { User } from "@prisma/client";
import { Role } from "~/types/Role";

const profile_navigation = [
  { name: "Home" },
  { name: "Profile" },
  { name: "Settings" },
];

const user = useState<User | null>("user");

if (user.value?.role === Role.ADMIN) {
  profile_navigation.push({ name: "Dashboard" });
}

const default_avatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

// const config = useRuntimeConfig();

const logout = async () => {
  await useFetch("/api/auth/logout", {
    method: "POST",
  });
  useState("user").value = null;
  useRouter().push("/");
};
</script>

<template>
  <Menu as="div" class="relative ml-3">
    <div>
      <MenuButton
        class="flex rounded-full bg-gray-800 text-sm focus:outline-none"
      >
        <span class="sr-only">Open user menu</span>
        <img
          class="h-8 w-8 rounded-full"
          :src="user?.profilePicture || default_avatar"
          alt=""
        />
      </MenuButton>
    </div>
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <NuxtLink
          v-for="item in profile_navigation"
          :to="{ name: item.name }"
          :key="item.name"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          :class="[
            item.name === $route.name ? 'bg-gray-100' : '',
            'block px-4 py-2 text-sm text-gray-700',
          ]"
          role="menuitem"
          >{{ item.name }}</NuxtLink
        >
        <div
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-red-700 hover:text-white cursor-pointer"
          @click="logout"
        >
          Logout
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

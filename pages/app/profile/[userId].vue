<script setup lang="ts">
import { LinkIcon } from "@heroicons/vue/24/outline";
const userId = useRoute().params.userId;

const { data: user, error } = await useFetch("/api/getUserById", {
  key: "getUserById-" + userId,
  method: "GET",
  params: {
    userId,
  },
});

if (error.value !== null && !user.value) {
  throw createError({ statusCode: 404, message: "User not found" });
}

useHead({
  title: "Profile - " + user.value?.firstname + " " + user.value?.lastname,
  meta: [
    {
      name: "description",
      content: "Profile",
    },
  ],
});
</script>

<template>
  <div class="relative z-0 flex flex-1 overflow-hidden bg-primary">
    <main class="relative z-0 flex-1 focus:outline-none xl:order-last">
      <article>
        <div>
          <div>
            <img class="h-32 w-full object-cover lg:h-48" :src="user.cover" alt="" />
          </div>
          <div class="mx-auto px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:items-end sm:space-x-5">
              <div class="flex">
                <img
                  class="h-24 w-24 rounded-full ring-2 ring-white sm:h-32 sm:w-32 object-cover"
                  :src="user.avatar"
                  alt=""
                />
              </div>
              <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <div class="flex items-center justify-between">
                    <h1 class="truncate text-2xl font-bold text-primary">{{ user.firstname }} {{ user.lastname }}</h1>
                    <div class="flex items-center space-x-2 cursor-pointer" @click="copyProfileLink(user.id)">
                      <LinkIcon class="h-5 w-5 text-muted" />
                    </div>
                  </div>
                  <div class="sm:col-span-2 mt-5">
                    <dt class="text-sm font-medium text-gray-500">Bio</dt>
                    <dd class="mt-1 max-w-prose space-y-5 text-sm text-primary" v-html="user.bio" />
                  </div>
                </div>
              </div>
            </div>
            <div class="hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <div class="flex items-center justify-between">
                <h1 class="truncate text-2xl font-bold text-primary">{{ user.firstname }} {{ user.lastname }}</h1>
                <div class="flex items-center space-x-2 cursor-pointer" @click="copyProfileLink(user.id)">
                  <LinkIcon class="h-5 w-5 text-muted" />
                  <p class="text-sm text-muted">Copy link to profile</p>
                </div>
              </div>
              <div class="sm:col-span-2 mt-5">
                <dt class="text-sm font-medium text-gray-500">Bio</dt>
                <dd class="mt-1 max-w-prose space-y-5 text-sm text-primary" v-html="user.bio || bio" />
              </div>
            </div>
          </div>
        </div>
        <hr class="border-muted my-8" />
        <div id="public-flows" class="mt-8 m-6">
          <div class="mb-10">
            <h2 class="text-lg leading-6 font-medium text-primary">Public flows</h2>
            <p class="mt-1 text-sm text-gray-500">This is a list of all public flows.</p>
          </div>
          <FlowLoader :nb-items="5" />
        </div>
      </article>
    </main>
  </div>
</template>

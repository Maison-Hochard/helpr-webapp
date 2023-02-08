<script setup>
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/20/solid";
import { useUserStore } from "~/store/userStore";
definePageMeta({
  name: "Profile",
  title: "Profile",
});

const user = useUserStore().getUser;

const coverImageUrl =
  "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80";

const bio = "Not much to say here, just a test user.";
</script>

<template>
  <div class="relative z-0 flex flex-1 overflow-hidden bg-primary">
    <main class="relative z-0 flex-1 focus:outline-none xl:order-last">
      <article>
        <div>
          <div>
            <img
              class="h-32 w-full object-cover lg:h-48"
              :src="coverImageUrl"
              alt=""
            />
          </div>
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div class="flex">
                <img
                  class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  :src="user.avatar"
                  alt=""
                />
              </div>
              <div
                class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
              >
                <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 class="truncate text-2xl font-bold text-primary">
                    {{ user.firstname }} {{ user.lastname }}
                  </h1>
                </div>
                <div
                  class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-inverted shadow-sm hover:bg-accent-hover"
                  >
                    <EnvelopeIcon
                      class="-ml-1 mr-2 h-5 w-5 text-inverted"
                      aria-hidden="true"
                    />
                    <span>Email</span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-inverted shadow-sm hover:bg-accent-hover"
                  >
                    <PhoneIcon
                      class="-ml-1 mr-2 h-5 w-5 text-inverted"
                      aria-hidden="true"
                    />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 class="truncate text-2xl font-bold text-primary">
                {{ user.firstname }} {{ user.lastname }}
              </h1>
            </div>
          </div>
        </div>
        <hr class="border-muted my-8" />
        <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">Bio</dt>
              <dd
                class="mt-1 max-w-prose space-y-5 text-sm text-primary"
                v-html="user.bio || bio"
              />
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-primary">{{ user.email }}</dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  </div>
</template>

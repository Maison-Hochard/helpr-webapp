<script setup lang="ts">
import { Plans } from "~/types/Pricing";
import { useUserStore } from "~/store/userStore";

definePageMeta({
  name: "Edit Profile",
  title: "Edit Profile"
});

const userStore = useUserStore();

const user = userStore.getUser;

const updateProfile = async () => {
  await userStore.updateUser();
};

const deleteAccount = async () => {
  await userStore.deleteUser();
};
</script>

<template>
  <form class="space-y-6 p-4" @submit.prevent="updateProfile">
    <div class="bg-secondary px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">Profile</h3>
          <p class="mt-1 text-sm text-muted">This information will be displayed publicly so be careful what you
            share.</p>
        </div>
        <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
          <div id="username" class="flex items-center space-x-2">
            <label for="username" class="block text-sm font-medium text-muted">Username</label>
            <Input :value="user.username" :label="'Username'" @update:modelValue="user.username = $event" />
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-muted">Bio</label>
            <div class="mt-1">
              <textarea id="about" name="about" rows="3"
                        class="bg-primary p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm"
                        placeholder="Hi there! I'm new here." v-model="user.bio"></textarea>
            </div>
            <p class="mt-2 text-sm text-muted">Brief description for your profile. URLs are hyperlinked.</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-muted">Profile Picture</label>
            <div class="mt-1 flex items-center space-x-5">
              <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                <img :src="user.avatar" alt="" />
              </span>
              <button type="button"
                      class="rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-muted shadow-sm hover:bg-gray-50">
                Change
              </button>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-muted">Cover photo</label>
            <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-600 px-6 pt-5 pb-6">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-muted" stroke="currentColor" fill="none" viewBox="0 0 48 48"
                     aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="flex text-sm text-gray-600">
                  <label for="file-upload"
                         class="relative cursor-pointer rounded-md font-medium text-accent hover:text-accent-hover">
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" class="sr-only" />
                  </label>
                  <p class="pl-1">or drag and drop</p>
                </div>
                <p class="text-xs text-muted">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
            <div class="flex justify-end mt-5">
              <button type="button"
                      class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-muted shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                Cancel
              </button>
              <button type="submit" class="bg-accent rounded-md px-5 ml-4 hover:bg-accent-hover">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">Personal Information</h3>
          <p class="mt-1 text-sm text-muted">Use a permanent address where you can receive mail.</p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium text-muted">First name</label>
              <Input :value="user.firstname" :label="'firstname'" @update:modelValue="user.firstname = $event" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium text-muted">Last name</label>
              <Input :value="user.lastname" :label="'lastname'" @update:modelValue="user.lastname = $event" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="email-address" class="block text-sm font-medium text-muted">Email address</label>
              <Input :value="user.email" :label="'email'" @update:modelValue="user.email = $event" />
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button type="button"
                    class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-muted shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              Cancel
            </button>
            <button type="submit" class="bg-accent rounded-md px-5 ml-4 hover:bg-accent-hover">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">Manage Subscription</h3>
        <div class="my-2 max-w-xl text-sm text-muted">
          <p>
            You can manage your subscription here. If you cancel your subscription, you will lose access to all premium
            features.
          </p>
        </div>
        <div>
          <div v-if="user.Subscription.length > 0 && user.Subscription && user.Subscription[0].name === 'Pro'">
            <i class="fas fa-check-circle text-green-600"></i> {{ user.Subscription[0].name }}
          </div>
          <div v-if="user.Subscription.length > 0 && user.Subscription && user.Subscription[0].name === 'Trial'">
            <i class="fas fa-check-circle text-yellow-600"></i> {{ user.Subscription[0].name }}
          </div>
          <div v-else>
            <i class="fas fa-times-circle text-red-600"></i> No subscription
          </div>
        </div>
        <div class="mt-5 flex gap-4">
          <client-only>
            <form action="/api/stripe/subscribe" method="post">
              <input type="hidden" name="userId" :value="user.id" />
              <button
                name="priceId"
                :value="Plans.PRO.priceId"
                type="submit"
                class="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                S'abonner
              </button>
            </form>
            <form action="/api/stripe/createPortalSession" method="post">
              <button
                type="submit"
                name="stripeCustomerId"
                :value="user.stripeCustomerId"
                class="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Manage Subscription
              </button>
            </form>
          </client-only>
        </div>
      </div>
    </div>

    <div class="bg-secondary shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">Delete your account</h3>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>Once you delete your account, you will lose all data associated with it.</p>
        </div>
        <div class="mt-5">
          <button type="button" class="bg-red-600 text-inverted px-4 py-2 rounded-md sm:text-sm" @click="deleteAccount">
            Delete account
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
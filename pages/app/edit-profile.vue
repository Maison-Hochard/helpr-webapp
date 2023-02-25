<script setup lang="ts">
import { Plans } from "~/types/Pricing";
import { useUserStore } from "~/store/userStore";
import AvatarUpload from "~/components/upload/AvatarUpload.vue";
import CoverUpload from "~/components/upload/CoverUpload.vue";

definePageMeta({
  name: "Edit Profile",
  title: "Edit Profile",
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
  <form class="space-y-6" @submit.prevent="updateProfile">
    <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">Profile</h3>
          <p class="mt-1 text-sm text-muted">
            This information will be displayed publicly so be careful what you share.
          </p>
        </div>
        <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
          <div id="username" class="flex items-center space-x-2">
            <label for="username" class="block text-sm font-medium text-muted">Username</label>
            <Input :value="user.username" :label="'Username'" @update:value="user.username = $event" />
          </div>

          <div>
            <label for="about" class="block text-sm font-medium text-muted">Bio</label>
            <div class="mt-1">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="bg-primary p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Hi there! I'm new here."
                v-model="user.bio"
              ></textarea>
            </div>
            <p class="mt-2 text-sm text-muted">Brief description for your profile. URLs are hyperlinked.</p>
          </div>
          <AvatarUpload />
          <CoverUpload />
        </div>
      </div>
    </div>

    <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">Personal Information</h3>
          <p class="mt-1 text-sm text-muted">Use a permanent address where you can receive mail.</p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium text-muted">First name</label>
              <Input :value="user.firstname" :label="'firstname'" @update:value="user.firstname = $event" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium text-muted">Last name</label>
              <Input :value="user.lastname" :label="'lastname'" @update:value="user.lastname = $event" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="email-address" class="block text-sm font-medium text-muted">Email address</label>
              <Input :value="user.email" :label="'email'" @update:value="user.email = $event" />
            </div>
          </div>
          <div class="flex justify-end mt-5 gap-2">
            <button
              type="button"
              class="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-muted shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Cancel
            </button>
            <button type="submit" class="btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary shadow rounded-lg">
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
            <i class="fas fa-check-circle text-green-600"></i>
            {{ user.Subscription[0].name }}
          </div>
          <div v-if="user.Subscription.length > 0 && user.Subscription && user.Subscription[0].name === 'Trial'">
            <i class="fas fa-check-circle text-yellow-600"></i>
            {{ user.Subscription[0].name }}
          </div>
          <div v-else><i class="fas fa-times-circle text-red-600"></i> No subscription</div>
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

    <div class="bg-secondary shadow rounded-lg">
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

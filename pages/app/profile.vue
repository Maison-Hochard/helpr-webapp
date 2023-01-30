<script setup lang="ts">
import { User } from "@prisma/client";
import { AvailablePlans } from "~/types/Pricing";

definePageMeta({
  name: "Profile",
  title: "Profile",
  description: "Profile"
});

const user = await useUser();

const { data: subscription, pending, refresh } = await useLazyFetch("/api/stripe/currentSubscription", {
  method: "POST",
  body: { userId: user?.id }
});

const updateProfile = async () => {
  if (confirm("Are you sure you want to update your profile?")) {
    if (user) {
      const { data: updatedUser } = await useFetch<User>("/api/user/" + user.id, {
        method: "PUT",
        body: user
      });
      useState("user").value = updatedUser.value;
      refresh();
    }
  }
};

const deleteAccount = async () => {
  if (confirm("Are you sure you want to delete your account?")) {
    if (user) {
      await useFetch("/api/user/" + user.id, {
        method: "DELETE"
      });
      useState("user").value = null;
      useRouter().push("/");
    }
  }
};
</script>

<template>
  <div>
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">
        Personal Information
      </h3>
      <p class="mt-1 text-sm text-muted">
        Use a permanent address where you can receive mail.
      </p>
      <Loader v-if="!user" />
      <div v-else>
        <div class="flex flex-row mt-10 gap-5">
          <div>
            <label for="firstname" class="block text-sm font-medium text-muted"
            >Firstname</label
            >
            <input
              type="text"
              name="firstname"
              id="firstname"
              autocomplete="firstname"
              v-model="user.firstname"
              class="input mt-1"
            />
          </div>
          <div>
            <label for="firstname" class="block text-sm font-medium text-muted"
            >Lastname</label
            >
            <input
              type="text"
              name="lastname"
              id="lastname"
              autocomplete="lastname"
              v-model="user.lastname"
              class="input mt-1"
            />
          </div>
        </div>
        <div class="mt-6">
          <label for="email" class="block text-sm font-medium text-muted"
          >Email address</label
          >
          <input
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            v-model="user.email"
            class="input mt-1"
          />
        </div>
      </div>
      <h3 class="text-lg font-medium leading-6 text-primary mt-10">
        Subscription
      </h3>
      <p class="mt-1 text-sm text-muted mb-5">
        Manage your subscription
      </p>
      <Loader v-if="pending" />
      <div v-else>
        <div v-if="subscription && subscription.stripeStatus === 'active'">
          <i class="fas fa-check-circle text-green-600"></i> Premium
        </div>
        <div v-else-if="subscription && subscription.stripeStatus === 'trialing'">
          <i class="fas fa-check-circle text-green-600"></i> Premium (trialing)
        </div>
        <div v-else>
          <i class="fas fa-times-circle text-red-600"></i> Free
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-4">
      <form action="/api/stripe/subscribe" method="post">
        <input type="hidden" name="userId" :value="user.id" />
        <button
          name="priceId"
          :value="AvailablePlans.PRO"
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
      <button
        @click="deleteAccount"
        type="button"
        class="rounded-md bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm"
      >
        Delete Account
      </button>
      <button
        @click="updateProfile"
        class="rounded-md border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700"
      >
        Save changes
      </button>
    </div>
  </div>
</template>

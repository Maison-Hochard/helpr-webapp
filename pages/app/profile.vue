<script setup lang="ts">
import { User } from ".prisma/client";

definePageMeta({
  name: "Profile",
  title: "Profile",
  description: "Profile",
});

const user = await useUser();

const updateProfile = async () => {
  if (user) {
    const response = await useAPI<User>("user/" + user.id, "PATCH", user);
    if (response) {
      useState("user").value = response;
    }
  }
};

const deleteAccount = async () => {
  if (confirm("Are you sure you want to delete your account?")) {
    const response = await useAPI<User>("user/" + user.id, "DELETE");
    if (response) {
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
    </div>

    <div class="flex justify-end gap-4">
      <form action="/api/stripe/subscribe" method="post">
        <button
          name="priceId"
          value="price_1MTtgFCk9AfBe7l2i8spjHK5"
          type="submit"
          class="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          S'abonner
        </button>
      </form>
      <button
        @click="whoAmI"
        type="button"
        class="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
      >
        Test Self Endpoint (see console)
      </button>
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

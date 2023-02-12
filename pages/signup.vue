<script setup lang="ts">
definePageMeta({
  name: "Signup",
  title: "Signup",
});

const username = ref("");
const firstname = ref("");
const lastname = ref("");
const email = ref("");
const password = ref("");
const passwordConfirm = ref("");

const loading = ref(false);

const signup = async () => {
  loading.value = true;
  await useSignup({
    username: username.value,
    firstname: firstname.value,
    lastname: lastname.value,
    email: email.value,
    password: password.value,
  });
  loading.value = false;
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="../assets/media/helpr-logo-icon-md-blanc.svg" alt="Helpr" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">Sign up for your account</h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md mt-12">
      <Loader v-if="loading" />
      <form class="space-y-6" @submit.prevent="signup" v-else>
        <input
          id="username"
          name="username"
          autocomplete="username"
          required
          placeholder="Username"
          class="input w-full"
          v-model="username"
        />
        <div class="flex flex-row gap-2">
          <input
            id="firstname"
            name="firstname"
            autocomplete="firstname"
            required
            placeholder="Firstname"
            class="input w-full"
            v-model="firstname"
          />
          <input
            id="lastname"
            name="lastname"
            autocomplete="lastname"
            required
            placeholder="Lastname"
            class="input w-full"
            v-model="lastname"
          />
        </div>
        <input
          id="email"
          name="email"
          type="email"
          autocomplete="email"
          required
          placeholder="Email"
          class="input w-full"
          v-model="email"
        />
        <input
          id="password"
          name="password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Password"
          class="input w-full"
          v-model="password"
        />
        <input
          id="confirm-password"
          name="confirm-password"
          type="password"
          autocomplete="current-password"
          required
          placeholder="Confirm Password"
          class="input w-full"
          v-model="passwordConfirm"
        />
        <div>
          <button type="submit" class="btn-primary w-full">Sign up</button>
        </div>
      </form>
      <NuxtLink :to="{ name: 'Login' }" class="btn-secondary w-full mt-6">
        Already have an account ? Login here
      </NuxtLink>
    </div>
  </div>
</template>

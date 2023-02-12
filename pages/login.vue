<script setup lang="ts">
definePageMeta({
  name: "Login",
  title: "Login",
  description: "Login to your account",
});

const login = ref("");
const password = ref("");

const loading = ref(false);

async function signin() {
  loading.value = true;
  await useLogin(login.value, password.value);
  loading.value = false;
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="../assets/media/helpr-logo-icon-md-blanc.svg" alt="Helpr" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">Sign in to your account</h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md mt-12">
      <Loader v-if="loading" />
      <form class="space-y-6" @submit.prevent="signin" v-else>
        <div>
          <div class="mt-1">
            <input
              id="login"
              name="login"
              autocomplete="email"
              required
              placeholder="Login"
              class="input w-full"
              v-model="login"
            />
          </div>
        </div>
        <div>
          <div class="mt-1">
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
          </div>
        </div>
        <div class="flex items-center justify-end">
          <div class="text-sm">
            <NuxtLink :to="{ name: 'ForgotPassword' }" class="font-medium text-accent hover:text-accent-hover"
              >Forgot your password?
            </NuxtLink>
          </div>
        </div>

        <div>
          <button type="submit" class="btn-primary w-full">Sign in</button>
        </div>
      </form>
      <NuxtLink :to="{ name: 'Signup' }" class="btn-secondary w-full mt-6"> Don't have an account ? Sign up </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import LanguageSelector from "~/components/settings/LanguageSelector.vue";
const { t } = useI18n();

import { User } from "~/types/User";

definePageMeta({
  name: "Login",
  title: "Login",
  description: "Login to your account",
});

const user = computed(() => useUserStore().getUser);

watch(user, (user) => {
  if (user) {
    useRouter().push("/app/my-flows");
  }
});

const login = ref("");
const password = ref("");

const loading = ref(false);

async function signin() {
  loading.value = true;
  const { data, error } = await useFetch<User>("/api/auth/login", {
    method: "POST",
    body: {
      login: login.value,
      password: password.value,
    },
  });
  if (data.value) {
    useSuccessToast(t("login.welcome_back") + " " + data.value.username);
    useUserStore().setUser(data.value);
    useUserStore().setSubscription(data.value.subscription);
    useRouter().push("/app/my-flows");
  } else if (error.value?.statusMessage === "user_not_found") {
    useErrorToast(t("error.user_not_found"));
  } else if (error.value?.statusMessage === "invalid_password") {
    useErrorToast(t("error.invalid_password"));
  } else {
    useErrorToast(t("error.unknown_error"));
  }
  loading.value = false;
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <Logo :isText="false" class="flex justify-center" :size="12" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-primary">
        {{ $t("login.signin_to_your_account") }}
      </h2>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md mt-12">
      <form class="space-y-4" @submit.prevent="signin">
        <div>
          <div class="mt-1">
            <input
              id="login"
              name="login"
              autocomplete="email"
              required
              :placeholder="$t('login.login')"
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
              :placeholder="$t('login.password')"
              class="input w-full"
              v-model="password"
            />
          </div>
        </div>
        <div class="flex items-center justify-end">
          <div class="text-sm">
            <NuxtLink to="/password/forgot" class="font-medium text-accent hover:text-accent-hover"
              >{{ $t("login.forgot_password") }}
            </NuxtLink>
          </div>
        </div>
        <ButtonPrimary :full-width="true" :pending="loading" :text="$t('login.signin')" type="submit" />
      </form>
      <NuxtLink :to="{ name: 'Signup' }" class="btn-secondary w-full mt-6">{{
        $t("login.dont_have_an_account")
      }}</NuxtLink>
    </div>
    <div class="sm:mx-auto sm:w-full sm:max-w-md flex flex-col justify-center items-center">
      <LanguageSelector :is-text="true" class="mt-6" />
    </div>
  </div>
</template>

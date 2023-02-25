<script lang="ts" setup>
import { addCredentials, getAuthenticatedProviders } from "~/composables/useProvider";
import { getGithubToken } from "~/composables/Provider/useGithub";
import LoginWithGoogle from "~/components/loginWithGoogle.vue";

definePageMeta({
  name: "Providers",
  title: "Connect Services",
});

const {
  data: userProviders,
  refresh: refreshUserProviders,
  pending: pendingUserProviders,
} = await useLazyAsyncData(async () => {
  // return await getUserProviders();
});

const {
  data: providers,
  refresh: refreshProviders,
  pending: pendingProviders,
} = await useLazyAsyncData(async () => {
  return await getProviders();
});

const linearKey = ref("");
const githubKey = ref("");

function isConnected(service: string) {
  if (!providers.value) return false;
  for (const provider of providers.value) {
    if (provider.provider === service) {
      return true;
    }
  }
  return false;
}

const code = computed(() => {
  const route = useRoute();
  return route.query.code;
});

const githubConfig = useRuntimeConfig().public.github;

const githubUrl =
  "https://github.com/login/oauth/authorize" +
  "?client_id=" +
  githubConfig.clientId +
  "&redirect_uri=" +
  githubConfig.callbackUrl +
  "&response_type=code" +
  "&scope=repo,read:user,user:email";
</script>

<template>
  <div>
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">Add your tokens</h3>
      <p class="mt-1 text-sm text-muted">Add your tokens to connect your services.</p>
      <LoginWithGoogle class="p-2" />
      <button class="btn-secondary p-2">
        <NuxtLink :to="githubUrl" class="flex flex-row gap-5 items-center">
          <ProviderLogo :provider="'github'" />
          <span>Connect Github</span>
        </NuxtLink>
      </button>
      <button @click="getGithubToken(code)" class="btn-secondary flex flex-row gap-5 items-center" v-if="code">
        <ProviderLogo :provider="'github'" />
        <span>Github Token</span>
      </button>
      <Loader v-if="pendingProviders" />
      <div class="flex flex-row mt-10 gap-5" v-else>
        <CreateCredential
          v-for="provider in providers"
          :key="provider.provider"
          :is-connected="isConnected(provider.provider)"
          :refresh-user-providers="refreshUserProviders"
          :provider-name="provider.provider"
        />
      </div>
    </div>
  </div>
</template>

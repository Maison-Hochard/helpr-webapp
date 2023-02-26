<script lang="ts" setup>
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
  return await getUserProviders();
});

const {
  data: providers,
  refresh: refreshProviders,
  pending: pendingProviders,
} = await useLazyAsyncData(async () => {
  return await getProviders();
});

function isConnected(provider: string) {
  if (!userProviders) return false;
  return userProviders.value.some((userProvider) => userProvider.name.toLowerCase() === provider.toLowerCase());
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

const tokenProviders = ["github", "linear", "stripe", "notion"];
const filteredProviders = computed(() => {
  if (!providers.value) return [];
  return providers.value.filter((provider) => tokenProviders.includes(provider.name.toLowerCase()));
});

const connectedProviders = computed(() => {
  if (!userProviders.value) return [];
  return userProviders.value.filter((provider) => tokenProviders.includes(provider.name.toLowerCase()));
});

const deconnectedProviders = computed(() => {
  if (!userProviders.value) return [];
  return filteredProviders.value.filter(
    (provider) =>
      !userProviders.value.some((userProvider) => userProvider.name.toLowerCase() === provider.name.toLowerCase()),
  );
});
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
      <div class="flex flex-col mt-10 gap-4" v-else>
        <hr class="border-primary" />
        <label class="block text-sm font-medium text-primary">Connected services</label>
        <CreateCredential
          v-for="provider in connectedProviders"
          :key="provider.provider"
          :is-connected="false"
          :refresh-user-providers="refreshUserProviders"
          :provider-name="provider.name"
          :token-link="provider.tokenLink"
        />
        <hr class="border-primary" />
        <label class="block text-sm font-medium text-primary mt-5">Connect services</label>
        <CreateCredential
          v-for="provider in deconnectedProviders"
          :key="provider.provider"
          :is-connected="true"
          :refresh-user-providers="refreshUserProviders"
          :provider-name="provider.name"
          :token-link="provider.tokenLink"
        />
      </div>
    </div>
  </div>
</template>
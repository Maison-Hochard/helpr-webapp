<script lang="ts" setup>
import { addCredentials, getAuthenticatedProviders } from "~/composables/useServices";
import { googleTokenLogin } from "vue3-google-login";

definePageMeta({
  name: "Services",
  title: "Connect Services"
});

const { data: services, refresh, pending } = await useLazyAsyncData(async () => {
  return await getAuthenticatedProviders();
});

const linearKey = ref("");
const githubKey = ref("");

async function addLinearToken() {
  await addCredentials("linear", linearKey.value);
}

async function addGithubToken() {
  await addCredentials("github", githubKey.value);
}

async function AddToken(provider: string, token: string) {
  await addCredentials(provider, token);
  refresh();
}

function isConnected(service: string) {
  if (!services.value) return false;
  for (const provider of services.value) {
    if (provider.provider === service) {
      return true;
    }
  }
  return false;
}

function login() {
  googleTokenLogin().then(async (response) => {
    await addCredentials("google", response.access_token);
  });
}
</script>

<template>
  <div>
    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">
        Add your tokens
      </h3>
      <p class="mt-1 text-sm text-muted">
        Add your tokens to connect your services.
      </p>
      <button @click="login">Login Using Google</button>
      <Loader v-if="pending" />
      <div class="flex flex-row mt-10 gap-5" v-else>
        <div class="flex flex-col gap-4">
          <form action="#" method="POST" v-if="!isConnected('linear')">
            <label for="linear-key" class="block text-sm font-medium text-primary">
              Linear Token Api
            </label>
            <div class="flex flex-row gap-5">
              <div class="mt-1">
                <input
                  v-model="linearKey"
                  id="linear-key"
                  name="linear-key"
                  type="password"
                  class="input"
                />
                <p class="mt-2 text-sm text-muted">
                  You can find your Linear Token Api in your <a href="https://linear.app/settings/api" target="_blank"
                                                                class="text-primary">Linear settings</a>.
                </p>
              </div>
              <div class="mt-1">
                <button class="btn btn-primary" @click="addLinearToken" :disabled="linearKey === ''">
                  Save
                </button>
              </div>
            </div>
          </form>
          <div v-else>
            <div class="flex flex-row gap-5 items-center">
              <ProviderLogo :provider="'linear'" />
              <p class="text-sm text-muted">
                You have already connected Linear.
              </p>
            </div>
          </div>
          <form class="mt-10" action="#" method="POST" v-if="!isConnected('github')">
            <label for="github-key" class="block text-sm font-medium text-primary">
              GitHub Token Api
            </label>
            <div class="flex flex-row gap-5">
              <div class="mt-1">
                <input
                  v-model="githubKey"
                  id="github-key"
                  name="github-key"
                  type="password"
                  autocomplete="github-key"
                  class="input"
                />
                <p class="mt-2 text-sm text-muted">
                  You can find your GitHub Token Api in your <a href="" target="_blank" class="text-primary">GitHub
                  settings</a>.
                </p>
              </div>
              <div class="mt-1">
                <button class="btn btn-primary" @click="addGithubToken" :disabled="githubKey === ''">
                  Save
                </button>
              </div>
            </div>
          </form>
          <div v-else>
            <div class="flex flex-row gap-5 items-center">
              <ProviderLogo :provider="'github'" />
              <p class="text-sm text-muted">
                You have already connected GitHub.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
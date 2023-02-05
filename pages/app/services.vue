<script lang="ts" setup>
import { addCredentials } from "~/composables/useServices";

definePageMeta({
  name: "Services",
  title: "Connect Services"
});

const linearConfig = useRuntimeConfig().public.linear;
const githubConfig = useRuntimeConfig().public.github;

const linearUrl = "https://linear.app/oauth/authorize" +
  "?client_id=" + linearConfig.clientId +
  "&redirect_uri=" + linearConfig.callbackUrl +
  "&response_type=code" +
  "&scope=webhook,read,write" +
  "&prompt=consent";


const githubUrl = "https://github.com/login/oauth/authorize" +
  "?client_id=" + githubConfig.clientId +
  "&redirect_uri=" + githubConfig.callbackUrl +
  "&response_type=code" +
  "&scope=repo,read:org,read:user,read:discussion,read:packages,read:discussion,read:enterprise,read:gpg_key,read:org,read:public_key,read:repo_hook,read:team,read:user,repo:status,write:discussion,write:packages,write:org,write:public_key,write:repo_hook,write:team,write:user";

const code = computed(() => {
  const route = useRoute();
  return route.query.code;
});

const linearKey = ref("");
const githubKey = ref("");

const addLinearToken = async () => {
  await addCredentials("linear", linearKey.value);
};

const addGithubToken = async () => {
  await addCredentials("github", githubKey.value);
};

const getLinearKey = async () => {
  const route = useRoute();
  const code = route.query.code;
  const redirect_uri = linearConfig.callbackUrl;
  const client_id = linearConfig.clientId;
  const client_secret = linearConfig.clientSecret;
  const grant_type = "authorization_code";
  const response = await $fetch("https://api.linear.app/oauth/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    query: {
      code,
      redirect_uri,
      client_id,
      client_secret,
      grant_type
    }
  });
  console.log(response);
  const res = useAPI("/api/linear/create-webhook", "POST", {
    linearKey: response.access_token
  });
  console.log(res);
};

const getGithubKey = async () => {
  const route = useRoute();
  const code = route.query.code;
  const redirect_uri = githubConfig.callbackUrl;
  const client_id = githubConfig.clientId;
  const client_secret = githubConfig.clientSecret;
  const grant_type = "authorization_code";
  const response = await $fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Accept": "application/json"
    },
    query: {
      code,
      redirect_uri,
      client_id,
      client_secret,
      grant_type
    }
  });
  console.log(response);
  const res = useAPI("/api/github/create-webhook", "POST", {
    githubKey: response.access_token
  });
  console.log(res);
};
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
      <div class="flex flex-row mt-10 gap-5">
        <div class="w-1/2">
          <form action="#" method="POST">
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
          <form class="mt-10" action="#" method="POST">
            <label for="github-key" class="block text-sm font-medium text-primary">
              GitHub Token Api
            </label>
            <div class="flex flex-row gap-5">
              <div class="mt-1">
                <input
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
        </div>
        <div class="w-1/2">
        </div>
      </div>
    </div>

    <div class="bg-secondary mb-5 px-4 py-5 shadow rounded-lg sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-primary">
        Connect your services
      </h3>
      <p class="mt-1 text-sm text-muted">
        Connect your services to start using them in your flows.
      </p>
      <h4 class="text-lg font-medium leading-6 text-red-600 mt-5">
        OAuth integration is currently in development. Please enter your keys manually.
      </h4>
      <div class="flex flex-row mt-10 gap-5">
        <div class="w-1/2">
          <NuxtLink :to="linearUrl" class="btn btn-primary mt-5">
            Connect to Linear
          </NuxtLink>
          <button v-if="code" class="btn btn-secondary mt-5" @click="getLinearKey">Get Linear Key</button>
          <NuxtLink :to="githubUrl" class="btn btn-primary mt-5">Connect to GitHub</NuxtLink>
          <button v-if="code" class="btn btn-secondary mt-5" @click="getGithubKey">Get GitHub Key</button>
        </div>
        <div class="w-1/2">
          <div>
            Your linear code is: <span class="text-primary">{{ code ?? "Not connected" }}</span>
          </div>
          <div>
            Your GitHub code is: <span class="text-primary">Not connected</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
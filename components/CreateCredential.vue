<script setup lang="ts">
import { removeCredentials } from "~/composables/useProvider";

const props = defineProps({
  providerName: {
    type: String,
    required: true,
  },
  isConnected: {
    type: Boolean,
    required: true,
  },
  tokenLink: {
    type: String,
  },
  refreshUserProviders: {
    type: Function,
    required: true,
  },
});

const credentials = ref("");

async function addToken() {
  await addCredentials(props.providerName, credentials.value);
  props.refreshUserProviders();
}

async function Deconnect() {
  if (confirm("Are you sure you want to disconnect this provider?")) {
    await removeCredentials(props.providerName);
    props.refreshUserProviders();
  }
}
</script>

<template>
  <form v-if="isConnected" @submit.prevent="addToken">
    <label for="github-key" class="block text-sm font-medium text-primary"> {{ providerName }} Token Api </label>
    <div class="flex flex-row gap-5">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row gap-5 items-center">
          <input
            v-model="credentials"
            id="github-key"
            name="github-key"
            type="password"
            autocomplete="github-key"
            class="input mt-1"
          />
          <button class="btn btn-primary" :disabled="credentials === ''">Save</button>
        </div>
        <p class="mt-2 text-sm text-muted" v-if="tokenLink">
          You can find your {{ providerName }} Token Api in your
          <NuxtLink :to="tokenLink" target="_blank" class="text-primary">{{ providerName }} settings</NuxtLink>.
        </p>
      </div>
    </div>
  </form>
  <div v-else>
    <div class="flex flex-row gap-5 items-center">
      <ProviderLogo :provider="providerName.toLowerCase()" />
      <p class="text-sm text-muted">You have already connected {{ providerName }}.</p>
      <button class="btn-secondary" @click="Deconnect">Deconnect</button>
    </div>
  </div>
</template>

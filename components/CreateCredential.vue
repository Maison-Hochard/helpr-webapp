<script setup lang="ts">
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
    required: true,
  },
  refreshUserProviders: {
    type: Function,
    required: true,
  },
});

const credentials = ref("");

const addToken = async () => {
  await addCredentials(props.providerName, credentials.value);
  props.refreshUserProviders();
};
</script>

<template>
  <form class="mt-10" action="#" method="POST" v-if="isConnected">
    <label for="github-key" class="block text-sm font-medium text-primary"> {{ providerName }} Token Api </label>
    <div class="flex flex-row gap-5">
      <div class="mt-1">
        <input
          v-model="credentials"
          id="github-key"
          name="github-key"
          type="password"
          autocomplete="github-key"
          class="input"
        />
        <p class="mt-2 text-sm text-muted">
          You can find your {{ providerName }} Token Api in your
          <NuxtLink :to="tokenLink" target="_blank" class="text-primary">{{ providerName }} settings</NuxtLink>.
        </p>
      </div>
      <div class="mt-1">
        <button class="btn btn-primary" @click="addToken" :disabled="credentials === ''">Save</button>
      </div>
    </div>
  </form>
  <div v-else>
    <div class="flex flex-row gap-5 items-center">
      <ProviderLogo :provider="providerName.toLowerCase()" />
      <p class="text-sm text-muted">You have already connected {{ providerName }}.</p>
    </div>
  </div>
</template>

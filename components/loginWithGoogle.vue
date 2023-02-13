<script setup lang="ts">
import { googleSdkLoaded } from "vue3-google-login";
const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initTokenClient({
        client_id: useRuntimeConfig().public.googleClientId,
        scope:
          "email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/spreadsheets",
        callback: async (response) => {
          await addCredentials("google", response.access_token);
        },
      })
      .requestAccessToken();
  });
};
</script>

<template>
  <button class="btn-secondary flex items-center justify-center gap-3" @click="login">
    <i class="fab fa-google" />
    Login Using Google
  </button>
</template>

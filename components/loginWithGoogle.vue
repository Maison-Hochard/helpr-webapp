<script setup lang="ts">
import { googleSdkLoaded } from "vue3-google-login";
const login = () => {
  googleSdkLoaded((google) => {
    google.accounts.oauth2
      .initCodeClient({
        client_id: useRuntimeConfig().public.googleClientId,
        scope:
          "email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/spreadsheets.readonly",
        callback: (response) => {
          console.log("Handle the response", response);
        },
      })
      .requestCode();
  });
};
</script>

<template>
  <button class="btn-secondary flex items-center justify-center gap-3" @click="login">
    <i class="fab fa-google" />
    Login Using Google
  </button>
</template>

<script setup lang="ts">
import {googleSdkLoaded} from "vue3-google-login";

const login = () => {
  const SCOPES = "email profile openid https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/gmail.compose https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.owned https://www.googleapis.com/auth/spreadsheets https://mail.google.com/ https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/pubsub";
  googleSdkLoaded((google) => {
    google.accounts.oauth2
          .initTokenClient({
            client_id: useRuntimeConfig().public.googleClientId,
            scope: SCOPES,
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

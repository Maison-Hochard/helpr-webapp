<script setup lang="ts">
import { useUploadAvatar } from "~/composables/useStorage";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

const user = userStore.getUser;

const avatar_file = ref<File | null>(null);

async function uploadAvatar() {
  if (avatar_file.value) {
    const publicUrl = await useUploadAvatar(avatar_file.value);
    if (publicUrl && user) user.avatar = publicUrl;
    await userStore.updateUser(false, false);
  }
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-muted">{{ $t("profile.avatar") }}</label>
    <div class="mt-1 flex items-center space-x-5">
      <span class="inline-block h-12 w-12 overflow-hidden rounded-full bg-gray-100">
        <Avatar :user="user" />
      </span>
      <div>
        <label
          for="avatar-upload"
          class="relative cursor-pointer rounded-md font-medium text-accent hover:text-accent-hover"
        >
          <span>{{ $t("profile.upload") }}</span>
          <input
            id="avatar-upload"
            name="avatar-upload"
            type="file"
            class="sr-only"
            @change="avatar_file = $event.target.files[0]"
          />
        </label>
        <p class="text-xs text-muted">PNG, JPG, GIF up to 10MB</p>
        <span class="text-xs text-muted">
          {{ $t("profile.uploaded") }}: {{ avatar_file ? avatar_file.name : $t("profile.none") }}
        </span>
      </div>
      <button @click="uploadAvatar" type="button" class="btn-secondary">
        {{ $t("profile.save") }}
      </button>
    </div>
  </div>
</template>

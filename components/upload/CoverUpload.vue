<script setup lang="ts">
import { useUploadAvatar, useUploadCover } from "~/composables/useStorage";
import { useUserStore } from "~/store/userStore";

const userStore = useUserStore();

const user = userStore.getUser;

const cover_file = ref<File | null>(null);

async function uploadCover() {
  if (cover_file.value) {
    const publicUrl = await useUploadCover(cover_file.value);
    if (publicUrl && user) user.avatar = publicUrl;
    await userStore.updateUser(false, false);
  }
}
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-muted">{{ $t("profile.cover") }}</label>
    <div class="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-600 px-6 pt-5 pb-6">
      <div class="space-y-1 text-center flex flex-col justify-center">
        <svg
          class="mx-auto h-12 w-12 text-muted"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 48 48"
          aria-hidden="true"
        >
          <path
            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <img :src="user.cover" alt="" class="rounded-md h-32 w-full object-cover" />
        <div class="flex text-sm text-gray-600">
          <label
            for="cover-upload"
            class="relative cursor-pointer rounded-md font-medium text-accent hover:text-accent-hover"
          >
            <span>{{ $t("profile.upload") }}</span>
            <input
              id="cover-upload"
              name="cover-upload"
              type="file"
              class="sr-only"
              @change="cover_file = $event.target.files[0]"
            />
          </label>
          <p class="pl-1">or drag and drop</p>
        </div>
        <p class="text-xs text-muted">PNG, JPG, GIF up to 10MB</p>
        <span class="text-xs text-muted">
          {{ $t("profile.uploaded") }}: {{ cover_file ? cover_file.name : $t("profile.none") }}
        </span>
        <button @click="uploadCover" type="button" class="btn-secondary">
          {{ $t("profile.save") }}
        </button>
      </div>
    </div>
  </div>
</template>

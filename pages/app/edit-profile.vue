<script setup lang="ts">
import { Plans } from "~/types/Pricing";
import AvatarUpload from "~/components/upload/AvatarUpload.vue";
import CoverUpload from "~/components/upload/CoverUpload.vue";
const { t } = useI18n();

definePageMeta({
  name: "Edit Profile",
  title: "Edit Profile",
});

const userStore = useUserStore();

const user = userStore.getUser;
const subscription = userStore.getSubscription;

const updateProfile = async () => {
  await userStore.updateUser();
};

const deleteAccount = async () => {
  if (confirm(t("profile.profile_delete_confirmation"))) {
    await useFetch("/api/user/" + user?.id, {
      method: "DELETE",
    });
    useRouter().push("/");
  }
};
</script>

<template>
  <form class="space-y-6" @submit.prevent="updateProfile">
    <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("profile.title") }}</h3>
          <p class="mt-1 text-sm text-muted">
            {{ $t("profile.description") }}
          </p>
        </div>
        <div class="mt-5 space-y-6 md:col-span-2 md:mt-0">
          <div id="username" class="flex items-center space-x-2">
            <label for="username" class="block text-sm font-medium text-muted">{{ $t("profile.username") }}</label>
            <Input :value="user.username" :label="'Username'" @update:value="user.username = $event" />
          </div>
          <div>
            <label for="about" class="block text-sm font-medium text-muted">{{ $t("profile.bio") }}</label>
            <div class="mt-1">
              <textarea
                id="about"
                name="about"
                rows="3"
                class="bg-primary p-3 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm focus:outline-none focus:ring-accent focus:border-accent"
                placeholder="Hi there! I'm new here."
                v-model="user.bio"
              ></textarea>
            </div>
          </div>
          <AvatarUpload />
          <CoverUpload />
          <div class="flex justify-end mt-5 gap-2">
            <button type="submit" class="btn-primary py-1">
              {{ $t("profile.save") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary px-4 py-5 shadow rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-primary">
            {{ $t("profile.personal_information") }}
          </h3>
          <p class="mt-1 text-sm text-muted">
            {{ $t("profile.personal_information_description") }}
          </p>
        </div>
        <div class="mt-5 md:col-span-2 md:mt-0">
          <div class="grid grid-cols-6 gap-6">
            <div class="col-span-6 sm:col-span-3">
              <label for="first-name" class="block text-sm font-medium text-muted">
                {{ $t("profile.firstname") }}
              </label>
              <Input :value="user.firstname" :label="'firstname'" @update:value="user.firstname = $event" />
            </div>

            <div class="col-span-6 sm:col-span-3">
              <label for="last-name" class="block text-sm font-medium text-muted">
                {{ $t("profile.lastname") }}
              </label>
              <Input :value="user.lastname" :label="'lastname'" @update:value="user.lastname = $event" />
            </div>
          </div>
          <div class="flex justify-end mt-5 gap-2">
            <button type="submit" class="btn-primary py-1">
              {{ $t("profile.save") }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-secondary shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">
          {{ $t("subscription.manage_subscription") }}
        </h3>
        <div class="my-2 max-w-xl text-sm text-muted">
          <p>
            {{ $t("subscription.description") }}
          </p>
        </div>
        <div>
          <div v-if="subscription && subscription.length > 0 && subscription[0].name === Plans.PREMIUM.name">
            <i class="fas fa-check-circle text-green-600"></i>
            {{ subscription[0].name }}
          </div>
          <div v-else>
            <i class="fas fa-times-circle text-red-600"></i>
            {{ $t("subscription.no_subscription") }}
          </div>
        </div>
        <div class="mt-5 flex gap-4">
          <client-only>
            <form action="/api/stripe/subscribe" method="post" v-if="!subscription || subscription.length === 0">
              <input type="hidden" name="userId" :value="user.id" />
              <button
                name="priceId"
                :value="Plans.PREMIUM.priceId"
                type="submit"
                class="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                {{ $t("subscription.subscribe") }}
              </button>
            </form>
            <form action="/api/stripe/createPortalSession" method="post">
              <button
                type="submit"
                name="stripeCustomerId"
                :value="user.stripeCustomerId"
                class="rounded-md bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                {{ $t("subscription.manage") }}
              </button>
            </form>
          </client-only>
        </div>
      </div>
    </div>

    <div class="bg-secondary shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">{{ $t("profile.delete_my_account") }}</h3>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>{{ $t("profile.delete_my_account_description") }}</p>
        </div>
        <div class="mt-5">
          <button type="button" class="bg-red-600 text-inverted px-4 py-2 rounded-md sm:text-sm" @click="deleteAccount">
            {{ $t("profile.delete_my_account") }}
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

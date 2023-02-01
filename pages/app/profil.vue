<script setup>
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/20/solid";
import { User } from "@prisma/client";

const user = await useUser();

const default_avatar =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";

const {
  data: subscription,
  pending,
  refresh,
} = await useLazyFetch("/api/stripe/currentSubscription", {
  method: "POST",
  body: { userId: user?.id },
});

const updateProfile = async () => {
  if (confirm("Are you sure you want to update your profile?")) {
    if (user) {
      const { data: updatedUser } =
      (await useFetch) <
      User >
      ("/api/user/" + user.id,
        {
          method: "PUT",
          body: user,
        });
      useState("user").value = updatedUser.value;
      refresh();
    }
  }
};

const deleteAccount = async () => {
  if (confirm("Are you sure you want to delete your account?")) {
    if (user) {
      await useFetch("/api/user/" + user.id, {
        method: "DELETE",
      });
      useState("user").value = null;
      useRouter().push("/");
    }
  }
};

const tabs = [
  { name: "Profile", href: "#", current: true },
  { name: "Calendar", href: "#", current: false },
  { name: "Recognition", href: "#", current: false },
];
const profile = {
  name: user?.firstname + " " + user?.lastname || "John Doe",
  imageUrl: user?.profilePicture || default_avatar,
  coverImageUrl:
    "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  about: `
    <p>Tincidunt quam neque in cursus viverra orci, dapibus nec tristique. Nullam ut sit dolor consectetur urna, dui cras nec sed. Cursus risus congue arcu aenean posuere aliquam.</p>
    <p>Et vivamus lorem pulvinar nascetur non. Pulvinar a sed platea rhoncus ac mauris amet. Urna, sem pretium sit pretium urna, senectus vitae. Scelerisque fermentum, cursus felis dui suspendisse velit pharetra. Augue et duis cursus maecenas eget quam lectus. Accumsan vitae nascetur pharetra rhoncus praesent dictum risus suspendisse.</p>
  `,
  fields: {
    Phone: "(555) 123-4567",
    Email: "ricardocooper@example.com",
    Title: "Senior Front-End Developer",
    Team: "Product Development",
    Location: "San Francisco",
    Sits: "Oasis, 4th floor",
    Salary: "$145,000",
    Birthday: "June 8, 1990",
  },
};
</script>

<template>
  <div class="relative z-0 flex flex-1 overflow-hidden bg-primary">
    <main class="relative z-0 flex-1 focus:outline-none xl:order-last">
      <article>
        <div>
          <div>
            <img
              class="h-32 w-full object-cover lg:h-48"
              :src="profile.coverImageUrl"
              alt=""
            />
          </div>
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div class="flex">
                <img
                  class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  :src="profile.imageUrl"
                  alt=""
                />
              </div>
              <div
                class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1"
              >
                <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 class="truncate text-2xl font-bold text-primary">
                    {{ profile.name }}
                  </h1>
                </div>
                <div
                  class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-inverted shadow-sm hover:bg-accent-hover"
                  >
                    <EnvelopeIcon
                      class="-ml-1 mr-2 h-5 w-5 text-inverted"
                      aria-hidden="true"
                    />
                    <span>Message</span>
                  </button>
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium text-inverted shadow-sm hover:bg-accent-hover"
                  >
                    <PhoneIcon
                      class="-ml-1 mr-2 h-5 w-5 text-inverted"
                      aria-hidden="true"
                    />
                    <span>Call</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 class="truncate text-2xl font-bold text-primary">
                {{ profile.name }}
              </h1>
            </div>
          </div>
        </div>

        <div class="mt-6 sm:mt-2 2xl:mt-5">
          <div class="border-b border-muted">
            <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
              <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <a
                  v-for="tab in tabs"
                  :key="tab.name"
                  :href="tab.href"
                  :class="[
                    tab.current
                      ? 'border-accent text-primary'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                    'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm',
                  ]"
                  :aria-current="tab.current ? 'page' : undefined"
                >{{ tab.name }}</a
                >
              </nav>
            </div>
          </div>
        </div>

        <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div
              v-for="field in Object.keys(profile.fields)"
              :key="field"
              class="sm:col-span-1"
            >
              <dt class="text-sm font-medium text-gray-500">{{ field }}</dt>
              <dd class="mt-1 text-sm text-primary">
                {{ profile.fields[field] }}
              </dd>
            </div>
            <div class="sm:col-span-2">
              <dt class="text-sm font-medium text-gray-500">About</dt>
              <dd
                class="mt-1 max-w-prose space-y-5 text-sm text-primary"
                v-html="profile.about"
              />
            </div>
          </dl>
        </div>
      </article>
    </main>
  </div>
</template>

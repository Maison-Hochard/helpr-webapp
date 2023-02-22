<script setup lang="ts">
definePageMeta({
  title: "Community",
  description: "Community page",
});

const { data: users, pending } = await useLazyFetch("/api/community/getSomeUsers", {
  method: "GET",
});

function goToProfile(userId: number) {
  useRouter().push(`/app/profile/${userId}`);
}
</script>

<template>
  <div>
    <FlowLoader v-if="pending" :nb-items="3" />
    <div class="bg-secondary rounded-lg p-4" v-else>
      <div class="flex flex-col items-center justify-center gap-4">
        <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Our Community</h2>
        <p class="max-w-2xl text-xl text-muted text-center">
          Meet our awesome community of developers, designers, and entrepreneurs. We're always looking for new members
          to join our team.
        </p>
      </div>
      <ul role="list" class="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <li
          v-for="user in users"
          :key="user.name"
          class="col-span-1 flex flex-col text-center cursor-pointer"
          @click="goToProfile(user.id)"
        >
          <img class="mx-auto h-24 w-24 rounded-full object-cover" :src="user.avatar" alt="" />
          <h3 class="mt-6 text-center text-lg font-medium text-primary">{{ user.firstname }} {{ user.lastname }}</h3>
          <p class="mt-2 text-center text-sm text-muted">{{ user.bio }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

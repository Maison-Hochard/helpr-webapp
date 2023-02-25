<script setup lang="ts">
import { ArrowPathIcon, PlusCircleIcon } from "@heroicons/vue/24/outline";
import Flow from "~/components/flow/Flow.vue";

definePageMeta({
  name: "My Flows",
  title: "My Flows",
});

const {
  data: flows,
  pending,
  refresh,
} = await useLazyAsyncData(async () => {
  const { data } = await getUserFlows();
  return data;
});
</script>

<template>
  <div>
    <div class="bg-secondary shadow rounded-lg mb-4">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-primary">My Flows</h3>
        <div class="mt-2 max-w-xl text-sm text-muted">
          <p>Here you can see all your flows. You can create a new flow by clicking the button below.</p>
        </div>
      </div>
    </div>
    <FlowLoader v-if="pending" :nb-items="4" />
    <div id="flows-wrapper" class="flex flex-col gap-4" v-else-if="flows && flows.length > 0">
      <Flow :flow="flow" :refresh="refresh" v-for="flow in flows" :key="flow.id" />
    </div>
    <div v-else class="bg-secondary shadow rounded-lg p-4">
      <h3 class="text-lg font-medium leading-6 text-primary text-center">No flows found</h3>
      <div class="mt-2 text-sm text-muted text-center">
        <p>You can create a new flow by clicking the button below.</p>
        <div class="mt-5 flex gap-8 justify-center">
          <ArrowPathIcon class="h-8 w-8 text-muted hover:text-primary cursor-pointer" @click="refresh" />
          <PlusCircleIcon
            class="h-8 w-8 text-muted hover:text-accent cursor-pointer"
            @click="useRouter().push('/app/builder/new-flow')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

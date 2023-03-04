<script setup lang="ts">
definePageMeta({
  name: "Changelog",
  title: "Changelog",
  description: "Changelog",
});
</script>

<template>
  <div class="flex flex-col justify-center items-center py-8 gap-4">
    <span class="text-4xl font-bold tracking-tight text-primary sm:text-5xl">Changelog</span>
    <hr class="w-1/2 border-accent" />
    <div class="flex flex-col gap-20 py-8 justify-center items-center">
      <ContentList v-slot="{ list }" path="/changelog" class="flex flex-col">
        <div v-for="article in list" :key="article._path" class="mx-auto max-w-5xl">
          <div class="flex gap-6">
            <div class="flex flex-col space-y-5 justify-center items-center">
              <span class="text-2xl font-bold text-center text-primary">
                {{ article.title }}
              </span>
              <div class="flex gap-2">
                <span class="rounded bg-accent-faded px-2.5 py-1 text-sm font-semibold text-accent">
                  v{{ article.version }}
                </span>
                <span class="inline-flex items-center space-x-1 text-sm font-medium text-accent">
                  {{ article.date }}
                </span>
              </div>
              <div class="w-2/3 h-2/3">
                <img :src="article.img" :alt="article.title" class="rounded-xl shadow-xl" />
                <div class="text-primary leading-8 text-lg font-medium mt-4">
                  {{ article.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentList>
    </div>
  </div>
</template>

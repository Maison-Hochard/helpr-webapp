<template>
  <div>
    <ContentRenderer :value="data.name" v-for="data in items" :key="data.name" />
  </div>
</template>

<script setup lang="ts">
const files = import.meta.glob("/content/*.md");
const filenames = Object.keys(files).map((key) => key.slice(9, -3));

async function useAsyncData() {
  const datas = [];
  for (const filename of filenames) {
    const file = await queryContent(`/content/${filename}`);
    datas.push({
      name: filename,
      title: "test",
      description: "test, description",
      date: "test, date",
    });
  }

  return { datas, items: datas };
}

const { items, data } = await useAsyncData();

definePageMeta({
  name: "Changelog",
  title: "Changelog",
  description: "Changelog",
});
</script>

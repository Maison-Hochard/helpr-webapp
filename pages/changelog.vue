<template>
  <div class="bg-gray-100 p-8 rounded-lg">
    <template v-for="data in items" :key="data.name">
      <div class="bg-white shadow-lg rounded-lg p-4 mb-4">
        <template v-for="dat in data.datatable" :key="dataTitle">
          <h2 class="font-bold text-2xl mb-4 text-center md:text-left text-gray-700">{{ dat[0].title }}</h2>
          <div class="bg-gray-200 p-4 rounded-lg mb-4 flex flex-col md:flex-row items-center">
            <div class="md:w-70 md:pr-8">

              <p class="text-gray-700 mb-4">{{ dat[0].description }}</p>
              <p class="text-gray-700 mb-4">{{ dat[0].use }}</p>
              <p class="text-gray-700">{{ dat[0].other }}</p>
            </div>
            <div class="w-1/3">
              <img class="rounded-lg" :src="dat[0].image" alt="" />
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>





<script setup lang="ts">
import { ParsedContent } from "@nuxt/content/dist/runtime/types";

const files = import.meta.glob("/content/*.md");
const filenames = Object.keys(files).map((key) => key.slice(9, -3));

async function useAsyncData(test: string, p: () => Promise<ParsedContent>) {
  const datas = [];

  for (const filename of filenames) {
    const dataTable: { description: never[] }[][] = [];
    const file = await queryContent(`/${filename}`).findOne();
    let next = false;
    let number = 0;
    let titles: never[] = [];
    let title_dt: never[] = [];
    let description_dt: never[] = [];
    let image_dt: never[] = [];
    let use_dt: never[] = [];
    let other_dt: never[] = [];
    // get the number of titles for know how many data we have
    for (const child of file.body.children) {
      if (next) {
        next = false;
        titles += child.children[0].value;
      }
      if (child.children[0].value == "Title") {
        next = true;
        number++;
      }
    }
    // get the data from the file and put it in the array dataTable
    let multiplicator = 0;
    for (let i = 0; i < number; i++) {
      title_dt = file.body.children[1 + multiplicator].children[0].value;
      description_dt = file.body.children[3 + multiplicator].children[0].value;
      image_dt = file.body.children[5 + multiplicator].children[0].props.src;
      use_dt = file.body.children[7 + multiplicator].children[0].value;
      other_dt = file.body.children[9 + multiplicator].children[0].value;
      multiplicator += 10;
      dataTable[i] = [
        {
          description: description_dt,
          other: other_dt,
          use: use_dt,
          image: image_dt,
          title: title_dt,
        },
      ];
    }

    // put the data in the array
    datas.push({
      name_file: filename,
      date_header: file.date,
      datatable: dataTable,
    });
  }

  return { datas, items: datas };
}

const { items } = await useAsyncData();

definePageMeta({
  name: "Changelog",
  title: "Changelog",
  description: "Changelog",
});
</script>

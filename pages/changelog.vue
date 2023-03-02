<template>
  <div class="bg-primary p-8 rounded-lg">
    <template v-for="data in items" :key="data.name">
      <h2 class="font-bold text-4xl mb-4 text-primary items-center mr-3">
        {{ data.title_header }}
      </h2>
      <div class="flex flew-row justify-center items-center mr-3 items-start sm:justify-start">
        <h2 class="font-bold text-2xl mb-4 text-center text-primary items-center mr-3 bg-accent p-1 rounded-lg">
          V - {{ data.version_header }}
        </h2>
        <h2 class="font-bold text-2xl mb-4 text-center text-primary items-center mr-3">
          {{ data.date_header }}
        </h2>
      </div>
      <div class="bg-secondary shadow-lg rounded-lg p-4 mb-4 mr-3">
        <template v-for="dat in data.datatable" :key="dataTitle">
          <div class="flex flex-col items-center">
            <div class="w-full items-center" v-if="dat[0].title != null">
              <h2 class="font-bold text-3xl mb-4 text-center text-primary items-center mr-3">
                {{ dat[0].title }}
              </h2>
            </div>
            <div class="p-4 rounded-lg mt-4 flex flex-col md:flex-col p-8">
              <img class="rounded-lg" :src="dat[0].image" alt="" />
              <div class="md:w-70 md:pr-8 mr-5">
                <p class="text-primary mb-4">{{ dat[0].tagVersion }}</p>
                <p class="text-primary mb-4">{{ dat[0].bugFix }}</p>
              </div>
              <p class="text-muted text-center">{{ dat[0].nb }}</p>
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

// sorted filenames by date
const sortedFilenames = filenames.sort((a, b) => {
  const dateA = new Date(a.split("-")[0]);
  const dateB = new Date(b.split("-")[0]);
  return dateB.getTime() - dateA.getTime();
});

async function useAsyncData(test: string, p: () => Promise<ParsedContent>) {
  const datas = [];

  for (const filename of filenames) {
    const dataTable: { description: never[] }[][] = [];
    const file = await queryContent(`/${filename}`).findOne();
    let next = false;
    let number = 0;
    let titles: never[] = [];

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

    let title_dt: never[] = [];
    let tagVersion_dt: never[] = [];
    let image_dt: never[] = [];
    let bugFix_dt: never[] = [];
    let nb_dt: never[] = [];
    let noteVersion_dt: never[] = [];

    let precedent = "";
    let n_bool = false;
    for (let r = 0, n = 0; r < file.body.children.length; r++) {
      let nb_title = false;
      if (precedent == "Title") {
        nb_title = true;
        title_dt = file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "Tag de la version") {
        nb_title = true;
        tagVersion_dt = file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "Image") {
        nb_title = true;
        image_dt = file.body.children[r].children[0].props.src == "null" ? " " : file.body.children[r].children[0].props.src;
      }
      if (precedent == "Bugfix") {
        nb_title = true;
        bugFix_dt = file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "NB") {
        nb_title = true;
        nb_dt = file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "Notes de version") {
        nb_title = true;
        n_bool = true;
        noteVersion_dt = file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      precedent = file.body.children[r].children[0].value;
      if (nb_title) {
        dataTable[n] = [
          {
            tagVersion: tagVersion_dt,
            nb: nb_dt,
            bugfix: bugFix_dt,
            image: image_dt,
            title: title_dt,
            noteVersion: noteVersion_dt,
          },
        ];
        if (n_bool) {
          n_bool = false;
          n++;
        }
        nb_title = false;
      }
      /* title_dt = file.body.children[1 + multiplicator].children[0].value ? file.body.children[1 + multiplicator].children[0].value : "No title";
      tagVersion_dt = file.body.children[3 + multiplicator].children[0].value ? file.body.children[3 + multiplicator].children[0].value : "No tag";
      image_dt = file.body.children[5 + multiplicator].children[0].props.src ? file.body.children[5 + multiplicator].children[0].props.src : "No image";
      bugFix_dt = file.body.children[7 + multiplicator].children[0].value ? file.body.children[7 + multiplicator].children[0].value : "No bugfix";
      nb_dt = file.body.children[9 + multiplicator].children[0].value ? file.body.children[9 + multiplicator].children[0].value : "No number";
      noteVersion_dt = file.body.children[11 + multiplicator].children[0].value ? file.body.children[11 + multiplicator].children[0].value : "No note";
      multiplicator += 12;
      dataTable[i] = [
        {
          tagVersion: tagVersion_dt,
          nb: nb_dt,
          bugfix: bugFix_dt,
          image: image_dt,
          title: title_dt,
          noteVersion: noteVersion_dt,
        },
      ];*/
    }

    // put the data in the array
    datas.push({
      name_file: filename,
      date_header: file.date,
      title_header: file.Title,
      version_header: file.version,
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

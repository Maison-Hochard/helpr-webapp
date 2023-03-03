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
              <h2 class="font-bold text-3xl mb-4 text-center text-primary items-center mr-3 p-8">
                {{ dat[0].title }}
              </h2>
            </div>
            <div class="p-4 rounded-lg mt-4 flex flex-col md:flex-col p-8">
              <img class="rounded-lg" :src="dat[0].image" alt="" />
              <div class="md:w-70 md:pr-8 mr-5 p-8">
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

// Init
const files = import.meta.glob("/content/*.md");
const filenames = Object.keys(files).map((key) => key.slice(9, -3));

/**
 * Get the content of files in the content folder
 * @returns the content of the file
 */
async function useAsyncData(test: string, p: () => Promise<ParsedContent>) {
  // Init
  const datas = [];

  // loop on each file in the content folder and get the content in datas
  for (const filename of filenames) {
    // Init
    const dataContent: { description: never[] }[][] = [];
    const file = await queryContent(`/${filename}`).findOne();
    
    // Init all data part in the file for the dataContent array
    let title_contentData: never[] = [];
    let tagVersion_contentData: never[] = [];
    let image_contentData: never[] = [];
    let bugFix_contentData: never[] = [];
    let nb_contentData: never[] = [];
    let noteVersion_contentData: never[] = [];
    
    // Init the precedent value for the loop and n_bool for know when we can change the n value
    let precedent = "";
    let n_bool = false;
    
    for (let r = 0, n = 0; r < file.body.children.length; r++) {
      // Init dataPush for know when we can push the data in the dataContent array
      let dataPush = false;

      // Check if the precedent value is equal to the value of the current loop and if it's true, we can push the data in the dataContent array
      if (precedent == "Title") {
        dataPush = true;
        title_contentData =
          file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "Tag de la version") {
        dataPush = true;
        tagVersion_contentData =
          file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "Image") {
        dataPush = true;
        image_contentData =
          file.body.children[r].children[0].props.src == "null" ? " " : file.body.children[r].children[0].props.src;
      }
      if (precedent == "Bugfix") {
        dataPush = true;
        bugFix_contentData =
          file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "NB") {
        dataPush = true;
        nb_contentData =
          file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }
      if (precedent == "Notes de version") {
        dataPush = true;
        n_bool = true;
        noteVersion_contentData =
          file.body.children[r].children[0].value == "null" ? " " : file.body.children[r].children[0].value;
      }

      // Change the precedent value for the next loop
      precedent = file.body.children[r].children[0].value;

      // Push the data in the dataContent array
      if (dataPush) {
        dataContent[n] = [
          {
            tagVersion: tagVersion_contentData,
            nb: nb_contentData,
            bugfix: bugFix_contentData,
            image: image_contentData,
            title: title_contentData,
            noteVersion: noteVersion_contentData,
          },
        ];
        if (n_bool) {
          n_bool = false;
          n++;
        }
        dataPush = false;
      }
    }

    // put the data in the array final
    datas.push({
      name_file: filename,
      date_header: file.date,
      title_header: file.Title,
      version_header: file.version,
      datatable: dataContent,
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

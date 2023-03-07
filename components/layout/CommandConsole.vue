<script setup>
import { computed, ref } from "vue";
import { MagnifyingGlassIcon, LanguageIcon } from "@heroicons/vue/20/solid";
import {
  DocumentIcon,
  FolderIcon,
  PlusCircleIcon,
  SparklesIcon,
  InformationCircleIcon,
} from "@heroicons/vue/24/outline";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
const { locale } = useI18n();
const globalStore = useGlobalStore();

const consoleActions = [
  {
    name: "Créer un Flow",
    shortcut: "⌘ + Ctrl + N",
    action: () => useRouter().push("/app/builder/new-flow"),
    icon: PlusCircleIcon,
  },
  {
    name: "Mettre en francais",
    shortcut: "⌘ + F",
    action: () => {
      locale.value = "fr";
      globalStore.setLocale("fr");
    },
    icon: LanguageIcon,
  },
  {
    name: "Mettre en anglais",
    shortcut: "⌘ + E",
    action: () => {
      locale.value = "en";
      globalStore.setLocale("en");
    },
    icon: LanguageIcon,
  },
  {
    name: "Retourner à l'accueil",
    shortcut: "⌘ + A",
    action: () => useRouter().push("/"),
    icon: DocumentIcon,
  },
  {
    name: "Passer à l'abonnement Premium",
    action: () => useRouter().push("/pricing"),
    icon: SparklesIcon,
  },
  {
    name: "Afficher l'aide",
    shortcut: "⌘ + H",
    action: () => useRouter().push("/help"),
    icon: InformationCircleIcon,
  },
];

const open = ref(false);
const query = ref("");
const filteredActions = computed(() =>
  query.value === ""
    ? []
    : consoleActions.filter((action) => action.name.toLowerCase().includes(query.value.toLowerCase())),
);

function onSelect(item) {
  item.action();
  open.value = false;
}

onMounted(() => {
  if (process.client) {
    document.addEventListener("keydown", (event) => {
      if (event.metaKey && event.key === "k") open.value = !open.value;
    });
    document.addEventListener("keydown", (event) => {
      if (event.metaKey && event.key === "a") {
        event.preventDefault();
        consoleActions.find((action) => action.shortcut === "⌘ + A").action();
      }
      if (event.metaKey && event.key === "h") {
        event.preventDefault();
        consoleActions.find((action) => action.shortcut === "Ctrl + H").action();
      }
      if (event.metaKey && event.key === "n" && event.ctrlKey) {
        event.preventDefault();
        consoleActions.find((action) => action.shortcut === "⌘ + Ctrl + N").action();
      }
      if (event.metaKey && event.key === "f") {
        event.preventDefault();
        consoleActions.find((action) => action.shortcut === "⌘ + F").action();
      }
      if (event.metaKey && event.key === "e") {
        event.preventDefault();
        consoleActions.find((action) => action.shortcut === "⌘ + E").action();
      }
    });
  }
});
</script>

<template>
  <TransitionRoot :show="open" as="template" @after-leave="query = ''" appear>
    <Dialog as="div" class="relative z-10" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-700 bg-opacity-50 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
        <TransitionChild
          as="template"
          enter="ease-out duration-300"
          enter-from="opacity-0 scale-95"
          enter-to="opacity-100 scale-100"
          leave="ease-in duration-200"
          leave-from="opacity-100 scale-100"
          leave-to="opacity-0 scale-95"
        >
          <DialogPanel
            class="mx-auto max-w-2xl transform divide-y divide-gray-800 overflow-hidden rounded-xl bg-secondary shadow-2xl transition-all"
          >
            <Combobox @update:modelValue="onSelect">
              <div class="relative">
                <MagnifyingGlassIcon
                  class="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-muted"
                  aria-hidden="true"
                />
                <ComboboxInput
                  class="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-primary placeholder-gray-400 focus:ring-0 sm:text-sm focus:outline-none"
                  placeholder="Search..."
                  @change="query = $event.target.value"
                />
              </div>

              <ComboboxOptions
                v-if="query === '' || filteredActions.length > 0"
                static
                class="max-h-80 scroll-py-2 divide-y divide-gray-800 overflow-y-auto"
              >
                <li class="p-2">
                  <h2 v-if="query === ''" class="mt-4 mb-2 px-3 text-xs font-semibold text-muted">Searches</h2>
                  <ul class="text-sm text-primary">
                    <ComboboxOption
                      v-for="action in query === '' ? filteredActions : filteredActions"
                      :key="action.id"
                      :value="action"
                      as="template"
                      v-slot="{ active }"
                    >
                      <li
                        :class="[
                          'flex cursor-default text-muted select-none items-center rounded-md px-3 py-2',
                          active && 'bg-accent text-primary',
                        ]"
                      >
                        <component
                          :is="action.icon"
                          :class="['h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400']"
                          aria-hidden="true"
                        />
                        <span class="ml-3 flex-auto truncate" :class="[active ? 'text-primary' : 'text-muted']">
                          {{ action.name }}
                        </span>
                        <!--                        <span v-if="active" class="ml-3 flex-none text-primary">Jump to...</span>-->
                      </li>
                    </ComboboxOption>
                  </ul>
                </li>
                <li v-if="query === ''" class="p-2">
                  <h2 class="sr-only">Quick actions</h2>
                  <ul class="text-sm text-muted">
                    <ComboboxOption
                      v-for="action in consoleActions"
                      :key="action.shortcut"
                      :value="action"
                      as="template"
                      v-slot="{ active }"
                    >
                      <li
                        :class="[
                          'flex cursor-default select-none items-center rounded-md px-3 py-2',
                          active && 'bg-accent text-primary',
                        ]"
                      >
                        <component
                          :is="action.icon"
                          :class="['h-6 w-6 flex-none', active ? 'text-white' : 'text-gray-400']"
                          aria-hidden="true"
                        />
                        <span class="ml-3 flex-auto truncate">{{ action.name }}</span>
                        <span
                          :class="[
                            'ml-3 flex-none text-xs font-semibold',
                            active ? 'text-indigo-100' : 'text-gray-400',
                          ]"
                        >
                          <kbd class="font-sans">{{ action.shortcut }}</kbd>
                        </span>
                      </li>
                    </ComboboxOption>
                  </ul>
                </li>
              </ComboboxOptions>

              <div v-if="query !== '' && filteredActions.length === 0" class="py-14 px-6 text-center sm:px-14">
                <FolderIcon class="mx-auto h-6 w-6 text-primary" aria-hidden="true" />
                <p class="mt-4 text-sm text-primary">We couldn't find any projects with that term. Please try again.</p>
              </div>
            </Combobox>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

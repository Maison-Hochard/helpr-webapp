<script setup lang="ts">
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxLabel,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/vue";
import { ChevronUpDownIcon } from "@heroicons/vue/24/outline";
import { PropType } from "vue";

type DropdownItem = {
  id: string;
  title?: string;
  name?: string;
  description?: string;
  logo?: string;
};

const props = defineProps({
  items: {
    type: Array as PropType<DropdownItem[]>,
    required: true,
  },
  isLogo: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

const selectedItem = ref();

const filteredItems = computed(() =>
  props.items.filter((item) => item.name?.toLowerCase().includes(selectedItem.value?.name?.toLowerCase() || "")),
);
</script>

<template>
  <Combobox as="div" v-model="selectedItem" class="w-full" :default-value="placeholder">
    <ComboboxLabel class="block text-sm font-medium text-primary">{{ label || "Select an item" }}</ComboboxLabel>
    <div class="relative mt-1">
      <ComboboxInput
        class="w-full rounded-md border border-muted bg-primary py-2 pl-3 pr-10 shadow-sm focus:outline-none sm:text-sm"
        @change="selectedItem = $event.target.value"
        :display-value="(item) => item?.title || item?.name || placeholder || ''"
      >
      </ComboboxInput>
      <ComboboxButton class="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
        <ChevronUpDownIcon class="h-5 w-5 text-muted" aria-hidden="true" />
      </ComboboxButton>

      <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-out"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
      >
        <ComboboxOptions
          v-if="filteredItems.length > 0"
          class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-primary py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ComboboxOption
            v-for="item in filteredItems"
            :key="item.id"
            :value="item"
            as="template"
            v-slot="{ active, selected }"
          >
            <li
              :class="['relative cursor-pointer select-none py-2 pl-3 pr-9', active ? 'bg-secondary' : 'text-primary']"
            >
              <div class="flex items-center">
                <img v-if="isLogo" :src="item.logo" alt="" class="h-6 w-6 flex-shrink-0 rounded-full" />
                <span :class="['ml-3 truncate', selected && 'font-semibold']">
                  {{ item.title || item.name }}
                </span>
                <span class="ml-3 truncate text-muted">
                  {{ item.description }}
                </span>
              </div>
            </li>
          </ComboboxOption>
        </ComboboxOptions>
      </transition>
    </div>
  </Combobox>
</template>

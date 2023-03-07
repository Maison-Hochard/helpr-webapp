<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { ChatBubbleBottomCenterIcon } from "@heroicons/vue/24/outline";

const open = ref(false);
</script>

<template>
  <div>
    <div class="fixed bottom-5 right-5 z-10 bg-accent p-3 rounded-full shadow-lg cursor-pointer" @click="open = !open">
      <ChatBubbleBottomCenterIcon class="h-6 w-6 text-white" />
    </div>
    <TransitionRoot as="template" :show="open">
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
          <div class="fixed inset-0 bg-gray-800/30 transition-opacity" />
        </TransitionChild>

        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
              >
                <div>
                  <div class="flex flex-col justify-center text-center">
                    <nuxt-img class="hidden w-auto lg:block h-8" :src="'/supabase/logo/dark/helpr-logo.svg'" />
                    <p class="text-sm text-muted mt-4">
                      <span class="font-bold">Helpr</span> est un assistant virtuel qui vous aide à trouver des réponses
                      à vos questions.
                    </p>
                  </div>
                  <div class="mt-3 text-center sm:mt-5">
                    <client-only>
                      <iframe
                        src="https://www.chatbase.co/chatbot-iframe/www-helprapp-fr-rcplwsiso"
                        frameborder="0"
                        class="w-full"
                        height="400"
                      ></iframe>
                    </client-only>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

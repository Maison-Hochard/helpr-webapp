<script setup lang="ts">
import { EnvelopeIcon, PhoneIcon } from "@heroicons/vue/24/outline";

definePageMeta({
  name: "Contact",
  title: "Contact",
  description: "Contact us",
});

const email = ref("");
const message = ref("");
const subject = ref("");
const phone = ref("");
const fullname = ref("");

async function submitForm() {
  const { data } = await useFetch("/api/mailer/sendMailToSupport", {
    method: "POST",
    body: {
      email: email.value,
      message: message.value,
      subject: subject.value,
      phone: phone.value,
      fullname: fullname.value,
    },
  });
  if (data) alert("Message sent!");
}
</script>

<template>
  <div class="relative bg-primary">
    <div class="absolute inset-0">
      <div class="absolute inset-y-0 left-0 w-1/2" />
    </div>
    <div class="relative mx-auto max-w-7xl lg:grid lg:grid-cols-5">
      <div class="py-16 px-6 lg:col-span-2 lg:px-8 lg:py-24 xl:pr-12">
        <div class="mx-auto max-w-lg">
          <h2
            class="text-2xl font-bold tracking-tight text-primary sm:text-3xl"
          >
            Get in touch
          </h2>
          <p class="mt-3 text-lg leading-6 text-muted">
            Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat
            massa dictumst amet. Sapien tortor lacus arcu.
          </p>
          <dl class="mt-8 text-base text-muted">
            <div>
              <dt class="sr-only">Postal address</dt>
              <dd>
                <p>742 Evergreen Terrace</p>
                <p>Springfield, OR 12345</p>
              </dd>
            </div>
            <div class="mt-6">
              <dt class="sr-only">Phone number</dt>
              <dd class="flex">
                <PhoneIcon
                  class="h-6 w-6 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span class="ml-3">+1 (555) 123-4567</span>
              </dd>
            </div>
            <div class="mt-3">
              <dt class="sr-only">Email</dt>
              <dd class="flex">
                <EnvelopeIcon
                  class="h-6 w-6 flex-shrink-0 text-gray-400"
                  aria-hidden="true"
                />
                <span class="ml-3">support@example.com</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="py-16 px-6 lg:col-span-3 lg:py-24 lg:px-8 xl:pl-12">
        <div class="mx-auto max-w-lg lg:max-w-none">
          <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-y-6">
            <div>
              <label for="fullname" class="sr-only">Full name</label>
              <input
                v-model="fullname"
                type="text"
                name="fullname"
                id="full-name"
                autocomplete="name"
                class="input"
                placeholder="Full name"
              />
            </div>
            <div>
              <label for="email" class="sr-only">Email</label>
              <input
                required
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="input"
                placeholder="Email"
              />
            </div>
            <div>
              <label for="phone" class="sr-only">Phone</label>
              <input
                v-model="phone"
                type="text"
                name="phone"
                id="phone"
                autocomplete="tel"
                class="input"
                placeholder="Phone"
              />
            </div>
            <div>
              <label for="text" class="sr-only">Subject</label>
              <input
                required
                v-model="subject"
                type="text"
                name="subject"
                id="subject"
                class="input"
                placeholder="Subject"
              />
            </div>
            <div>
              <label for="message" class="sr-only">Message</label>
              <textarea
                required
                v-model="message"
                id="message"
                name="message"
                rows="4"
                class="input"
                placeholder="Message"
              />
            </div>
            <div>
              <button
                type="submit"
                class="inline-flex justify-center rounded-md border border-transparent bg-accent py-2 px-6 text-base font-medium text-white shadow-sm hover:bg-accent-hover"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

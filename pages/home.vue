<script setup lang="ts">
definePageMeta({
  title: "Home",
  name: "Home",
  path: "/",
  description: "Home page",
  keywords: "Home",
});
</script>

<template>
  <div>
    <main>
      <!-- Hero section -->
      <div class="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
        <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
          <div class="mt-10">
            <div>
              <div class="inline-flex space-x-4">
                <span class="rounded bg-accent-faded px-2.5 py-1 text-sm font-semibold text-accent">What's new</span>
                <span class="inline-flex items-center space-x-1 text-sm font-medium text-accent">
                  <span class="mr-2">Just dropped version 0.1.0</span>
                  <span class="relative flex h-3 w-3">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"
                    ></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                  </span>
                </span>
              </div>
            </div>
            <div class="mt-6 sm:max-w-xl">
              <h1 class="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                A better way to create your next project.
              </h1>
              <p class="mt-6 text-xl text-muted">
                Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
              </p>
            </div>
            <a href="/app-release.apk" class="btn-primary mt-8" download> Download the App !!! </a>
          </div>
        </div>

        <div class="sm:mx-auto sm:max-w-3xl sm:px-6">
          <div class="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div class="hidden sm:block">
              <div
                class="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-secondary lg:left-80 lg:right-0 lg:w-full"
              />
              <svg
                class="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                width="404"
                height="392"
                fill="none"
                viewBox="0 0 404 392"
              >
                <defs>
                  <pattern
                    id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                    x="0"
                    y="0"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                  >
                    <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                  </pattern>
                </defs>
                <rect width="404" height="392" fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
              </svg>
            </div>
            <div class="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
              <img
                class="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                src="https://tailwindui.com/img/component-images/task-app-rose.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div class="bg-primary">
        <div class="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
          <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">
            Ready to dive in?<br />Start your free trial today.
          </h2>
          <div class="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
            <button type="button" class="btn-primary">Get started</button>
            <button type="button" class="btn-secondary py-2">Learn more</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </div>
</template>

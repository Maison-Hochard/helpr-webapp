<script setup lang="ts">
import { ArrowLongRightIcon } from "@heroicons/vue/24/outline";
import Footer from "@/components/layout/Footer.vue";
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
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative py-16">
        <div
          class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0"
        ></div>
        <div class="flex items-center justify-center">
          <div class="gradient rounded-md px-6 py-4">
            <Logo :size="12" />
          </div>
        </div>
        <h1 class="text-4xl font-bold tracking-tight text-primary sm:text-5xl text-center mt-4">
          <span>
            Built by <span class="text-gradient">developers</span><br />
            for developers
          </span>
        </h1>
        <div class="mt-5 flex justify-center gap-6">
          <button type="button" class="btn-primary py-1 px-10 mt-4 flex items-center group">
            Get started
            <ArrowLongRightIcon
              class="w-5 h-5 ml-2 text-inverted group-hover:translate-x-1 transition-transform duration-300"
            />
          </button>
        </div>
      </div>

      <hr class="my-16 border-gray-600 w-3/4 mx-auto" />

      <!-- Details section -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div
          class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0"
        ></div>
        <div class="flex flex-col items-center justify-center">
          <div class="flex flex-col items-center">
            <h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl text-center">
              Unlike any <span class="text-gradient">tool</span><br />
              you've used before
            </h2>
            <p class="mt-3 text-xl text-muted text-center">
              Designed to be fast to the last pixel, helpr<br />
              combines UI excellence and fast performance.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-16">
            <div class="glass-card">
              <img src="/images/landing/fast.webp" alt="Fast" class="rounded-md" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>Fast</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
              </div>
            </div>
            <div class="glass-card">
              <img src="/images/landing/dynamic.webp" alt="Dynamic" class="rounded-md" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>Dynamic</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
              </div>
            </div>
            <div class="glass-card">
              <img src="/images/landing/integrations.webp" alt="Integrations" class="rounded-md" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>Integrations</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
              </div>
            </div>
            <div class="glass-card">
              <img src="/images/landing/secure.webp" alt="Secure" class="rounded-md" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>Secure</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
              </div>
            </div>
            <div class="glass-card">
              <img src="/images/landing/cross-platform.webp" alt="Cross-platform" class="rounded-md" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>Cross-platform</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
              </div>
            </div>
            <div class="glass-card">
              <img src="/images/landing/customize.webp" alt="Customize" class="rounded-md" />
              <div class="card-content">
                <h3 class="text-xl font-bold tracking-tight text-primary sm:text-2xl text-center mt-4">
                  <span>Customize</span>
                </h3>
                <p class="mt-3 text-lg text-muted text-center">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
                  amet fugiat veniam occaecat fugiat aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="my-16 border-gray-600 w-3/4 mx-auto" />

      <!-- CTA section -->
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div
          class="backdrop-shadow bg-accent top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-0"
        ></div>
        <div
          class="backdrop-blur-md bg-primary-opacity/30 rounded-lg py-12 px-6 sm:py-16 sm:px-12 lg:py-20 lg:px-16 flex flex-col items-center"
        >
          <div class="flex items-center justify-center">
            <Logo :size="12" />
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-primary sm:text-3xl text-center mt-4">
            Say hello to your <br />brand new <span class="text-gradient">workflow</span>
          </h2>
          <p class="mt-3 text-xl text-muted text-center">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet
            fugiat veniam occaecat fugiat aliqua.
          </p>
          <div class="mt-10 flex justify-center gap-6">
            <button type="button" class="btn-primary py-1">Get started</button>
            <button type="button" class="btn-secondary py-1">Learn more</button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  </div>
</template>

<style scoped lang="scss">
.backdrop-shadow {
  position: absolute;
  filter: blur(150px);
  width: 30%;
  height: 30%;
}
</style>

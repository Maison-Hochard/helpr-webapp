<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";
import { Plan, Plans } from "~/types/Pricing";
definePageMeta({
  name: "Pricing",
  title: "Pricing",
  description: "Pricing page",
});

const premiumPlan: Plan = {
  id: "prod_NEMP9hBJdE3WNV",
  name: "Premium",
  price: 10,
  priceId: Plans.PREMIUM.priceId,
  description: "Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis.",
  features: [
    "Pariatur quod similique",
    "Sapiente libero doloribus modi nostrum",
    "Vel ipsa esse repudiandae excepturi",
    "Itaque cupiditate adipisci quibusdam",
    "Sapiente libero doloribus modi nostrum",
  ],
};

const user = useUserStore().getUser;

async function redirectToLogin() {
  if (!user) {
    useRouter().push("/login");
  }
}
</script>

<template>
  <div class="bg-primary py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl sm:text-center">
        <h2 class="text-3xl font-bold tracking-tight text-primary sm:text-4xl">Simple no-tricks pricing</h2>
        <p class="mt-6 text-lg leading-8 text-muted">
          Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non voluptas in.
          Explicabo id ut laborum.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-secondary sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
        <div class="p-8 sm:p-10 lg:flex-auto">
          <h3 class="text-2xl font-bold tracking-tight text-primary">Premium membership</h3>
          <p class="mt-6 text-base leading-7 text-muted">
            Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
            repellendus etur quidem assumenda.
          </p>
          <div class="mt-10 flex items-center gap-x-4">
            <h4 class="flex-none text-sm font-semibold leading-6 text-muted">What’s included</h4>
            <div class="h-px flex-auto bg-gray-100" />
          </div>
          <ul role="list" class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-muted sm:grid-cols-2 sm:gap-6">
            <li v-for="feature in premiumPlan.features" :key="feature" class="flex gap-x-3">
              <CheckIcon class="h-6 w-5 flex-none text-accent" aria-hidden="true" />
              {{ feature }}
            </li>
          </ul>
        </div>
        <form
          action="/api/stripe/subscribe"
          method="post"
          class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0"
        >
          <div
            class="rounded-2xl bg-secondary py-10 text-center ring-1 ring-inset ring-secondary lg:flex lg:flex-col lg:justify-center lg:py-16"
          >
            <div class="mx-auto max-w-xs px-8">
              <p class="text-base font-semibold text-muted">Increase your productivity now</p>
              <p class="mt-6 flex items-baseline justify-center gap-x-2">
                <span class="text-5xl font-bold tracking-tight text-primary">{{ premiumPlan.price }}€</span>
                <span class="text-sm font-semibold leading-6 tracking-wide text-muted">/mo</span>
              </p>
              <input type="hidden" name="userId" :value="user?.id" />
              <button
                :type="user ? 'submit' : 'button'"
                @click="user ? null : redirectToLogin()"
                name="priceId"
                :value="premiumPlan.priceId"
                class="btn-primary mt-8 w-full"
                :aria-describedby="user ? null : 'login-required'"
              >
                S'inscrire
              </button>
              <p class="mt-6 text-xs leading-5 text-muted">
                Lorem ipsum dolor sit amet consect etur adipisicing elit. Itaque amet indis perferendis blanditiis
                repellendus etur quidem assumenda.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

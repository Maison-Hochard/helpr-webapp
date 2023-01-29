import Stripe from "stripe";

const config = useRuntimeConfig();
const stripe = new Stripe(config.private.stripeSecretKey, {
  apiVersion: "2022-11-15",
});

export async function createStripeCustomer(email: string): Promise<{ stripeCustomerId: string }> {
  const customer = await stripe.customers.create({
    email,
  });
  return {
    stripeCustomerId: customer.id,
  };
}
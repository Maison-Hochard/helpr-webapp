import Stripe from "stripe";

const config = useRuntimeConfig();
const stripe = new Stripe(config.private.stripeSecretKey, {
  apiVersion: "2022-11-15",
});

export default eventHandler(async (event) => {
  const body = await readBody(event);
  const stripeCustomerId = body.stripeCustomerId;
  const returnUrl = useRuntimeConfig().public.appDomain;
  const portalSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl + "app/edit-profile",
  });
  await sendRedirect(event, portalSession.url);
});

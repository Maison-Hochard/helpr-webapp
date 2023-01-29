import { getUserById, updateStripeCustomerId } from "~/server/app/userService";
import { getSubscribeUrl } from "~/server/app/stripeService";
import { User } from "@prisma/client";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const priceId = body.priceId;
  const userId = body.userId;

  const user = await getUserById(parseInt(userId)) as User;

  const { url, user: customer, shouldUpdateUser } = await getSubscribeUrl(priceId, user);

  if(shouldUpdateUser) {
    await updateStripeCustomerId(customer);
  }

  await sendRedirect(event, url);
});
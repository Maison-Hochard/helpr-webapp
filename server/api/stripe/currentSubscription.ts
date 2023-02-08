import { getCurrentSubscription } from "~/server/app/userService";
import { Subscription } from "@prisma/client";

export default defineEventHandler(async (event): Promise<Subscription | null> => {
  const body = await readBody(event);
  const userId = parseInt(body.userId);
  return await getCurrentSubscription(userId);
});

import { H3Event } from "h3";
import { updateUser } from "~/server/app/userService";
import { User } from "@prisma/client";

export default eventHandler(async (event: H3Event): Promise<User> => {
  const userId = parseInt(event.context.params.userId);
  const updateUserInput = await readBody(event);
  return await updateUser(userId, updateUserInput);
});
import { getUserById } from "~/server/app/userService";
import { H3Event } from "h3";

export default eventHandler(async (event: H3Event) => {
  const query = getQuery(event);
  if (!query.userId) {
    throw new Error("userId is required");
  }
  return await getUserById(parseInt(query.userId as string));
});

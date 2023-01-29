import { H3Event } from "h3";
import { getAllUsers } from "~/server/app/userService";

export default eventHandler(async (event: H3Event) => {
  return await getAllUsers();
});
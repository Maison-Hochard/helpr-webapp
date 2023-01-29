import { H3Event } from "h3";
import { getAllUsers } from "~/server/app/userService";
import { User } from "@prisma/client";

export default eventHandler(async (event: H3Event): Promise<User[]> => {
  return await getAllUsers();
});
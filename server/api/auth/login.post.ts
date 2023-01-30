import { H3Event } from "h3";
import bcrypt from "bcrypt";
import { getUserByLogin, setAuthToken } from "~/server/app/userService";
import { User } from "@prisma/client";

export default eventHandler(async (event: H3Event): Promise<User|void> => {
  const body = await readBody(event);
  const user = await getUserByLogin(body.login);
  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }));
  }
  if (await bcrypt.compare(body.password, user.password)) {
    const authToken = await setAuthToken(user.id);
    setCookie(event, "authToken", authToken, { httpOnly: true, path: "/", maxAge: 1000 * 60 * 60 * 24 * 7 });
    return user;
  } else {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Invalid credentials" }));
  }
});
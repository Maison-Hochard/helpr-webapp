import { H3Event } from "h3";
import bcrypt from "bcrypt";
import { getUserByLogin, setAuthToken } from "~/server/app/userService";
import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export default eventHandler(async (event: H3Event): Promise<User|void> => {
  const body = await readBody(event);
  const user = await getUserByLogin(body.login);
  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Unauthorized" }));
  }
  if (await bcrypt.compare(body.password, user.password)) {
    const authToken = jwt.sign({
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email
    }, useRuntimeConfig().private.jwtSecret);
    await setAuthToken(user.id, authToken);
    setCookie(event, "authToken", authToken, { httpOnly: true, path: "/", maxAge: 1000 * 60 * 60 * 24 * 7 });
    return user;
  } else {
    return sendError(event, createError({ statusCode: 401, statusMessage: "Invalid credentials" }));
  }
});
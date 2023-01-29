import { H3Event } from "h3";
import { createUser, createUserInput } from "~/server/app/userService";

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event);
  const createUserInput: createUserInput = {
    username: body.username,
    password: body.password,
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
  };
  return await createUser(createUserInput);
});
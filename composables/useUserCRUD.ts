import { createUserInput } from "~/server/api/user/user.dto";

export async function useSignup(createUserInput: createUserInput) {
  await useFetch("/api/auth/signup", {
    method: "POST",
    body: createUserInput,
  });
}

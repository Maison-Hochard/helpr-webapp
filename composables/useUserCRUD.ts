import { createUserInput } from "~/server/api/user/user.dto";

export async function useSignup(createUserInput: createUserInput) {
  const { error } = await useFetch("/api/auth/signup", {
    method: "POST",
    body: createUserInput,
  });
  console.log(error);
  if (error.value) {
    useErrorToast(error.value.data.message);
    return;
  }
  useSuccessToast("You have successfully signed up!");
  useRouter().push("/login");
}

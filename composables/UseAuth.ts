import { User } from "@prisma/client";
export async function useUser(): Promise<User|null> {
  const config = useRuntimeConfig();
  const user = useState<User|null>("user");

  if (!user.value) {
    const header = useRequestHeaders(["cookie"]);
    try {
      const response = await $fetch<User>(
        `${config.public.apiUrl}auth/refresh`,
        {
          method: "POST",
          headers: header as HeadersInit,
          credentials: "include",
        },
      );
      return user.value = response;
    } catch (e) { /* empty */ }
  }
  return user.value;
}

export async function useLogin(login: string, password: string) {
  const config = useRuntimeConfig();
  const response = await $fetch<User>(`${config.public.apiUrl}auth/login`, {
    method: "POST",
    body: {
      login,
      password,
    },
    credentials: "include",
  });
  if (!response) return;
  console.log(response);
  useState<User|null>("user").value = response;
  useRouter().push("/app/profile");
}

export async function useLogout() {
  const config = useRuntimeConfig();
  const user = useState<User|null>("user");
  if (!user.value) {
    useRouter().push("/");
    return;
  }
  await $fetch(`${config.public.apiUrl}auth/logout`, {
    method: "POST",
    headers: {
      "authorization": `Bearer ${user.value.authToken}`,
    },
    credentials: "include",
  });
  useState<User|null>("user").value = null;
  useRouter().push("/");
}
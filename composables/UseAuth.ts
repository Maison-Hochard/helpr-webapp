import { User } from "@prisma/client";

export const useAuthCookie = () => useCookie("refreshToken");

export async function useUser(): Promise<User|null> {
  const authCookie = useAuthCookie();
  const config = useRuntimeConfig();
  const user = useState<User|null>("user");

  if (authCookie.value != undefined && user.value == undefined) {
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

export async function useLogin(login: string, password: string): Promise<User|null> {
  const config = useRuntimeConfig();
  const response = await $fetch<User>(`${config.public.apiUrl}auth/login`, {
    method: "POST",
    body: {
      login,
      password,
    },
    credentials: "include",
  });
  if (!response) return null;
  useState<User|null>("user").value = response;
  useRouter().push("/app/profile");
  return response;
}

export async function useLogout() {
  const user = useState<User|null>("user");
  if (!user.value) {
    useRouter().push("/");
    return;
  }
  await useAPI("auth/logout", "POST");
  useState<User|null>("user").value = null;
  useRouter().push("/");
}
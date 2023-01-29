import { User } from "@prisma/client";

export const useAuthCookie = () => useCookie("authToken");

export async function useUser(): Promise<User | null> {
  const authCookie = useAuthCookie().value;
  const user = useState<User | null>("user");

  if (authCookie && !user.value) {
    const cookieHeaders = useRequestHeaders(["cookie"]);
    const { data } = await useFetch<User>("/api/auth/users-token", {
      method: "GET",
      headers: cookieHeaders as HeadersInit,
    });
    user.value = data.value;
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
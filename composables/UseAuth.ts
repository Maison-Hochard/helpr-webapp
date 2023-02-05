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

export async function useLogin(login: string, password: string) {
  const { data } = await useFetch("/api/auth/login", {
    method: "POST",
    body: {
      login: login,
      password: password,
    }
  });
  if (data.value) {
    useState("user").value = data.value;
    useRouter().push("/app/profile");
  }
}

export async function useLogout() {
  const user = useState<User|null>("user");
  if (!user.value) {
    useRouter().push("/");
    return;
  }
  await useFetch("/api/auth/logout", {
    method: "POST",
  });
  useState("user").value = null;
  useRouter().push("/");
}
import { User } from "~~/types/User";
import { useUserStore } from "~~/store/userStore";

export const useAuthCookie = () => useCookie("authToken");

export async function useUser(): Promise<User | null> {
  const authCookie = useAuthCookie().value;
  const user = useUserStore().getUser;

  if (authCookie && !user) {
    const cookieHeaders = useRequestHeaders(["cookie"]);
    const { data } = await useFetch<User>("/api/auth/currentUser", {
      method: "GET",
      headers: cookieHeaders as HeadersInit,
    });
    if (!data.value) {
      return null;
    }
    useUserStore().setUser(data.value);
    useUserStore().setSubscription(data.value.subscription);
  }
  return user;
}

export async function useLogin(login: string, password: string) {
  const { data, error } = await useFetch<User>("/api/auth/login", {
    method: "POST",
    body: {
      login: login,
      password: password,
    },
  });
  if (data.value) {
    useState("user").value = data.value;
    useUserStore().setUser(data.value);
    useUserStore().setSubscription(data.value.subscription);
    useRouter().push("/app/my-flows");
    return {
      user: data.value,
    };
  } else {
    return {
      error: error.value,
    };
  }
}

export async function useLogout() {
  const user = useUserStore().getUser;
  useRouter().push("/");
  await useFetch("/api/auth/logout", {
    method: "POST",
  });
  if (user) {
    useUserStore().logout();
  }
}

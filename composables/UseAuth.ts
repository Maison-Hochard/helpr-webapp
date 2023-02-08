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
    useUserStore().setSubscription(data.value.Subscription);
  }
  return user;
}

export async function useLogin(login: string, password: string) {
  const { data } = await useFetch<User>("/api/auth/login", {
    method: "POST",
    body: {
      login: login,
      password: password,
    },
  });
  if (data.value) {
    useState("user").value = data.value;
    useUserStore().setUser(data.value);
    useUserStore().setSubscription(data.value.Subscription);
    useRouter().push("/app/profile");
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

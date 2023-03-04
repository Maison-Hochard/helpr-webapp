import { User } from "~~/types/User";
import { useUserStore } from "~~/store/userStore";

export async function useUser(): Promise<User | null> {
  const authCookie = useCookie("authToken").value;
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

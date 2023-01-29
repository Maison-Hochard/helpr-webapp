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

export async function useSignup(username: string, firstname: string, lastname: string, email: string, password: string): Promise<User|null> {
  const config = useRuntimeConfig();
  const response = await $fetch<User>(`${config.public.apiUrl}auth/register`, {
    method: "POST",
    body: {
      username,
      firstname,
      lastname,
      email,
      password,
    }
  });
  if (!response) return null;
  useRouter().push("/login");
  return response;
}

export async function useUpdateUser(): Promise<User|null> {
  const config = useRuntimeConfig();
  const user = useState<User|null>("user");
  if (!user.value) {
    return null;
  }
  const response = await $fetch<User>(`${config.public.apiUrl}user/${user.value.id}`, {
    method: "PATCH",
    body: user.value,
    headers: {
      "authorization": `Bearer ${user.value.authToken}`,
    }
  });
  if (!response) return null;
  useState<User|null>("user").value = response;
  return response;
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

export async function useDeleteAccount() {
  const config = useRuntimeConfig();
  const user = useState<User|null>("user");
  if (!user.value) {
    useRouter().push("/");
    return;
  }
  await $fetch(`${config.public.apiUrl}user/${user.value.id}`, {
    method: "DELETE",
    headers: {
      "authorization": `Bearer ${user.value.authToken}`,
    },
    credentials: "include",
  });
  useState<User|null>("user").value = null;
  useRouter().push("/");
}
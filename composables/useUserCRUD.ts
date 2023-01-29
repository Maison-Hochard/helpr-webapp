import { User } from "@prisma/client";

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
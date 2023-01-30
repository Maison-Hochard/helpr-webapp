import { User } from "@prisma/client";
import { FetchContext, FetchResponse } from "ofetch";

type RequestMethod = "GET" | "POST" | "PUT" |"PATCH" | "DELETE";

export async function useAPI<T>(
  url: string,
  method: RequestMethod,
  body?: object | User | null,
): Promise<T | null> {
  const config = useRuntimeConfig();
  const fullURL = `${config.public.apiUrl}${url}`;
  const user = useState<User | null>("user");
  try {
    return await $fetch<T>(fullURL, {
      method,
      body,
      headers: {
        authorization: `Bearer ${user.value?.authToken || ""}`,
      },
      credentials: "include",
    }) as T;
  } catch (error) {
    const context = error as FetchContext & { response: FetchResponse<T> };
    if (context.response.status === 401) {
      try {
        useState<User | null>("user").value = await useAPI<User>("auth/refresh", "POST");
        return useAPI<T>(url, method, body);
      } catch (error) {
        useState<User | null>("user").value = null;
        useRouter().push("/");
      }
    }
    return null;
  }
}

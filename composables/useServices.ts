import { ApiResponse } from "~/composables/useAPI";
import { ProviderCredentials } from "@prisma/client";

export async function addCredentials(provider: string, accessToken: string) {
  const url = `/${provider}/add-credentials`;
  const res = await useAPI(url, "POST", {
    accessToken: accessToken,
  });
  console.log(res);
}

export async function getAuthenticatedProviders() {
  const url = "/provider/user-services";
  const { data: services } = await useAPI<ApiResponse>(url, "GET");
  return services as ProviderCredentials[];
}

export async function getProviders() {
  const url = "/provider/providers";
  const { data: providers } = await useAPI<ApiResponse>(url, "GET");
  return providers;
}

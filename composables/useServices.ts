import { ApiResponse } from "~/composables/useAPI";
import { ProviderCredentials } from "@prisma/client";

export const addCredentials = async (provider: string, accessToken: string) => {
  const url = `/${provider}/add-credentials`;
  const res = await useAPI(url, "POST", {
    accessToken: accessToken,
  });
  console.log(res);
};

export const getAuthenticatedServices = async () => {
  const url = "/provider/user-services";
  const { data: services } = await useAPI<ApiResponse>(url, "GET");
  return services as ProviderCredentials[];
};
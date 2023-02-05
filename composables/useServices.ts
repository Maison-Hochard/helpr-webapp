export const addCredentials = async (provider: string, accessToken: string) => {
  const url = `/${provider}/add-credentials`;
  const res = await useAPI(url, "POST", {
    accessToken: accessToken,
  });
  console.log(res);
};
export const addCredentials = async (provider: string, accessToken: string) => {
  const url = `https://api.helprapp.fr/${provider}/add-credentials`;
  const response = await $fetch(url, {
    method: "POST",
    body: {
      accessToken: accessToken,
    }
  });
  console.log(response);
  /*const res = await useAPI(url, "POST", {
    accessToken: accessToken,
  });
  console.log(res);*/
};
import { User } from "~/types/User";

export default defineNuxtRouteMiddleware(async () => {
  /*const config = useRuntimeConfig().public.appDomain;
  try {
    const user: User = await $fetch(config + "api/user/currentUser", {
      method: "GET",
    });
    console.log(user);
    if (!user?.admin) {
      console.log("not admin");
      navigateTo("/");
    }
    console.log("admin");
  } catch (error) {
    navigateTo("/login");
  }*/
});

export default defineNuxtRouteMiddleware(async () => {
  await useUser();
  const user = useUserStore().getUser;
  if (user == null && user == undefined || !user) {
    return "/login";
  }
});
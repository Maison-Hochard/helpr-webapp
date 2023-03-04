export default defineNuxtRouteMiddleware(() => {
  const user = useUserStore().getUser;
  if (user) {
    return "/app/my-flows";
  }
});

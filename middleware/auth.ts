export default defineNuxtRouteMiddleware(async (to) => {
  const user = await useUser();
  if (user === null) {
    navigateTo("/login?redirectTo=" + to.path);
  }
});

export enum Role {
  USER = 1,
  ADMIN = 2,
}

export default defineNuxtRouteMiddleware(async () => {
  const user = await useUser();

  if (user?.role !== Role.ADMIN) {
    return;
  }
});

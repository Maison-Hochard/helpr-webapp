import prisma from "~/server/database/client";

export async function getSomeUsers() {
  return prisma.user.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
}

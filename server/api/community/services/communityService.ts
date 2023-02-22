import prisma from "~/server/database/client";

export async function getSomeUsers() {
  return prisma.user.findMany({
    take: 10,
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function searchUsers(search: string) {
  return prisma.user.findMany({
    where: {
      OR: [
        {
          firstname: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          lastname: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    },
    take: 20,
  });
}

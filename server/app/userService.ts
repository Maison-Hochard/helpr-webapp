import { User } from "@prisma/client";
import prisma from "~/server/database/client";
import bcrypt from "bcrypt";
import { isString } from "@vueuse/core";
import { H3Event } from "h3";
import { Role } from "~/types/Role";

export interface createUserInput {
  username: string
  firstname: string
  lastname: string
  password: string
  email: string
  profilePic?: string
  role?: number
}

export async function createUser(userData: createUserInput): Promise<User> {
  const password = await bcrypt.hash(userData.password, 10);
  return await prisma.user.create({
    data: {
      ...userData,
      password,
    }
  });
}

export async function getUserById(userId: number): Promise<User|null> {
  return await prisma.user.findUnique({ where: { id: userId } });
}

export async function getUserByLogin(login: string): Promise<User|null> {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { username: login }],
    },
  });
}

export async function getAllUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function getUserByAuthToken(authToken: string) {
  return await prisma.user.findFirst({
    where: {
      authToken,
    },
  });
}

export async function setAuthToken(userId: number, authToken: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      authToken,
    },
  });
}

export async function adminCheck(event: H3Event): Promise<boolean> {
  const authToken = getCookie(event, "authToken");
  const hasAuthToken = isString(authToken);
  if(!hasAuthToken) return false;
  const user  = await getUserByAuthToken(authToken);
  if (!user) return false;
  return user.role === Role.ADMIN;
}
import { Subscription, User } from "@prisma/client";
import prisma, { exclude } from "~/server/database/client";
import bcrypt from "bcrypt";
import { isString } from "@vueuse/core";
import { H3Event } from "h3";
import { Role } from "~/types/Role";
import jwt from "jsonwebtoken";
import { createStripeCustomer, deleteStripeCustomer } from "~/server/app/stripeService";
import { createUserInput, updateUserInput } from "~/server/api/user/user.dto";
import { Plans } from "~/types/Pricing";
import resetPassword from "~/server/api/mailer/templates/reset-password";
import { sendGmail } from "~/server/app/mailerService";
import { generateEmailVerificationToken } from "~/server/app/authService";

export async function createUser(userData: createUserInput) {
  const foundUser = await prisma.user.findFirst({
    where: {
      OR: [
        {
          username: userData.username,
        },
        {
          email: userData.email,
        },
      ],
    },
  });
  if (foundUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }
  const password = await bcrypt.hash(userData.password, 10);
  const stripeInfo = await createStripeCustomer(userData);
  const user = await prisma.user.create({
    data: {
      ...userData,
      password,
      stripeCustomerId: stripeInfo.stripeCustomerId,
    },
  });
  await prisma.subscription.create({
    data: {
      userId: user.id,
      name: Plans.TRIAL.name,
      stripeId: stripeInfo.subscription.id,
      stripeStatus: stripeInfo.subscription.status,
      stripePriceId: stripeInfo.subscription.items.data[0].price.id,
      trialEndsAt: stripeInfo.subscription.trial_end,
      endsAt: stripeInfo.subscription.current_period_end,
      lastEventDate: stripeInfo.subscription.current_period_start,
      startDate: stripeInfo.subscription.current_period_start,
    },
  });
  const token = await generateEmailVerificationToken(user.id);
  const appDomain = useRuntimeConfig().public.appDomain;
  const url = `${appDomain}/verify/user?token=${token}`;
  await sendGmail({
    template: resetPassword(user.email, url),
    to: user.email,
    from: useRuntimeConfig().mailerUser,
    subject: "Verify your email",
  });
  return exclude(user, ["password", "authToken", "refreshToken"]);
}

export async function getUserById(userId: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) throw createError({ statusCode: 404, message: "User not found" });
  return exclude(user, ["password", "authToken", "refreshToken"]);
}

export async function getUserByLogin(login: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: login }, { username: login }],
    },
  });
}

export async function getAllUsers() {
  const users = await prisma.user.findMany({
    include: {
      subscription: true,
    },
  });
  return users.map((user) => {
    return exclude(user, ["password", "authToken", "refreshToken"]);
  });
}

export async function getUserByAuthToken(authToken: string) {
  const user = await prisma.user.findFirst({
    where: {
      authToken,
    },
    include: {
      subscription: true,
    },
  });
  if (!user) return null;
  return exclude(user, ["password"]);
}

export async function setAuthToken(userId: number) {
  const user = (await getUserById(userId)) as User;
  const authToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    useRuntimeConfig().private.authSecret,
    { expiresIn: "7d" },
  );
  const refreshToken = jwt.sign(
    {
      id: user.id,
      role: user.role,
      username: user.username,
      email: user.email,
    },
    useRuntimeConfig().private.refreshTokenSecret,
    { expiresIn: "30d" },
  );
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      authToken,
      refreshToken,
    },
    include: {
      subscription: true,
    },
  });
  return exclude(updatedUser, ["password"]);
}

export async function adminCheck(event: H3Event): Promise<boolean> {
  const authToken = getCookie(event, "authToken");
  const hasAuthToken = isString(authToken);
  if (!hasAuthToken) return false;
  const user = await getUserByAuthToken(authToken);
  if (!user) return false;
  return user.role === Role.ADMIN;
}

export async function deleteUser(userId: number) {
  const user = (await getUserById(userId)) as User;
  await deleteStripeCustomer(user.stripeCustomerId as string);
  return await prisma.user.delete({
    where: {
      id: userId,
    },
  });
}

export async function updateUser(userId: number, updateUserInput: updateUserInput) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...updateUserInput,
    },
    include: {
      subscription: true,
    },
  });
  return exclude(user, ["password", "authToken", "refreshToken"]);
}

export async function updateStripeCustomerId(data: User): Promise<User> {
  return await prisma.user.update({
    where: { email: data.email },
    data: {
      stripeCustomerId: data.stripeCustomerId,
    },
  });
}

export async function getUserByStripeCustomerId(stripeCustomerId: string) {
  const user = await prisma.user.findFirst({
    where: {
      stripeCustomerId: stripeCustomerId,
    },
  });
  if (!user) throw createError({ statusCode: 404, message: "User not found" });
  return exclude(user, ["password", "authToken", "refreshToken"]);
}

export async function getCurrentSubscription(userId: number): Promise<Subscription | null> {
  const user = (await getUserById(userId)) as User;
  return await prisma.subscription.findFirst({
    where: {
      userId: user.id,
    },
  });
}

export async function getSubscriptionById(stripeId: string) {
  return await prisma.subscription.findFirst({
    where: {
      stripeId: stripeId,
    },
  });
}

export async function createOrUpdateSubscription(data: Subscription) {
  const subName = data.stripePriceId === Plans.TRIAL.priceId ? Plans.TRIAL.name : Plans.PRO.name;
  return await prisma.subscription.upsert({
    where: {
      stripeId: data.stripeId,
    },
    create: {
      userId: data.userId,
      name: subName,
      stripeId: data.stripeId,
      stripeStatus: data.stripeStatus,
      stripePriceId: data.stripePriceId,
      trialEndsAt: data.trialEndsAt,
      endsAt: data.endsAt,
      lastEventDate: data.lastEventDate,
      startDate: data.startDate,
    },
    update: {
      name: subName,
      stripeStatus: data.stripeStatus,
      stripePriceId: data.stripePriceId,
      trialEndsAt: data.trialEndsAt,
      endsAt: data.endsAt,
      lastEventDate: data.lastEventDate,
      startDate: data.startDate,
    },
  });
}

export async function generateToken(userId: number) {
  const token = Math.random().toString(36);
  await prisma.resetPassword.create({
    data: {
      token,
      userId,
    },
  });
  return token;
}

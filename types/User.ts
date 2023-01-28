import { Session, User } from "@prisma/client";

export type SessionWithUser = Session & {
  user: User;
}
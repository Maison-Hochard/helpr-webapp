import { defineStore } from "pinia";
import { Subscription, User } from "@prisma/client";

interface UserState {
  accessToken: string;
  user: User;
  subscription: Subscription[];
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      accessToken: "",
      user: null,
      subscription: null,
    };
  },
  getters: {
    getAccessToken(): string {
      return this.accessToken;
    },
    getUser(): User {
      return this.user;
    },
    getSubscription(): Subscription {
      return this.subscription;
    }
  },
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
    setUser(user: User) {
      this.user = user;
    },
    setSubscription(subscription: Subscription[]) {
      this.subscription = subscription;
    }
  }
});
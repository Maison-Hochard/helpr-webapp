import { defineStore } from "pinia";
import { Subscription } from "@prisma/client";

interface UserState {
  accessToken: string;
  user: any;
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
    getUser(): any {
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
    setUser(user: any) {
      this.user = user;
    },
    setSubscription(subscription: Subscription[]) {
      this.subscription = subscription;
    }
  }
});
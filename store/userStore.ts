import { defineStore } from "pinia";

interface UserState {
  accessToken: string;
  user: any;
}

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      accessToken: "",
      user: null,
    };
  },
  getters: {
    getAccessToken(): string {
      return this.accessToken;
    },
    getUser(): any {
      return this.user;
    }
  },
  actions: {
    setAccessToken(accessToken: string) {
      this.accessToken = accessToken;
    },
    setUser(user: any) {
      this.user = user;
    }
  }
});
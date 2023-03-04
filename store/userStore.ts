import { defineStore } from "pinia";
import { Subscription } from "@prisma/client";
import { User } from "~/types/User";

interface UserState {
  accessToken: string;
  user: User | null;
  subscription: Subscription[] | null;
}

const defaultUserState: UserState = {
  accessToken: "",
  user: null,
  subscription: null,
};

export const useUserStore = defineStore("user", {
  state: (): UserState => {
    return {
      accessToken: "",
      user: null,
      subscription: null,
    };
  },
  getters: {
    isAdmin(): boolean {
      if (this.user) {
        return this.user.role === 2;
      } else {
        return false;
      }
    },
    isPremium(): boolean {
      if (this.subscription) {
        return this.subscription[0].name === "Premium";
      } else {
        return false;
      }
    },
    getAccessToken(): string {
      return this.accessToken;
    },
    getUser(): User | null {
      return this.user;
    },
    getSubscription(): Subscription[] | null {
      return this.subscription;
    },
  },
  actions: {
    setVerified() {
      if (this.user) {
        this.user.isVerified = true;
      }
    },
    setUser(user: User) {
      this.user = user;
    },
    setSubscription(subscription: Subscription[]) {
      this.subscription = subscription;
    },
    logout() {
      this.$state = defaultUserState;
    },
    async updateUser(toast = true, confirmation = true) {
      if (confirmation && !confirm("Are you sure you want to update your profile ?")) return;
      if (!this.user) return;
      const { data: updatedUser, error } = await useFetch<User>(`/api/user/${this.user.id}`, {
        method: "PUT",
        body: this.user,
      });
      if (error.value?.statusMessage === "username_or_email_already_exists") {
        useErrorToast("Username already exists");
        return;
      }
      this.user = updatedUser.value;
      if (toast) {
        useSuccessToast("Profile updated");
      }
    },
  },
});

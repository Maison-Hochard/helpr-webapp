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
    async deleteUser() {
      if (confirm("Are you sure you want to delete your account?")) {
        if (this.user) {
          await useFetch("/api/user/" + this.user.id, {
            method: "DELETE",
          });
          useRouter().push("/");
          this.user = null;
        }
      }
    },
    async updateUser(toast = true) {
      if (confirm("Are you sure you want to update your profile?")) {
        if (this.user) {
          const { data: updatedUser } = await useFetch<User>("/api/user/" + this.user.id, {
            method: "PUT",
            body: this.user,
          });
          this.user = updatedUser.value;
          if (toast) {
            useSuccessToast("Profile updated successfully");
          }
        }
      }
    },
  },
});

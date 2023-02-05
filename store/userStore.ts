import { defineStore } from "pinia";
import { Subscription, User } from "@prisma/client";

interface UserState {
  accessToken: string;
  user: User;
  subscription: Subscription[];
}

const defaultUserState: UserState = {
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
    getAccessToken(): string {
      return this.accessToken;
    },
    getUser(): User {
      return this.user;
    },
    getSubscription(): Subscription[] {
      return this.subscription;
    },
  },
  actions: {
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
    async updateUser() {
      if (confirm("Are you sure you want to update your profile?")) {
        if (this.user) {
          const { data: updatedUser } = await useFetch<User>(
            "/api/user/" + this.user.id,
            {
              method: "PUT",
              body: this.user,
            },
          );
          this.user = updatedUser.value;
        }
      }
    }
  }
});
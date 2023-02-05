import { User } from "@prisma/client";
import { createUserInput } from "~/server/api/user/user.dto";

export async function useSignup(createUserInput: createUserInput) {
  await useFetch("/api/auth/signup", {
    method: "POST",
    body: createUserInput
  });
}

export async function useUpdateUser() {
  const user = useState<User|null>("user").value;
  if (confirm("Are you sure you want to update your profile?")) {
    if (user) {
      const { data: updatedUser } = await useFetch<User>(
        "/api/user/" + user.id,
        {
          method: "PUT",
          body: user,
        },
      );
      useState("user").value = updatedUser.value;
    }
  }
}

export async function useDeleteUser() {
  const user = useState<User|null>("user").value;
  if (confirm("Are you sure you want to delete your account?")) {
    if (user) {
      await useFetch("/api/user/" + user.id, {
        method: "DELETE",
      });
      useState("user").value = null;
      useRouter().push("/");
    }
  }
}
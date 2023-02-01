import { User } from "@prisma/client";
import { Role } from "~/types/Role";
import { CogIcon, HomeIcon } from "@heroicons/vue/24/outline";

type Where = "home" | "app" | "admin" | "profil_nav";

type Navigation = {
  name: string;
  to: string;
  icon: any;
};

const home: Navigation[] = [
  { name: "Home", to: "/", icon: HomeIcon },
  { name: "Pricing", to: "/pricing", icon: HomeIcon },
  { name: "Contact", to: "/contact", icon: HomeIcon },
];

const profil_nav: Navigation[] = [
  { name: "Home", to: "/", icon: HomeIcon },
  { name: "Profile", to: "/app/profile", icon: HomeIcon },
  { name: "Settings", to: "/app/settings", icon: CogIcon },
];

const app: Navigation[] = [
  { name: "Profil", to: "/app/profil", icon: HomeIcon },
  { name: "Profile", to: "/app/profile", icon: HomeIcon },
  { name: "Settings", to: "/app/settings", icon: CogIcon },
];

const admin: Navigation[] = [
  { name: "Dashboard", to: "/admin/dashboard", icon: HomeIcon },
  { name: "App-Settings", to: "/admin/app-settings", icon: CogIcon },
];

export function getNavigation(where: Where) {
  const user = useState<User | null>("user");
  if (user.value?.role === Role.ADMIN) {
    profil_nav.push({ name: "Admin", to: "/admin", icon: HomeIcon });
  }
  switch (where) {
  case "home":
    return home;
  case "profil_nav":
    return profil_nav;
  case "app":
    return app;
  case "admin":
    return admin;
  }
}

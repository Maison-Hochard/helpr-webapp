import {
  CogIcon,
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
  PencilIcon,
  PlusCircleIcon,
  BookmarkIcon,
} from "@heroicons/vue/24/outline";

type Where = "home" | "app" | "user" | "admin";

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

const app: Navigation[] = [
  { name: "My Flows", to: "/app/my-flows", icon: BookmarkIcon },
  { name: "Providers", to: "/app/providers", icon: HomeIcon },
];

const user: Navigation[] = [
  { name: "Profile", to: "/app/profile/me", icon: UserCircleIcon },
  { name: "Edit Profile", to: "/app/edit-profile", icon: PencilIcon },
  { name: "Settings", to: "/app/settings", icon: CogIcon },
];

const admin: Navigation[] = [
  { name: "Dashboard", to: "/app/admin/dashboard", icon: UserGroupIcon },
  { name: "App Management", to: "/app/admin/app-management", icon: CogIcon },
];

export function getNavigation(where: Where): Navigation[] {
  switch (where) {
    case "home":
      return home;
    case "app":
      return app;
    case "user":
      return user;
    case "admin":
      return admin;
    default:
      return [];
  }
}

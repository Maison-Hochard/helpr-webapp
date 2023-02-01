import {
  CogIcon,
  HomeIcon,
  UserGroupIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";

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
  { name: "Profil", to: "/app/profil", icon: UserCircleIcon },
  { name: "Profile", to: "/app/profile", icon: UserCircleIcon },
  { name: "Settings", to: "/app/settings", icon: CogIcon },
];

const admin: Navigation[] = [
  { name: "Dashboard", to: "/app/admin/dashboard", icon: UserGroupIcon },
  { name: "App-Settings", to: "/app/admin/app-settings", icon: CogIcon },
];

export function getNavigation(where: Where): Navigation[] {
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
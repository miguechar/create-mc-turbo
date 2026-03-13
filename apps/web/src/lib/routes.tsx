import { Car, HomeIcon, LifeBuoy, Send, ShipIcon } from "lucide-react";

export const routes = {
  home: {
    url: "/dashboard",
    title: "Dashboard",
    icon: HomeIcon,
  },
  trialCards: {
    url: "/trial-cards",
    title: "Trial Cards",
    icon: ShipIcon,
    items: [
      { url: "/trial-cards/0489", title: "0489" },
      { url: "/trial-cards/0491", title: "0491" },
      { url: "/trial-cards/0831", title: "0831" },
    ],
  },
  projects: {
    title: "Projects",
    url: (slug: string) => `/projects/${slug}`,
    icon: Car,
  },
  auth: {
    login: {
      url: "/login",
    },
    signup: {
      url: "/signup",
    },
    forgotPassword: {
      url: "/forgot-password",
    },
    resetPassword: {
      url: "/reset-password",
    },
  },
};

export const navMain = [routes.home, routes.trialCards];

export const navSecondary = [
  { title: "Support", url: "#", icon: LifeBuoy },
  { title: "Feedback", url: "#", icon: Send },
];

export const navUser = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

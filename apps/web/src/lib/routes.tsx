import {
  Car,
  HomeIcon,
  LifeBuoy,
  Send,
  ShipIcon,
  UserCircle,
} from "lucide-react";

export const routes = {
  home: {
    url: "/dashboard",
    title: "Dashboard",
    icon: HomeIcon,
    showInShortcut: true,
  },
  trialCards: {
    url: "/trial-cards",
    title: "Trial Cards",
    icon: ShipIcon,
    showInShortcut: true,
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
    showInShortcut: false,
  },
  auth: {
    login: {
      title: "Login",
      url: "/login",
      icon: Car,
      showInShortcut: false,
    },
    signup: {
      title: "Sign Up",
      url: "/signup",
      icon: Car,
      showInShortcut: false,
    },
    forgotPassword: {
      title: "Forgot Password",
      url: "/forgot-password",
      icon: Car,
      showInShortcut: false,
    },
    resetPassword: {
      title: "Reset Password",
      url: "/reset-password",
      icon: Car,
      showInShortcut: false,
    },
  },
  user: {
    account: {
      title: "Account",
      url: "/account",
      icon: UserCircle,
      showInShortcut: true,
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

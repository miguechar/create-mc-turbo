"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@mc/ui/components/command";

import { routes } from "~/lib/routes";

type NavItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

type RouteLeaf = {
  title?: string;
  url?: string | ((...args: unknown[]) => string);
  icon?: React.ElementType;
  showInShortcut?: boolean;
  items?: { url: string; title: string }[];
};

function isValidNavRoute(route: unknown): route is RouteLeaf & {
  title: string;
  url: string;
  icon: React.ElementType;
} {
  if (!route || typeof route !== "object") return false;
  const r = route as RouteLeaf;
  return (
    typeof r.title === "string" &&
    typeof r.url === "string" &&
    r.icon != null &&
    r.showInShortcut !== false
  );
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.getPrototypeOf(value) === Object.prototype
  );
}

function collectNavItems(value: unknown, out: NavItem[]): void {
  if (!isPlainObject(value)) return;
  if (isValidNavRoute(value)) {
    out.push({ title: value.title, url: value.url, icon: value.icon });
    if (value.items) {
      for (const sub of value.items) {
        out.push({
          title: `${value.title} / ${sub.title}`,
          url: sub.url,
          icon: value.icon,
        });
      }
    }
    return;
  }
  // Namespace object (e.g. routes.user, routes.auth) — walk its children
  for (const sub of Object.values(value)) {
    collectNavItems(sub, out);
  }
}

function buildNavItems(): NavItem[] {
  const items: NavItem[] = [];
  for (const route of Object.values(routes)) {
    collectNavItems(route, items);
  }
  return items;
}

const navItems = buildNavItems();

type CommandMenuProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export function CommandMenu({
  open: controlledOpen,
  onOpenChange,
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const router = useRouter();

  const open = controlledOpen ?? internalOpen;
  const setOpen = (value: boolean) => {
    setInternalOpen(value);
    onOpenChange?.(value);
  };

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open]);

  const navigate = (url: string) => {
    router.push(url);
    setOpen(false);
  };

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navItems.map((item) => (
            <CommandItem key={item.url} onSelect={() => navigate(item.url)}>
              <item.icon />
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

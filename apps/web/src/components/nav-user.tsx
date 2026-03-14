"use client";

import Link from "next/link";
import {
  BadgeCheck,
  ChevronsUpDown,
  Lock,
  LogOut,
  PlusCircle,
} from "lucide-react";

import { authClient } from "@mc/auth/client";
import { Avatar, AvatarFallback, AvatarImage } from "@mc/ui/components/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@mc/ui/components/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@mc/ui/components/sidebar";

import { getUserInitials } from "~/lib/getUserInitials";
import { routes } from "~/lib/routes";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();

  const { data: session } = authClient.useSession();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  {getUserInitials(session?.user.name ?? "Not Found")}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {session?.user.name ?? "Not Logged In"}
                </span>
                <span className="truncate text-xs">
                  {session?.user.email ?? "No User Found"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {getUserInitials(session?.user.name ?? "")}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {session?.user.name ?? "Not Logged In"}
                  </span>
                  <span className="truncate text-xs">
                    {session?.user.email ?? "No User Found"}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {session ? (
                <Link href={routes.user.account.url}>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                </Link>
              ) : (
                <Link href={routes.auth.signup.url}>
                  <DropdownMenuItem>
                    <PlusCircle />
                    Create Account
                  </DropdownMenuItem>
                </Link>
              )}

              {session?.user.role === "admin" && (
                <div>
                  <DropdownMenuSeparator />
                  <Link href={"/admin"}>
                    <DropdownMenuItem>
                      <Lock />
                      Admin
                    </DropdownMenuItem>
                  </Link>
                </div>
              )}

              {session && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut />
                    Log out
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

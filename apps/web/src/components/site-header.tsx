"use client";

import * as React from "react";
import { Search, SidebarIcon } from "lucide-react";

import { Button } from "@mc/ui/components/button";
import { Separator } from "@mc/ui/components/separator";
import { useSidebar } from "@mc/ui/components/sidebar";
import { ModeToggle } from "@mc/ui/components/theme-toggle";

import { CommandMenu } from "~/components/CommandDialog";
import Logo from "./logo";

export function SiteHeader() {
  const { toggleSidebar } = useSidebar();
  const [commandOpen, setCommandOpen] = React.useState(false);

  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b">
      <div className="flex h-(--header-height) w-full items-center gap-2 px-4">
        <Button
          className="h-8 w-8"
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
        >
          <SidebarIcon />
        </Button>
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Logo />
        <button
          onClick={() => setCommandOpen(true)}
          className="bg-muted/50 text-muted-foreground hover:bg-muted relative flex h-8 w-full items-center gap-2 rounded-md border px-3 text-sm transition-colors sm:ml-auto sm:w-48"
        >
          <Search className="size-3.5 shrink-0 opacity-50" />
          <span>Search...</span>
          <kbd className="bg-background ml-auto hidden rounded border px-1.5 text-xs sm:inline-flex">
            ⌃J
          </kbd>
        </button>
        <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
        <ModeToggle />
      </div>
    </header>
  );
}

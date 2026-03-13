"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@mc/ui/components/command"
import {
  BellIcon,
  CalculatorIcon,
  CalendarIcon,
  CodeIcon,
  CreditCardIcon,
  HelpCircleIcon,
  ImageIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react"
import { routes } from "~/lib/routes"

type NavItem = {
  title: string
  url: string
  icon: React.ElementType
}

function buildNavItems(): NavItem[] {
  const items: NavItem[] = []
  for (const route of Object.values(routes)) {
    if (typeof route.url === "function") continue
    items.push({ title: route.title, url: route.url, icon: route.icon })
    if ("items" in route && route.items) {
      for (const sub of route.items) {
        items.push({ title: `${route.title} / ${sub.title}`, url: sub.url, icon: route.icon })
      }
    }
  }
  return items
}

const navItems = buildNavItems()

type CommandMenuProps = {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function CommandMenu({ open: controlledOpen, onOpenChange }: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const router = useRouter()

  const open = controlledOpen ?? internalOpen
  const setOpen = (value: boolean) => {
    setInternalOpen(value)
    onOpenChange?.(value)
  }

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open])

  const navigate = (url: string) => {
    router.push(url)
    setOpen(false)
  }

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
        <CommandSeparator />
        <CommandGroup heading="Account">
          <CommandItem>
            <UserIcon />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCardIcon />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <SettingsIcon />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <BellIcon />
            <span>Notifications</span>
          </CommandItem>
          <CommandItem>
            <HelpCircleIcon />
            <span>Help & Support</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Tools">
          <CommandItem>
            <CalculatorIcon />
            <span>Calculator</span>
          </CommandItem>
          <CommandItem>
            <CalendarIcon />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <ImageIcon />
            <span>Image Editor</span>
          </CommandItem>
          <CommandItem>
            <CodeIcon />
            <span>Code Editor</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

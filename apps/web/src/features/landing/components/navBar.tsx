import React from "react";
import Link from "next/link";

import { Button } from "@mc/ui/components/button";

import Logo from "~/components/logo";
import { routes } from "~/lib/routes";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-10 border-b p-3">
      <div className="container mx-auto flex items-center justify-between gap-3">
        <Logo />
        <div className="flex items-center gap-3">
          <Link href={routes.auth.login.url}>
            <Button size={"sm"} className="rounded-full">
              Login
            </Button>
          </Link>
          <Link href={routes.auth.signup.url}>
            <Button size={"sm"} className="rounded-full" variant={"outline"}>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

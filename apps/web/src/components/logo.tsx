"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap } from "lucide-react";

import { routes } from "~/lib/routes";

const Logo = () => {
  const pathname = usePathname();

  return (
    <Link
      href={pathname === "/" ? "/" : routes.home.url}
      className="flex items-center gap-3"
    >
      <Zap className="text-primary" />
      <h1 className="font-semibold">{"Create - MC - Turbo"}</h1>
    </Link>
  );
};

export default Logo;

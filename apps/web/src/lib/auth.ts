import "server-only";

import { cache } from "react";
import { headers } from "next/headers";

import { initAuth } from "@mc/auth";
import { nextCookies } from "@mc/auth/next-js";

import { env } from "~/env";

export const auth = initAuth({
  baseUrl: process.env.NEXT_PUBLIC_URL ?? `http://localhost:3000`,
  productionUrl: `https://${env.VERCEL_PROJECT_PRODUCTION_URL ?? "turbo.t3.gg"}`,
  secret: env.AUTH_SECRET,
  extraPlugins: [nextCookies()],
});

export const getSession = cache(async () =>
  auth.api.getSession({ headers: await headers() }),
);

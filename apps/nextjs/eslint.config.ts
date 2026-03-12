import { defineConfig } from "eslint/config";

import { baseConfig, restrictEnvAccess } from "@mc/eslint-config/base";
import { nextjsConfig } from "@mc/eslint-config/nextjs";
import { reactConfig } from "@mc/eslint-config/react";

export default defineConfig(
  {
    ignores: [".next/**"],
  },
  baseConfig,
  reactConfig,
  nextjsConfig,
  restrictEnvAccess,
);

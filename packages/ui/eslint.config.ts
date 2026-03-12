import { defineConfig } from "eslint/config";

import { baseConfig } from "@mc/eslint-config/base";
import { reactConfig } from "@mc/eslint-config/react";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
  reactConfig,
);

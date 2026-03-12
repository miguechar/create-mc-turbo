import { defineConfig } from "eslint/config";

import { baseConfig } from "@mc/eslint-config/base";

export default defineConfig(
  {
    ignores: ["dist/**"],
  },
  baseConfig,
);

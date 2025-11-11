import { defineConfig } from "eslint/config";
import nextConfig from "eslint-config-next/core-web-vitals.js";

// Handle different export types from eslint-config-next
let configToUse;
if (typeof nextConfig === "function") {
  configToUse = nextConfig();
} else if (Array.isArray(nextConfig)) {
  configToUse = nextConfig;
} else {
  configToUse = [nextConfig];
}

export default defineConfig([
  ...configToUse,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
]);

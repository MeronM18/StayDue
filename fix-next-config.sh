#!/bin/bash
# Script to fix next.config.mjs for monorepo setup

NEXT_CONFIG="apps/web/next.config.mjs"

if [ ! -f "$NEXT_CONFIG" ]; then
  echo "❌ Next.js app not found at $NEXT_CONFIG"
  echo "Please create the app first: pnpm create next-app@latest apps/web --ts --tailwind --eslint --use-pnpm --app"
  exit 1
fi

echo "✅ Found Next.js config, updating..."

cat > "$NEXT_CONFIG" << 'EOF'
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typedRoutes: true,
  turbopack: {
    root: resolve(__dirname, "../.."),
  },
};

export default nextConfig;
EOF

echo "✅ Updated next.config.mjs with correct turbopack.root"


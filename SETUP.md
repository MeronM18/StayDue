# Setup Instructions

## 1. Create Next.js App (inside staydue folder)

```bash
cd /Users/meron/Documents/Coding_Projects/StayDue/staydue
pnpm create next-app@latest apps/web --ts --tailwind --eslint --use-pnpm --app
# Answer: No to React Compiler, No to src/, Yes to Turbopack
```

## 2. Fix next.config.mjs

After creating the app, update `apps/web/next.config.mjs`:

```javascript
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
```

## 3. Link Workspace Packages

```bash
cd /Users/meron/Documents/Coding_Projects/StayDue/staydue
pnpm add -w "@staydue/ui@workspace:*" "@staydue/lib@workspace:*" --filter "./apps/web"
```

## 4. Update tsconfig.json

Add path mappings in `apps/web/tsconfig.json`:

```json
"paths": {
  "@/*": ["./*"],
  "@staydue/ui": ["../../packages/ui"],
  "@staydue/lib": ["../../packages/lib"]
}
```

## 5. Run the Project

```bash
cd /Users/meron/Documents/Coding_Projects/StayDue/staydue
pnpm dev
# or
pnpm start:project
```


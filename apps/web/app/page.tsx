"use client";

import { useState } from "react";
import { APP_NAME, formatDate } from "@staydue/lib";
import { Button } from "@staydue/ui";

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-16 text-center">
        <div className="space-y-4">
          <h1 className="text-6xl font-bold text-gray-900 dark:text-white">
            Welcome to {APP_NAME}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Your task management solution
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Today is {formatDate(new Date())}
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
          <div className="text-2xl font-semibold text-gray-800 dark:text-white">
            Count: {count}
          </div>
          <div className="flex gap-4">
            <Button
              label="Increment"
              onClick={() => setCount(count + 1)}
            />
            <button
              onClick={() => setCount(0)}
              className="rounded-md bg-gray-500 text-white px-4 py-2 hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>✅ Monorepo workspace packages are working!</p>
          <p className="mt-2">
            Using @staydue/lib and @staydue/ui packages from workspace
          </p>
        </div>
      </main>
    </div>
  );
}

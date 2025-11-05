import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If user is signed in, redirect to dashboard
  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <main className="flex w-full flex-col items-center gap-8 px-6 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mt-16">
          StayDue
        </h1>
        
        <div className="flex-1 flex items-center justify-center">
          <Link
            href="/auth/signin"
            className="rounded-md bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 transition-colors"
          >
            Sign in with Google
          </Link>
        </div>
      </main>
    </div>
  );
}

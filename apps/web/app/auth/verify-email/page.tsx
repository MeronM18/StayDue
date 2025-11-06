import Link from 'next/link'
import { Suspense } from 'react'

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-16">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg border border-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Check Your Email</h1>
          <p className="mt-2 text-gray-600">
            We've sent you a confirmation email. Please click the link in the email to verify your account.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  )
}


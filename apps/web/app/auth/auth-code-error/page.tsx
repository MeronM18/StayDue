import Link from 'next/link'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: {
    error?: string
    description?: string
  }
}

export default function AuthCodeError({ searchParams }: PageProps) {
  const { error, description } = searchParams

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-lg dark:bg-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-400">
            Authentication Error
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {description || 'There was a problem signing you in. Please try again.'}
          </p>
          {error && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
              Error code: {error}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 justify-center">
          <Link
            href="/"
            className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 text-center transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/auth/signin"
            className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 text-center transition-colors dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Try Sign In Again
          </Link>
        </div>
      </div>
    </div>
  )
}


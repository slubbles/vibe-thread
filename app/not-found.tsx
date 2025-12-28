import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4">404</div>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. Maybe it's generating a thread somewhere...
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition font-semibold"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition font-semibold"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

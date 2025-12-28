import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#070708] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl mb-4 text-white">404</div>
        <h1 className="text-3xl font-bold text-white mb-2">
          Page Not Found
        </h1>
        <p className="text-[#6f717b] mb-8 max-w-md">
          Oops! The page you're looking for doesn't exist. Maybe it's generating a thread somewhere...
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-xl border border-[#1d1d20] text-white hover:bg-[#171719] transition font-medium"
          >
            Go Home
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-white text-black hover:bg-[#f0f0f0] transition font-medium"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

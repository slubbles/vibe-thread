"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"

interface User {
  id: string
  name: string | null
  email: string | null
  isPro: boolean
  createdAt: Date
}

export default function SettingsClient({
  user,
  usageCount,
  totalThreads
}: {
  user: User
  usageCount: number
  totalThreads: number
}) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-2xl font-bold text-zinc-900 dark:text-white">
              VibeThread
            </Link>
            <Link href="/dashboard" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Generate
            </Link>
            <Link href="/dashboard/history" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              History
            </Link>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm text-zinc-700 dark:text-zinc-300"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Manage your account and subscription
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Info */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Account Information
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500">Name</div>
                <div className="text-zinc-900 dark:text-white">{user.name || "Not set"}</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500">Email</div>
                <div className="text-zinc-900 dark:text-white">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-zinc-500 dark:text-zinc-500">Member since</div>
                <div className="text-zinc-900 dark:text-white">{formatDate(user.createdAt)}</div>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Subscription
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-semibold text-zinc-900 dark:text-white">
                  {user.isPro ? "Pro Plan" : "Free Plan"}
                </div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">
                  {user.isPro ? "Unlimited thread generations" : "5 threads per month"}
                </div>
              </div>
              {user.isPro ? (
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold">
                  Active
                </span>
              ) : (
                <Link
                  href="/upgrade"
                  className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm"
                >
                  Upgrade to Pro
                </Link>
              )}
            </div>
            {!user.isPro && (
              <div className="text-sm text-zinc-500 dark:text-zinc-500">
                {usageCount} / 5 threads used this month
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">
              Usage Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">{totalThreads}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Total threads generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-zinc-900 dark:text-white">{usageCount}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">This month</div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-red-200 dark:border-red-900 p-6">
            <h2 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-4">
              Danger Zone
            </h2>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                  signOut({ callbackUrl: "/" })
                }
              }}
              className="px-4 py-2 rounded-lg border border-red-300 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition text-sm font-semibold"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

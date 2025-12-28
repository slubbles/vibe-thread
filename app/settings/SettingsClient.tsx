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
    <div className="min-h-screen bg-[#070708]">
      {/* Navigation */}
      <nav className="border-b border-[#1d1d20]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-2xl font-bold text-white">
              VibeThread
            </Link>
            <Link href="/dashboard" className="text-sm text-[#6f717b] hover:text-white transition">
              Generate
            </Link>
            <Link href="/dashboard/history" className="text-sm text-[#6f717b] hover:text-white transition">
              History
            </Link>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-xl border border-[#1d1d20] hover:bg-[#171719] transition text-sm text-white"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Settings
          </h1>
          <p className="text-[#6f717b]">
            Manage your account and subscription
          </p>
        </div>

        <div className="space-y-6">
          {/* Account Info */}
          <div className="bg-[#171719] rounded-xl border border-[#1d1d20] p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Account Information
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm text-[#6f717b]">Name</div>
                <div className="text-white">{user.name || "Not set"}</div>
              </div>
              <div>
                <div className="text-sm text-[#6f717b]">Email</div>
                <div className="text-white">{user.email}</div>
              </div>
              <div>
                <div className="text-sm text-[#6f717b]">Member since</div>
                <div className="text-white">{formatDate(user.createdAt)}</div>
              </div>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-[#171719] rounded-xl border border-[#1d1d20] p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Subscription
            </h2>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-medium text-white">
                  {user.isPro ? "Pro Plan" : "Free Plan"}
                </div>
                <div className="text-sm text-[#6f717b]">
                  {user.isPro ? "Unlimited thread generations" : "5 threads per month"}
                </div>
              </div>
              {user.isPro ? (
                <span className="px-3 py-1 rounded-xl bg-[#5de4c7] text-black text-sm font-medium">
                  Active
                </span>
              ) : (
                <Link
                  href="/upgrade"
                  className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:bg-[#f0f0f0] transition text-sm"
                >
                  Upgrade to Pro
                </Link>
              )}
            </div>
            {!user.isPro && (
              <div className="text-sm text-[#6f717b]">
                {usageCount} / 5 threads used this month
              </div>
            )}
          </div>

          {/* Usage Stats */}
          <div className="bg-[#171719] rounded-xl border border-[#1d1d20] p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Usage Statistics
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-white">{totalThreads}</div>
                <div className="text-sm text-[#6f717b]">Total threads generated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{usageCount}</div>
                <div className="text-sm text-[#6f717b]">This month</div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#171719] rounded-xl border border-[#1d1d20] p-6">
            <h2 className="text-lg font-medium text-white mb-4">
              Danger Zone
            </h2>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                  signOut({ callbackUrl: "/" })
                }
              }}
              className="px-4 py-2 rounded-xl border border-[#1d1d20] text-white hover:bg-[#202022] transition text-sm font-medium"
            >
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

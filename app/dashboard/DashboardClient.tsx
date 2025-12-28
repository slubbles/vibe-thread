"use client"

import { useState } from "react"
import { signOut } from "next-auth/react"

interface Thread {
  tweets: string[]
}

export default function DashboardClient({ 
  user, 
  usageCount, 
  isPro 
}: { 
  user: any
  usageCount: number
  isPro: boolean
}) {
  const [input, setInput] = useState("")
  const [thread, setThread] = useState<Thread | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const remainingGenerations = isPro ? "Unlimited" : Math.max(0, 5 - usageCount)

  const generateThread = async () => {
    if (!input.trim()) {
      setError("Please enter some notes first")
      return
    }

    if (!isPro && usageCount >= 5) {
      setError("You've reached your free tier limit. Upgrade to Pro for unlimited threads!")
      return
    }

    setLoading(true)
    setError("")
    setThread(null)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate thread")
      }

      setThread(data.thread)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (!thread) return
    
    const text = thread.tweets.join("\n\n")
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold text-zinc-900 dark:text-white">
              VibeThread
            </div>
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              Generate
            </span>
            <a href="/dashboard/history" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              History
            </a>
            <a href="/settings" className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition">
              Settings
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-zinc-600 dark:text-zinc-400">
              {isPro ? (
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-semibold">
                  Pro
                </span>
              ) : (
                <span>
                  {remainingGenerations} / 5 free threads left
                </span>
              )}
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm text-zinc-700 dark:text-zinc-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Welcome back, {user.name || "there"} 👋
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Paste your daily notes below and turn them into an authentic X thread.
          </p>
        </div>

        {!isPro && usageCount >= 4 && (
          <div className="mb-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              ⚠️ You have {5 - usageCount} generation{5 - usageCount === 1 ? '' : 's'} left. 
              <a href="/upgrade" className="font-semibold underline ml-1">Upgrade to Pro</a> for unlimited threads at $9/mo.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                Your Notes
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="fixed bug today, still no users, kinda tired&#10;spent 5hrs on auth&#10;idk if anyone will use this"
                className="w-full h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            <button
              onClick={generateThread}
              disabled={loading || (!isPro && usageCount >= 5)}
              className="w-full px-6 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 disabled:bg-zinc-300 dark:disabled:bg-zinc-700 disabled:cursor-not-allowed transition text-lg"
            >
              {loading ? "Generating..." : "Generate Thread ✨"}
            </button>

            {error && (
              <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                Your Thread
              </label>
              {thread && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition text-zinc-700 dark:text-zinc-300"
                >
                  {copied ? "Copied! ✓" : "Copy All"}
                </button>
              )}
            </div>

            <div className="h-64 px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 overflow-y-auto">
              {!thread && !loading && (
                <p className="text-zinc-400 dark:text-zinc-600 italic">
                  Your thread will appear here...
                </p>
              )}

              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}

              {thread && (
                <div className="space-y-4">
                  {thread.tweets.map((tweet, i) => (
                    <div key={i} className="text-zinc-800 dark:text-zinc-200">
                      {tweet}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {thread && (
              <p className="text-xs text-zinc-500 dark:text-zinc-500">
                💡 Copy and paste each tweet to X (Twitter) to post your thread!
              </p>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-3">
            💡 Tips for better threads:
          </h3>
          <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li>• Write like you're texting a friend — casual, short, real</li>
            <li>• Include specific details (time spent, what you built, how you feel)</li>
            <li>• Don't worry about perfect grammar — raw vibes work best</li>
            <li>• Mention struggles, not just wins — people relate to honesty</li>
          </ul>
        </div>
      </main>
    </div>
  )
}

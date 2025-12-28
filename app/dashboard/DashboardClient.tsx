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
    <div className="min-h-screen bg-[#070708]">
      {/* Navigation */}
      <nav className="border-b border-[#1d1d20]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="text-2xl font-bold text-white">
              VibeThread
            </div>
            <span className="text-sm font-medium text-[#5de4c7]">
              Generate
            </span>
            <a href="/dashboard/history" className="text-sm text-[#6f717b] hover:text-white transition">
              History
            </a>
            <a href="/settings" className="text-sm text-[#6f717b] hover:text-white transition">
              Settings
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-[#6f717b]">
              {isPro ? (
                <span className="px-3 py-1 rounded-xl bg-[#5de4c7] text-black font-medium">
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
              className="px-4 py-2 rounded-xl border border-[#1d1d20] hover:bg-[#171719] transition text-sm text-white"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user.name || "there"} 👋
          </h1>
          <p className="text-[#6f717b]">
            Paste your daily notes below and turn them into an authentic X thread.
          </p>
        </div>

        {!isPro && usageCount >= 4 && (
          <div className="mb-6 p-4 rounded-xl bg-[#171719] border border-[#1d1d20]">
            <p className="text-sm text-white">
              ⚠️ You have {5 - usageCount} generation{5 - usageCount === 1 ? '' : 's'} left. 
              <a href="/upgrade" className="font-medium underline ml-1 text-[#5de4c7]">Upgrade to Pro</a> for unlimited threads at $9/mo.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Your Notes
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="fixed bug today, still no users, kinda tired&#10;spent 5hrs on auth&#10;idk if anyone will use this"
                className="w-full h-64 px-4 py-3 rounded-xl border border-[#1d1d20] bg-[#171719] text-white placeholder-[#6f717b] focus:ring-2 focus:ring-[#5de4c7] focus:border-transparent resize-none"
                disabled={loading}
              />
            </div>

            <button
              onClick={generateThread}
              disabled={loading || (!isPro && usageCount >= 5)}
              className="w-full px-6 py-4 rounded-xl bg-white text-black font-medium hover:bg-[#f0f0f0] disabled:bg-[#1d1d20] disabled:text-[#6f717b] disabled:cursor-not-allowed transition text-lg"
            >
              {loading ? "Generating..." : "Generate Thread ✨"}
            </button>

            {error && (
              <div className="p-4 rounded-xl bg-[#171719] border border-[#1d1d20]">
                <p className="text-sm text-white">{error}</p>
              </div>
            )}
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-white">
                Your Thread
              </label>
              {thread && (
                <button
                  onClick={copyToClipboard}
                  className="text-sm px-3 py-1 rounded-xl bg-[#171719] hover:bg-[#202022] transition text-white"
                >
                  {copied ? "Copied! ✓" : "Copy All"}
                </button>
              )}
            </div>

            <div className="h-64 px-4 py-3 rounded-xl border border-[#1d1d20] bg-[#171719] overflow-y-auto">
              {!thread && !loading && (
                <p className="text-[#6f717b] italic">
                  Your thread will appear here...
                </p>
              )}

              {loading && (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5de4c7]"></div>
                </div>
              )}

              {thread && (
                <div className="space-y-4">
                  {thread.tweets.map((tweet, i) => (
                    <div key={i} className="text-white">
                      {tweet}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {thread && (
              <p className="text-xs text-[#6f717b]">
                💡 Copy and paste each tweet to X (Twitter) to post your thread!
              </p>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 p-6 rounded-xl bg-[#171719] border border-[#1d1d20]">
          <h3 className="font-medium text-white mb-3">
            💡 Tips for better threads:
          </h3>
          <ul className="space-y-2 text-sm text-[#6f717b]">
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"

interface Thread {
  id: string
  input: string
  output: string
  createdAt: Date
}

export default function HistoryClient({ threads }: { threads: Thread[] }) {
  const [copied, setCopied] = useState<string | null>(null)
  const [search, setSearch] = useState("")

  const filteredThreads = threads.filter(thread => 
    thread.input.toLowerCase().includes(search.toLowerCase()) ||
    thread.output.toLowerCase().includes(search.toLowerCase())
  )

  const copyThread = (threadId: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(threadId)
    setTimeout(() => setCopied(null), 2000)
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
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
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              History
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition text-sm text-zinc-700 dark:text-zinc-300"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Thread History
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            View and copy your previously generated threads
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search threads..."
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Thread List */}
        {filteredThreads.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
              {search ? "No threads found" : "No threads yet"}
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              {search ? "Try a different search term" : "Generate your first thread to see it here"}
            </p>
            {!search && (
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                Generate Thread
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredThreads.map((thread) => (
              <div
                key={thread.id}
                className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:border-zinc-300 dark:hover:border-zinc-700 transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="text-xs text-zinc-500 dark:text-zinc-500 mb-2">
                      {formatDate(thread.createdAt)}
                    </div>
                    <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2">
                      {thread.input}
                    </div>
                  </div>
                  <button
                    onClick={() => copyThread(thread.id, thread.output)}
                    className="ml-4 px-3 py-1 text-sm rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition text-zinc-700 dark:text-zinc-300"
                  >
                    {copied === thread.id ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
                <div className="text-sm text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4">
                  {thread.output}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

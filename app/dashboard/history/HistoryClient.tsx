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
            <span className="text-sm font-medium text-[#5de4c7]">
              History
            </span>
          </div>
          <button
            onClick={() => signOut()}
            className="px-4 py-2 rounded-xl border border-[#1d1d20] hover:bg-[#171719] transition text-sm text-white"
          >
            Sign Out
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Thread History
          </h1>
          <p className="text-[#6f717b]">
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
            className="w-full px-4 py-3 rounded-xl border border-[#1d1d20] bg-[#171719] text-white placeholder-[#6f717b] focus:ring-2 focus:ring-[#5de4c7] focus:border-transparent"
          />
        </div>

        {/* Thread List */}
        {filteredThreads.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-medium text-white mb-2">
              {search ? "No threads found" : "No threads yet"}
            </h3>
            <p className="text-[#6f717b] mb-6">
              {search ? "Try a different search term" : "Generate your first thread to see it here"}
            </p>
            {!search && (
              <Link
                href="/dashboard"
                className="inline-block px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-[#f0f0f0] transition"
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
                className="bg-[#171719] rounded-xl border border-[#1d1d20] p-6 hover:border-[#2a2a2d] transition"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="text-xs text-[#6f717b] mb-2">
                      {formatDate(thread.createdAt)}
                    </div>
                    <div className="text-sm text-[#6f717b] mb-3 line-clamp-2">
                      {thread.input}
                    </div>
                  </div>
                  <button
                    onClick={() => copyThread(thread.id, thread.output)}
                    className="ml-4 px-3 py-1 text-sm rounded-xl bg-[#202022] hover:bg-[#2a2a2d] transition text-white"
                  >
                    {copied === thread.id ? "Copied! ✓" : "Copy"}
                  </button>
                </div>
                <div className="text-sm text-white whitespace-pre-wrap bg-[#0f0f10] rounded-xl p-4">
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

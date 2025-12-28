import Link from "next/link"
// import { auth } from "@/lib/auth"

export default async function Home() {
  // const session = await auth()
  const session = null // Temporarily disabled until auth is fixed

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-black">
      {/* Navigation */}
      <nav className="border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">
            VibeThread
          </div>
          <div>
            {session ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 rounded-lg bg-zinc-900 text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6">
            Turn messy notes into <span className="text-blue-600">authentic</span> X threads
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            Stop spending 30 minutes writing threads. Paste your daily dev notes, 
            get a natural-sounding thread in seconds. Built for indie devs doing #BuildInPublic.
          </p>
          
          {session ? (
            <Link
              href="/dashboard"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Open App →
            </Link>
          ) : (
            <Link
              href="/signin"
              className="inline-block px-8 py-4 text-lg font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Get Started Free →
            </Link>
          )}
          
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-500">
            5 threads/month free • No credit card required
          </p>
        </div>

        {/* Demo/Preview Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
              YOUR NOTES
            </h3>
            <div className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">
              fixed bug today, still no users, kinda tired<br/>
              spent 5hrs on auth<br/>
              idk if anyone will use this
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
            <h3 className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-3">
              YOUR THREAD
            </h3>
            <div className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed space-y-2">
              <p>1/ spent 5 hrs fixing auth today ngl kinda burned out</p>
              <p>2/ still zero users but ig thats how it goes at the start</p>
              <p>3/ anyone else feel like this when building? 😅</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            Why VibeThread?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
                10 Second Threads
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Paste notes, get thread. No prompts, no editing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🎭</div>
              <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
                Sounds Like You
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Casual, messy, real. Not corporate AI vibes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-3">🔥</div>
              <h3 className="font-semibold text-lg mb-2 text-zinc-900 dark:text-white">
                Built for Builders
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Made by indie devs for #BuildInPublic threads.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-12">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">Free</h3>
              <div className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">$0<span className="text-lg font-normal text-zinc-500">/mo</span></div>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm">
                <li>✓ 5 threads per month</li>
                <li>✓ All features</li>
                <li>✓ No credit card</li>
              </ul>
            </div>

            <div className="bg-blue-600 text-white rounded-lg p-8 relative">
              <div className="absolute -top-3 right-4 bg-yellow-400 text-zinc-900 text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-xl font-bold mb-2">Pro</h3>
              <div className="text-3xl font-bold mb-4">$9<span className="text-lg font-normal opacity-80">/mo</span></div>
              <ul className="space-y-2 text-sm opacity-90">
                <li>✓ Unlimited threads</li>
                <li>✓ All features</li>
                <li>✓ Support indie dev</li>
              </ul>
              <Link
                href="/upgrade"
                className="mt-6 block text-center px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold hover:bg-zinc-100 transition"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-20">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-zinc-500 dark:text-zinc-500">
          <p>Built by an indie dev for indie devs. <a href="https://x.com" className="underline">Follow the journey</a></p>
        </div>
      </footer>
    </div>
  )
}


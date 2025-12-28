import Link from "next/link"
// import { auth } from "@/lib/auth"

export default async function Home() {
  // const session = await auth()
  const session = null // Temporarily disabled until auth is fixed

  return (
    <div className="min-h-screen bg-[#070708]">
      {/* Navigation */}
      <nav className="border-b border-[#1d1d20]">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-medium text-white">
            VibeThread
          </div>
          <div>
            {session ? (
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-[#d7d7db] transition-all text-sm font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/signin"
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-[#d7d7db] transition-all text-sm font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-tight">
            Turn messy notes into <span className="text-[#5de4c7]">authentic</span> X threads
          </h1>
          <p className="text-lg text-[#6f717b] mb-8 leading-relaxed">
            Stop spending 30 minutes writing threads. Paste your daily dev notes, 
            get a natural-sounding thread in seconds. Built for indie devs doing #BuildInPublic.
          </p>
          
          {session ? (
            <Link
              href="/dashboard"
              className="inline-block px-6 py-3 text-sm font-medium rounded-xl bg-white text-black hover:bg-[#d7d7db] transition-all"
            >
              Open App →
            </Link>
          ) : (
            <Link
              href="/signin"
              className="inline-block px-6 py-3 text-sm font-medium rounded-xl bg-white text-black hover:bg-[#d7d7db] transition-all"
            >
              Get Started Free →
            </Link>
          )}
          
          <p className="mt-4 text-sm text-[#6f717b]">
            5 threads/month free • No credit card required
          </p>
        </div>

        {/* Demo/Preview Section */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div className="bg-[#171719] rounded-2xl border border-[#1d1d20] p-6">
            <h3 className="text-xs font-medium text-[#6f717b] mb-4 uppercase tracking-wider">
              YOUR NOTES
            </h3>
            <div className="text-[#d7d7db] text-sm leading-relaxed">
              fixed bug today, still no users, kinda tired<br/>
              spent 5hrs on auth<br/>
              idk if anyone will use this
            </div>
          </div>

          <div className="bg-[#171719] rounded-2xl border border-[#1d1d20] p-6">
            <h3 className="text-xs font-medium text-[#6f717b] mb-4 uppercase tracking-wider">
              YOUR THREAD
            </h3>
            <div className="text-[#d7d7db] text-sm leading-relaxed space-y-3">
              <p>1/ spent 5 hrs fixing auth today ngl kinda burned out</p>
              <p>2/ still zero users but ig thats how it goes at the start</p>
              <p>3/ anyone else feel like this when building? 😅</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 max-w-4xl mx-auto">
          <h2 className="text-3xl font-medium text-center text-white mb-16">
            Why VibeThread?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-medium text-base mb-2 text-white">
                10 Second Threads
              </h3>
              <p className="text-[#6f717b] text-sm leading-relaxed">
                Paste notes, get thread. No prompts, no editing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="font-medium text-base mb-2 text-white">
                Sounds Like You
              </h3>
              <p className="text-[#6f717b] text-sm leading-relaxed">
                Casual, messy, real. Not corporate AI vibes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="font-medium text-base mb-2 text-white">
                Built for Builders
              </h3>
              <p className="text-[#6f717b] text-sm leading-relaxed">
                Made by indie devs for #BuildInPublic threads.
              </p>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mt-32 max-w-2xl mx-auto">
          <h2 className="text-3xl font-medium text-center text-white mb-16">
            Simple Pricing
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#171719] rounded-2xl border border-[#1d1d20] p-8">
              <h3 className="text-lg font-medium mb-2 text-white">Free</h3>
              <div className="text-3xl font-medium mb-4 text-white">$0<span className="text-base font-normal text-[#6f717b]">/mo</span></div>
              <ul className="space-y-2 text-[#d7d7db] text-sm">
                <li>✓ 5 threads per month</li>
                <li>✓ All features</li>
                <li>✓ No credit card</li>
              </ul>
            </div>

            <div className="bg-white text-black rounded-2xl p-8 relative">
              <div className="absolute -top-3 right-4 bg-[#5de4c7] text-black text-xs font-medium px-3 py-1 rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg font-medium mb-2">Pro</h3>
              <div className="text-3xl font-medium mb-4">$9<span className="text-base font-normal opacity-60">/mo</span></div>
              <ul className="space-y-2 text-sm opacity-80">
                <li>✓ Unlimited threads</li>
                <li>✓ All features</li>
                <li>✓ Support indie dev</li>
              </ul>
              <Link
                href="/upgrade"
                className="mt-6 block text-center px-5 py-2.5 rounded-xl bg-black text-white text-sm font-medium hover:bg-[#171719] transition-all"
              >
                Get Pro
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1d1d20] mt-32">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-[#6f717b]">
          <p>Built by an indie dev for indie devs. <a href="https://x.com" className="underline hover:text-white transition-colors">Follow the journey</a></p>
        </div>
      </footer>
    </div>
  )
}
import Link from "next/link"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0F131A]">
      {/* Navigation */}
      <nav className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-semibold text-white">
            VibeThread
          </Link>
          <div className="flex gap-4 items-center">
            <Link
              href="/signin"
              className="px-6 py-2.5 text-[#CED1D7] hover:text-white transition-colors text-sm font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signin"
              className="px-6 py-2.5 rounded-[999px] bg-[#7A12D4] text-white hover:bg-[#6A0FC4] transition-all text-sm font-semibold"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-[#CED1D7] max-w-2xl mx-auto">
          Start free and upgrade when you're ready to unlock unlimited threads
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Free Plan */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[25px] p-8">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
              <p className="text-[#CED1D7]">Perfect for trying out VibeThread</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-[#CED1D7]">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#CED1D7]">3 threads per month</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#CED1D7]">Basic thread generation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-[#CED1D7]">Thread history</span>
              </li>
            </ul>

            <Link
              href="/signin"
              className="block w-full py-3 px-6 rounded-[999px] border-2 border-white/20 text-white hover:bg-white/5 transition-all text-center font-semibold"
            >
              Get Started Free
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-gradient-to-br from-[#7A12D4] to-[#6A0FC4] rounded-[25px] p-8 relative overflow-hidden shadow-2xl transform hover:scale-105 transition-transform">
            {/* Popular badge */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full text-white text-xs font-semibold">
              POPULAR
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
              <p className="text-white/90">For serious content creators</p>
            </div>

            <div className="mb-8">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-white">$9</span>
                <span className="text-white/80">/month</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white font-medium">Unlimited threads</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white font-medium">Advanced AI generation</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white font-medium">Priority support</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-white flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-white font-medium">Full thread history & analytics</span>
              </li>
            </ul>

            <Link
              href="/signin"
              className="block w-full py-3 px-6 rounded-[999px] bg-white text-[#7A12D4] hover:bg-[#F9F9F9] transition-all text-center font-semibold"
            >
              Start Pro Trial
            </Link>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="mt-24 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[16px] p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-[#CED1D7]">
                Yes! You can cancel your Pro subscription anytime from your settings. No questions asked.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[16px] p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-[#CED1D7]">
                We accept all major credit cards through our secure payment processor, Polar.sh.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[16px] p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-[#CED1D7]">
                We offer a 7-day money-back guarantee. If you're not satisfied, we'll refund your first payment.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[16px] p-6">
              <h3 className="text-lg font-semibold text-white mb-2">
                How does the free plan work?
              </h3>
              <p className="text-[#CED1D7]">
                The free plan gives you 3 thread generations per month. Perfect for trying out VibeThread before committing to Pro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export default async function SuccessPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  // Check if user is actually Pro
  let user
  try {
    user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })
  } catch (error) {
    console.error('Database error:', error)
    user = null
  }

  return (
    <div className="min-h-screen bg-[#0F131A] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        
        {/* Success Card */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[25px] p-8 md:p-12 text-center">
          
          {/* Checkmark Icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#7A12D4] flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Welcome Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to Pro! 🎉
          </h1>
          <p className="text-xl text-[#CED1D7] mb-8">
            Your payment was successful. You now have unlimited access to all premium features.
          </p>

          {/* Pro Badge */}
          {user?.isPro && (
            <div className="inline-block px-4 py-2 bg-[#7A12D4]/20 border border-[#7A12D4] rounded-[999px] text-[#7A12D4] text-sm font-semibold mb-8">
              ✨ PRO MEMBER
            </div>
          )}

          {/* Features List */}
          <div className="bg-white/5 rounded-[16px] p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-white mb-4">What you can do now:</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-[#CED1D7]">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-white">Unlimited threads</strong> - Generate as many viral threads as you want</span>
              </li>
              <li className="flex items-start gap-3 text-[#CED1D7]">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-white">Priority AI generation</strong> - Faster processing for your threads</span>
              </li>
              <li className="flex items-start gap-3 text-[#CED1D7]">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-white">Full history access</strong> - View and manage all your past threads</span>
              </li>
              <li className="flex items-start gap-3 text-[#CED1D7]">
                <svg className="w-6 h-6 text-[#7A12D4] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong className="text-white">Priority support</strong> - Get help when you need it</span>
              </li>
            </ul>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-3 rounded-[999px] bg-[#7A12D4] text-white hover:bg-[#6A0FC4] transition-all text-base font-semibold"
            >
              Go to Dashboard
            </Link>
            <Link
              href="/dashboard/history"
              className="px-8 py-3 rounded-[999px] border border-white/20 text-white hover:bg-white/5 transition-all text-base font-semibold"
            >
              View History
            </Link>
          </div>

          {/* Help Link */}
          <p className="mt-8 text-sm text-[#CED1D7]">
            Need help getting started?{' '}
            <Link href="/settings" className="text-[#7A12D4] hover:underline">
              Visit Settings
            </Link>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-[#CED1D7] mt-6">
          Thank you for supporting VibeThread! 💜
        </p>
      </div>
    </div>
  )
}

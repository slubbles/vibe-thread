import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import DashboardClient from "./DashboardClient"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  // Temporarily disable auth
  const session = { user: { id: 'temp-user', email: 'demo@example.com' } }

  // if (!session?.user) {
  //   redirect("/api/auth/signin")
  // }

  // Get or create user usage limit
  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  let usageLimit = await prisma.usageLimit.findUnique({
    where: { userId: session.user.id },
  })

  if (!usageLimit || usageLimit.resetAt < now) {
    // Create or reset usage limit
    usageLimit = await prisma.usageLimit.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        count: 0,
        resetAt: firstOfNextMonth,
      },
      update: {
        count: 0,
        resetAt: firstOfNextMonth,
      },
    })
  }

  // Get user to check if Pro
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  return (
    <DashboardClient 
      user={session.user} 
      usageCount={usageLimit.count}
      isPro={user?.isPro || false}
    />
  )
}

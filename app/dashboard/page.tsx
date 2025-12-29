import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import DashboardClient from "./DashboardClient"

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  // Get or create user usage limit
  const now = new Date()
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

  let usageLimit
  try {
    usageLimit = await prisma.usageLimit.findUnique({
      where: { userId: session.user.id },
    })
  } catch (error) {
    // Database not ready yet - show UI anyway
    console.error('Database error:', error)
    usageLimit = null
  }

  if (!usageLimit || usageLimit.resetAt < now) {
    // Create or reset usage limit
    try {
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
    } catch (error) {
      console.error('Database error:', error)
      // Default values
      usageLimit = {
        userId: session.user.id,
        count: 0,
        resetAt: firstOfNextMonth,
      }
    }
  }

  // Get user to check if Pro
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
    <DashboardClient 
      user={session.user} 
      usageCount={usageLimit.count}
      isPro={user?.isPro || false}
    />
  )
}

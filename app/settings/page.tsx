import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import SettingsClient from "./SettingsClient"

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
  // Temporarily disable auth
  const session = { user: { id: 'temp-user', email: 'demo@example.com' } }

  // if (!session?.user) {
  //   redirect("/api/auth/signin")
  // }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  })

  const usageLimit = await prisma.usageLimit.findUnique({
    where: { userId: session.user.id },
  })

  const threadCount = await prisma.thread.count({
    where: { userId: session.user.id },
  })

  return (
    <SettingsClient 
      user={user!}
      usageCount={usageLimit?.count || 0}
      totalThreads={threadCount}
    />
  )
}

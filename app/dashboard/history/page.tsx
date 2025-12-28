import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import HistoryClient from "./HistoryClient"

export default async function HistoryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  // Get user's thread history
  const threads = await prisma.thread.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 50, // Show last 50 threads
  })

  return <HistoryClient threads={threads} />
}

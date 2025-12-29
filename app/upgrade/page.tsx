import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function UpgradePage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  // Polar.sh checkout link
  const polarCheckoutUrl = process.env.POLAR_CHECKOUT_URL || "https://polar.sh"

  // Redirect to Polar checkout
  redirect(polarCheckoutUrl)
}

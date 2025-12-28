import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export const dynamic = 'force-dynamic'

export default async function UpgradePage() {
  // Temporarily disable auth
  const session = { user: { id: 'temp-user', email: 'demo@example.com' } }

  // if (!session?.user) {
  //   redirect("/api/auth/signin")
  // }

  // Polar.sh checkout link
  const polarCheckoutUrl = process.env.POLAR_CHECKOUT_URL || "https://polar.sh"

  // Redirect to Polar checkout
  redirect(polarCheckoutUrl)
}

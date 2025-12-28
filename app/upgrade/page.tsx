import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

export default async function UpgradePage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/api/auth/signin")
  }

  // Polar.sh checkout link - you'll need to replace this with your actual Polar product link
  const polarCheckoutUrl = process.env.POLAR_CHECKOUT_URL || "https://polar.sh/your-product"

  // Redirect to Polar checkout
  redirect(polarCheckoutUrl)
}

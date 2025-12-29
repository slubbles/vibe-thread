import { redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import SignInClient from './SignInClient'

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  // If already signed in, redirect to dashboard
  if (session?.user) {
    redirect("/dashboard")
  }

  return <SignInClient />
}

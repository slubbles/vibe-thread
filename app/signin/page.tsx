import { redirect } from "next/navigation"
// import { auth } from '@/lib/auth'
import SignInClient from './SignInClient'

export default async function SignInPage() {
  // const session = await auth()
  const session = null // Auth temporarily disabled

  // If already signed in, redirect to dashboard
  // if (session?.user) {
  //   redirect("/dashboard")
  // }

  return <SignInClient />
}

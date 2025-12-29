import type { NextAuthOptions } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-change-in-production',
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID || 'dummy',
      clientSecret: process.env.GITHUB_SECRET || 'dummy',
    }),
    Google({
      clientId: process.env.GOOGLE_ID || 'dummy',
      clientSecret: process.env.GOOGLE_SECRET || 'dummy',
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
}

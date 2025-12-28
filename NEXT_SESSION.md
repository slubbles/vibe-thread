# Next Session: What to Do

**Last Updated:** December 28, 2025  
**Current State:** Code pushed to GitHub, but authentication is broken

---

## 🚨 Current Issues

### 1. **NextAuth Not Working**
**Problem:** `auth` function returns undefined, causing all auth-dependent pages to crash

**Error:**
```
TypeError: {imported module ./lib/auth.ts}.auth is not a function
```

**Temporary Fix Applied:**
- Landing page (`app/page.tsx`) - auth disabled, works ✅
- Sign in page (`app/signin/page.tsx`) - still broken ❌
- Dashboard pages - still broken ❌
- Settings page - still broken ❌

### 2. **Prisma 7 Compatibility Issues**
**Problem:** Prisma 7 changed how database connections work, requires adapters

**What We Tried:**
- ✅ Installed `@prisma/adapter-libsql` and `@libsql/client`
- ✅ Updated `lib/prisma.ts` to use LibSQL adapter
- ❌ PrismaAdapter with NextAuth doesn't work with LibSQL

### 3. **Database Not Connected**
Because auth adapter is disabled, users can't be saved to database

---

## 🎯 Next Session Plan: Fix Everything

### Option 1: Downgrade to Simpler Stack (RECOMMENDED)
**Time: 30 minutes**

1. **Use NextAuth without Prisma Adapter**
   - Keep JWT-only authentication (no database)
   - Users won't persist, but auth will work
   - Good enough for testing and design

2. **Steps:**
   ```bash
   # Fix all pages that use auth()
   # Make them work with JWT sessions
   # Test sign in flow
   ```

3. **Files to fix:**
   - `app/signin/page.tsx` - enable auth
   - `app/dashboard/page.tsx` - enable auth
   - `app/settings/page.tsx` - enable auth
   - `app/dashboard/history/page.tsx` - enable auth

### Option 2: Downgrade Prisma to Version 5 (CLEANER)
**Time: 45 minutes**

Prisma 5 doesn't have these adapter issues.

1. **Uninstall Prisma 7:**
   ```bash
   npm uninstall prisma @prisma/client @prisma/adapter-libsql @libsql/client
   ```

2. **Install Prisma 5:**
   ```bash
   npm install prisma@5.22.0 @prisma/client@5.22.0
   npm install @auth/prisma-adapter
   ```

3. **Update `prisma/schema.prisma`:**
   ```prisma
   generator client {
     provider = "prisma-client-js"
   }

   datasource db {
     provider = "sqlite"
     url      = env("DATABASE_URL")
   }
   ```

4. **Update `lib/prisma.ts`:**
   ```typescript
   import { PrismaClient } from '@prisma/client'

   const globalForPrisma = globalThis as unknown as {
     prisma: PrismaClient | undefined
   }

   export const prisma = globalForPrisma.prisma ?? new PrismaClient({
     log: ['error', 'warn'],
   })

   if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
   ```

5. **Update `lib/auth.ts` - re-enable PrismaAdapter:**
   ```typescript
   import NextAuth from "next-auth"
   import GitHub from "next-auth/providers/github"
   import Google from "next-auth/providers/google"
   import { PrismaAdapter } from "@auth/prisma-adapter"
   import { prisma } from "@/lib/prisma"

   export const { handlers, signIn, signOut, auth } = NextAuth({
     adapter: PrismaAdapter(prisma),
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
       session: async ({ session, user }) => {
         if (session?.user) {
           session.user.id = user.id
         }
         return session
       },
     },
   })
   ```

6. **Regenerate Prisma Client:**
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

7. **Restart dev server:**
   ```bash
   npm run dev
   ```

### Option 3: Start Fresh with Better Stack (NUCLEAR)
**Time: 2 hours**

If nothing works, start new Next.js project with proven stack:
- Next.js 14 (not 16)
- Prisma 5
- NextAuth v4
- PostgreSQL (not SQLite)

---

## 🔧 Quick Fixes to Apply First

### Fix 1: Re-enable Auth on Landing Page
**File:** `app/page.tsx`

Change line 2-5 from:
```typescript
// import { auth } from "@/lib/auth"

export default async function Home() {
  // const session = await auth()
  const session = null // Temporarily disabled until auth is fixed
```

To:
```typescript
import { auth } from "@/lib/auth"

export default async function Home() {
  const session = await auth()
```

### Fix 2: Verify Auth Export
**File:** `lib/auth.ts`

Make sure it looks like this:
```typescript
import NextAuth, { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const config: NextAuthConfig = {
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

export const { handlers, signIn, signOut, auth } = NextAuth(config)
```

---

## 📋 Testing Checklist

After fixing auth, test these:

1. **Landing Page**
   - [ ] Loads without errors
   - [ ] Shows "Sign In" button when not logged in
   - [ ] Shows "Dashboard" button when logged in

2. **Sign In Page**
   - [ ] `/signin` loads
   - [ ] Shows GitHub/Google buttons
   - [ ] Clicking buttons triggers OAuth (will fail without real keys)

3. **Dashboard**
   - [ ] `/dashboard` redirects to signin if not logged in
   - [ ] Shows dashboard UI when logged in
   - [ ] Generate button visible

4. **History**
   - [ ] `/dashboard/history` loads
   - [ ] Shows "No threads yet" when empty

5. **Settings**
   - [ ] `/settings` loads
   - [ ] Shows user info

---

## 🎨 After Auth Works: Apply Design System

Once authentication is working, focus on making it beautiful:

1. **Extract Design System**
   - Visit https://linear.app
   - Open DevTools (F12)
   - Run `design-system-extractor.js` in console
   - Copy the JSON output

2. **Save Extracted JSON**
   ```bash
   mkdir design-systems
   # Save JSON to: design-systems/linear.json
   ```

3. **Update Tailwind Config**
   - Edit `tailwind.config.ts`
   - Add custom colors, fonts, spacing
   - Apply to all pages

4. **Redesign Pages**
   - Landing page with better hero
   - Dashboard with sleek UI
   - History with better cards
   - Settings with polished design

---

## 🚀 Long-term TODOs

### Week 1: Core Functionality
- [ ] Fix authentication completely
- [ ] Set up OAuth apps (GitHub + Google)
- [ ] Get Grok API key from X.ai
- [ ] Test thread generation
- [ ] Apply custom design system

### Week 2: Polish & Features
- [ ] Add thread history search
- [ ] Improve copy-to-clipboard UX
- [ ] Add loading states everywhere
- [ ] Create onboarding flow
- [ ] Add analytics (Plausible/Umami)

### Week 3: Payments & Launch
- [ ] Set up Polar.sh products
- [ ] Test payment flow
- [ ] Add usage tracking UI
- [ ] Write Terms of Service
- [ ] Write Privacy Policy
- [ ] Deploy to Vercel
- [ ] Launch on Twitter/Product Hunt

---

## 📦 Package Versions That Work

If you need to start fresh, use these exact versions:

```json
{
  "dependencies": {
    "next": "14.2.18",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "next-auth": "^4.24.7",
    "prisma": "^5.22.0",
    "@prisma/client": "^5.22.0",
    "@auth/prisma-adapter": "^1.6.0",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## 🆘 If Still Stuck

### Quick Debug Commands

```bash
# Check what's running
lsof -i :3000

# Kill all node processes
pkill -f node

# Clear everything and restart
rm -rf .next node_modules package-lock.json
npm install
npx prisma generate
npm run dev
```

### Check These Files

1. **Is auth exported?**
   ```bash
   grep "export const { handlers, signIn, signOut, auth }" lib/auth.ts
   ```

2. **Is Prisma working?**
   ```bash
   npx prisma studio
   # Should open database viewer
   ```

3. **Are env vars loaded?**
   ```bash
   grep DATABASE_URL .env
   ```

---

## 🎯 Recommended Approach for Next Session

**Do Option 2: Downgrade Prisma to v5**

Why:
- ✅ Proven to work
- ✅ PrismaAdapter supported
- ✅ Database persistence works
- ✅ No weird adapter issues
- ✅ Can focus on building features

Then:
1. Fix auth (30 min)
2. Test all pages (15 min)
3. Apply design system (2 hours)
4. Test Grok API (30 min)
5. Polish UI (2 hours)

**You'll have a working MVP by end of next session!**

---

## 📞 Quick Start Commands for Next Session

```bash
# 1. Open workspace
cd /workspaces/trying-dodo-payments

# 2. Downgrade Prisma
npm uninstall prisma @prisma/client @prisma/adapter-libsql @libsql/client
npm install prisma@5.22.0 @prisma/client@5.22.0 @auth/prisma-adapter

# 3. Fix prisma files (see Option 2 above)

# 4. Generate & migrate
npx prisma generate
npx prisma migrate dev --name fix_prisma_v5

# 5. Start dev server
npm run dev

# 6. Test site
# Open: http://localhost:3000
```

---

**Next session goal:** Working authentication + Beautiful design system applied

**Time estimate:** 3-4 hours total

Good luck! 🚀

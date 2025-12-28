# VibeThread

> Turn messy dev notes into authentic X (Twitter) threads in seconds.

A tiny, focused micro-SaaS tool built for indie developers, creators, and side-hustlers who want to easily share their #BuildInPublic journey on X.

## What It Does

- Paste your raw daily notes (bugs fixed, struggles, feelings)
- Generate a natural-sounding, numbered thread instantly
- Copy and post to X — done in 10 seconds

No more spending 30 minutes crafting threads. No robotic AI vibes. Just authentic, casual threads that sound like *you*.

## Features

- 🚀 **One-Click Generation** - Paste notes, get thread
- 🎭 **Authentic Voice** - Casual, messy, real (not corporate AI)
- 🔥 **Built for Builders** - Perfect for #BuildInPublic updates
- 💎 **Free Tier** - 5 threads/month free
- ⚡ **Pro Plan** - Unlimited threads for $9/mo

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma + SQLite (dev) / PostgreSQL (prod)
- **Auth**: NextAuth.js (GitHub + Google OAuth)
- **AI**: OpenAI GPT-4o-mini
- **Payments**: Polar.sh
- **Deployment**: Vercel (recommended)

## Setup Instructions

### 1. Clone and Install

\`\`\`bash
git clone <your-repo>
cd trying-dodo-payments
npm install
\`\`\`

### 2. Set Up Environment Variables

Copy `.env.example` to `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

Then fill in the required values:

#### Database
- `DATABASE_URL` - Already set for local dev (SQLite)

#### NextAuth
- `NEXTAUTH_URL` - Your app URL (http://localhost:3000 for dev)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

#### GitHub OAuth (Required)
1. Go to https://github.com/settings/developers
2. Create new OAuth App
3. Set callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID → `GITHUB_ID`
5. Generate Client Secret → `GITHUB_SECRET`

#### Google OAuth (Optional)
1. Go to https://console.cloud.google.com/apis/credentials
2. Create OAuth 2.0 Client ID
3. Add authorized redirect: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID → `GOOGLE_ID`
5. Copy Client Secret → `GOOGLE_SECRET`

#### OpenAI API (Required)
1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Copy to `OPENAI_API_KEY`

#### Polar.sh (For Payments)
1. Create account at https://polar.sh
2. Create a subscription product ($9/mo)
3. Get your access token → `POLAR_ACCESS_TOKEN`
4. Set up webhook pointing to `/api/webhook/polar`
5. Copy webhook secret → `POLAR_WEBHOOK_SECRET`
6. Copy checkout URL → `POLAR_CHECKOUT_URL`

### 3. Set Up Database

\`\`\`bash
npx prisma migrate dev
npx prisma generate
\`\`\`

### 4. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000

## Project Structure

\`\`\`
/app
  /api
    /auth/[...nextauth]  # NextAuth routes
    /generate            # Thread generation API
    /webhook/polar       # Polar.sh webhook handler
  /dashboard             # Main app (protected)
  page.tsx               # Landing page
  
/lib
  auth.ts               # NextAuth config
  prisma.ts             # Prisma client
  
/prisma
  schema.prisma         # Database schema
\`\`\`

## Database Schema

- **User** - Auth + subscription status
- **Account** - OAuth accounts
- **Session** - User sessions
- **Thread** - Generated threads history
- **UsageLimit** - Free tier tracking (5/month)

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Change `DATABASE_URL` to PostgreSQL connection string
5. Run `npx prisma migrate deploy` after first deploy

### Environment Variables for Production

Update these in production:
- `NEXTAUTH_URL` - Your production domain
- `NEXTAUTH_SECRET` - New secret for production
- `DATABASE_URL` - PostgreSQL connection string
- Update OAuth callback URLs to production domain

## Usage Limits

### Free Tier
- 5 thread generations per month
- Resets on 1st of each month
- All features included

### Pro ($9/mo)
- Unlimited thread generations
- All features included
- Cancel anytime

## Development Notes

- SQLite is used for local development
- Use PostgreSQL for production (Vercel Postgres, Supabase, etc.)
- OpenAI API costs ~$0.001 per thread generation
- Consider rate limiting in production

## Next Steps / Roadmap

- [ ] Add thread history view
- [ ] Custom thread styles/tones
- [ ] Direct X posting integration
- [ ] Analytics dashboard
- [ ] Thread templates
- [ ] Batch generation

## Support

Built by an indie dev for indie devs. Questions? Open an issue or DM on X.

## License

MIT

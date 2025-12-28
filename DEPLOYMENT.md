# Deployment Guide - VibeThread

This guide will help you deploy VibeThread to production on Vercel.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Production OAuth apps (GitHub/Google)
- OpenAI API key with credits
- (Optional) Polar.sh account for payments

## Step 1: Prepare Your Repository

1. **Commit all changes**:
```bash
git add .
git commit -m "Initial VibeThread setup"
git push origin main
```

2. **Update .gitignore** (already done):
```
.env
.env.local
node_modules/
.next/
dev.db
```

## Step 2: Set Up Production Database

You have several options:

### Option A: Vercel Postgres (Recommended)
1. Go to your Vercel dashboard
2. Create a new Postgres database
3. Copy the connection string (starts with `postgresql://`)
4. You'll use this as `DATABASE_URL` in Step 4

### Option B: Supabase
1. Create project at https://supabase.com
2. Go to Settings → Database
3. Copy the connection string (Connection pooling)
4. Use this as `DATABASE_URL`

### Option C: Railway/Neon/PlanetScale
- Similar process - get a PostgreSQL connection string

## Step 3: Set Up Production OAuth Apps

### GitHub OAuth (Production)
1. Go to https://github.com/settings/developers
2. Create NEW OAuth App (separate from local)
3. Fill in:
   - Name: `VibeThread Production`
   - Homepage: `https://your-app.vercel.app`
   - Callback: `https://your-app.vercel.app/api/auth/callback/github`
4. Save Client ID and Secret for Step 4

### Google OAuth (Optional)
1. Go to https://console.cloud.google.com
2. Update authorized redirect URIs:
   - Add: `https://your-app.vercel.app/api/auth/callback/google`
3. Or create a new OAuth client for production

## Step 4: Deploy to Vercel

### Initial Deploy

1. **Connect Repository**:
   - Go to https://vercel.com
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Click "Import"

2. **Configure Environment Variables**:
   
   In the Vercel project settings, add these environment variables:

   ```
   # Database (from Step 2)
   DATABASE_URL=postgresql://your-connection-string
   
   # NextAuth
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=<generate-new-secret-with-openssl-rand-base64-32>
   
   # GitHub OAuth (from Step 3)
   GITHUB_ID=your-production-github-id
   GITHUB_SECRET=your-production-github-secret
   
   # Google OAuth (optional)
   GOOGLE_ID=your-production-google-id
   GOOGLE_SECRET=your-production-google-secret
   
   # OpenAI
   OPENAI_API_KEY=your-openai-key
   
   # Polar.sh (optional, set up later)
   POLAR_ACCESS_TOKEN=your-polar-token
   POLAR_WEBHOOK_SECRET=your-polar-webhook-secret
   POLAR_CHECKOUT_URL=https://polar.sh/your-product
   ```

3. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

### Post-Deploy Database Setup

After first deployment, run migrations:

1. Go to Vercel project → Settings → General
2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Link your project:
```bash
vercel link
```

4. Run migrations in production:
```bash
npx prisma migrate deploy
```

Or use Vercel CLI:
```bash
vercel env pull .env.production
# Update DATABASE_URL in .env.production
npx prisma migrate deploy
```

## Step 5: Set Up Polar.sh (Optional)

1. **Create Polar Account**:
   - Go to https://polar.sh
   - Create an account
   - Verify your identity

2. **Create Product**:
   - Go to Products
   - Create new subscription product
   - Name: "VibeThread Pro"
   - Price: $9/month
   - Save the checkout URL

3. **Set Up Webhook**:
   - Go to Settings → Webhooks
   - Add webhook endpoint: `https://your-app.vercel.app/api/webhook/polar`
   - Select events: `subscription.*`
   - Copy the webhook secret

4. **Update Environment Variables**:
   - Go to Vercel project → Settings → Environment Variables
   - Add/Update:
     - `POLAR_ACCESS_TOKEN`
     - `POLAR_WEBHOOK_SECRET`
     - `POLAR_CHECKOUT_URL`
   - Redeploy the app

## Step 6: Testing Production

1. **Test Authentication**:
   - Visit your production URL
   - Click "Sign In"
   - Authenticate with GitHub/Google
   - Should redirect to dashboard

2. **Test Thread Generation**:
   - Paste some notes
   - Click "Generate Thread"
   - Verify it generates correctly

3. **Test Free Tier Limit**:
   - Generate 5 threads
   - 6th should show limit error

4. **Test Upgrade Flow** (if Polar.sh set up):
   - Click "Upgrade to Pro"
   - Complete checkout
   - Verify webhook updates user to Pro
   - Test unlimited generation

## Step 7: Custom Domain (Optional)

1. In Vercel project → Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update environment variables:
   - `NEXTAUTH_URL=https://vibethread.com`
5. Update OAuth callback URLs to use custom domain
6. Redeploy

## Monitoring & Maintenance

### Check Usage
- Monitor Vercel analytics
- Check OpenAI API usage at https://platform.openai.com/usage
- Track Polar.sh subscriptions

### Database Maintenance
- Use Prisma Studio to view data:
```bash
npx prisma studio
```
- Monitor database size (SQLite has limits, PostgreSQL is better)

### Logs
- View logs in Vercel dashboard
- Check for errors in Functions tab

### Updates
When you make changes:
```bash
git add .
git commit -m "Your changes"
git push
```
Vercel auto-deploys on push to main.

## Security Checklist

- [ ] Different `NEXTAUTH_SECRET` for production
- [ ] Separate OAuth apps for production
- [ ] PostgreSQL instead of SQLite
- [ ] Environment variables secured in Vercel
- [ ] `.env` not committed to git
- [ ] Webhook secret configured
- [ ] Rate limiting considered (add if needed)

## Costs Estimation

- **Vercel**: Free (hobby) or $20/month (pro)
- **Database**: Free tier available (Vercel Postgres, Supabase)
- **OpenAI API**: ~$0.001 per thread = $1 per 1000 threads
- **Domain**: ~$10-15/year (optional)

**Total minimum**: $0/month (all free tiers)
**Estimated at 1000 threads/month**: ~$1/month

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Ensure all dependencies are in `package.json`
- Try building locally: `npm run build`

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Check database is accessible from Vercel
- Ensure migrations are deployed

### Authentication Issues
- Verify OAuth callback URLs match exactly
- Check `NEXTAUTH_URL` is correct
- Ensure `NEXTAUTH_SECRET` is set

### API Errors
- Check function logs in Vercel
- Verify `OPENAI_API_KEY` is valid
- Ensure you have OpenAI credits

---

**Ready to go live?** Follow these steps and you'll have VibeThread running in production! 🚀

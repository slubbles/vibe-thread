# Pre-Launch Checklist

Use this checklist before deploying VibeThread to production.

## ✅ Code Quality

- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No console.log statements in production code
- [ ] All TODO comments addressed or removed
- [ ] Error handling in all API routes
- [ ] Loading states for all async actions
- [ ] Proper error messages for users

## ✅ Security

- [ ] `.env` not committed to git (check `.gitignore`)
- [ ] Unique `NEXTAUTH_SECRET` for production
- [ ] Separate OAuth apps for production
- [ ] Database connection string secured
- [ ] API keys in environment variables only
- [ ] Webhook signatures verified
- [ ] No sensitive data exposed in client-side code

## ✅ Authentication

- [ ] GitHub OAuth app created for production
- [ ] Callback URL updated to production domain
- [ ] Google OAuth (if using) configured for production
- [ ] NextAuth URL set to production domain
- [ ] Sign in flow tested
- [ ] Sign out flow tested
- [ ] Session persistence working

## ✅ Database

- [ ] Migrated from SQLite to PostgreSQL
- [ ] All migrations applied: `npx prisma migrate deploy`
- [ ] Prisma Client generated
- [ ] Database connection tested
- [ ] Backup strategy in place (automatic with most providers)

## ✅ AI Integration

- [ ] OpenAI API key valid and has credits
- [ ] Thread generation tested thoroughly
- [ ] Prompt produces good results
- [ ] Error handling for API failures
- [ ] Rate limiting considered (if needed)

## ✅ Payments (Polar.sh)

- [ ] Polar.sh account created and verified
- [ ] Product created ($9/mo subscription)
- [ ] Checkout URL configured
- [ ] Webhook endpoint set: `/api/webhook/polar`
- [ ] Webhook secret configured
- [ ] Test subscription flow
- [ ] Test webhook (use Polar.sh webhook tester)
- [ ] Verify user upgraded to Pro after payment
- [ ] Test cancellation flow

## ✅ UI/UX

- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] Loading states are clear
- [ ] Error messages are helpful
- [ ] Success feedback is obvious
- [ ] Copy button works
- [ ] Navigation is intuitive
- [ ] Dark mode works (if implemented)

## ✅ Content

- [ ] Landing page copy proofread
- [ ] Pricing clearly explained
- [ ] Example thread looks good
- [ ] CTA buttons are clear
- [ ] Footer links work
- [ ] Contact info or social links added

## ✅ Performance

- [ ] Build completes: `npm run build`
- [ ] No build warnings
- [ ] Images optimized
- [ ] Bundle size reasonable (check build output)
- [ ] Page load time acceptable
- [ ] Lighthouse score >90 (run in Chrome DevTools)

## ✅ SEO (Basic)

- [ ] Page titles set
- [ ] Meta descriptions added
- [ ] Open Graph tags for social sharing
- [ ] Favicon added
- [ ] robots.txt configured (if needed)
- [ ] sitemap.xml (optional for MVP)

## ✅ Analytics (Optional but Recommended)

- [ ] Vercel Analytics enabled (free)
- [ ] Or Google Analytics added
- [ ] Error tracking (Sentry/similar) considered
- [ ] Key events tracked (sign-ups, generations, upgrades)

## ✅ Legal

- [ ] Privacy Policy page
- [ ] Terms of Service page
- [ ] Cookie notice (if using cookies beyond auth)
- [ ] GDPR compliance considered (if targeting EU)
- [ ] Links in footer

## ✅ Deployment

- [ ] Repository pushed to GitHub
- [ ] Connected to Vercel
- [ ] Environment variables set in Vercel
- [ ] Build successful
- [ ] Deployment previewed
- [ ] Custom domain configured (if applicable)
- [ ] SSL certificate active (automatic with Vercel)

## ✅ Testing in Production

- [ ] Sign in with GitHub works
- [ ] Dashboard loads correctly
- [ ] Generate thread works
- [ ] Usage count increments
- [ ] Free tier limit enforced
- [ ] Upgrade link works
- [ ] Payment flow completes
- [ ] Webhook updates user status
- [ ] Pro user has unlimited access
- [ ] Sign out works
- [ ] 404 page looks good
- [ ] Error page looks good

## ✅ Monitoring

- [ ] Vercel function logs accessible
- [ ] Database accessible for debugging
- [ ] Way to view/manage users (Prisma Studio)
- [ ] Way to check Polar.sh subscriptions
- [ ] Way to monitor OpenAI API usage

## ✅ Documentation

- [ ] README.md updated
- [ ] Environment variables documented
- [ ] Setup instructions clear
- [ ] Deployment guide available

## ✅ Marketing Prep

- [ ] Screenshots taken for social media
- [ ] Demo video recorded (optional but good)
- [ ] Twitter/X announcement drafted
- [ ] Product Hunt submission prepared
- [ ] Email to friends/network drafted

## 🚀 Launch Day

- [ ] Final test of entire flow
- [ ] Tweet announcement
- [ ] Post on Product Hunt (Tuesday-Thursday 12:01 AM PST)
- [ ] Share in relevant communities (indie hackers, etc.)
- [ ] Monitor for bugs/issues
- [ ] Respond to feedback

## 📊 Post-Launch (First Week)

- [ ] Check analytics daily
- [ ] Monitor error logs
- [ ] Respond to user feedback
- [ ] Fix critical bugs ASAP
- [ ] Collect testimonials
- [ ] Iterate based on feedback

---

## Quick Pre-Deploy Command Check

Run these before deploying:

```bash
# Check for errors
npx tsc --noEmit

# Build successfully
npm run build

# Check dependencies
npm audit

# Ensure migrations ready
npx prisma migrate status
```

## Environment Variables Checklist

Verify all these are set in Vercel:

```
✅ DATABASE_URL
✅ NEXTAUTH_URL
✅ NEXTAUTH_SECRET
✅ GITHUB_ID
✅ GITHUB_SECRET
✅ OPENAI_API_KEY
✅ POLAR_ACCESS_TOKEN (optional for MVP)
✅ POLAR_WEBHOOK_SECRET (optional for MVP)
✅ POLAR_CHECKOUT_URL (optional for MVP)
```

---

**Ready?** If all checked, you're good to launch! 🚀

**Not ready?** Work through unchecked items first.

**Nervous?** Test everything twice. Deploy to preview first. Launch when confident.

**After launch:** Iterate based on real user feedback. Don't aim for perfection — aim for progress!

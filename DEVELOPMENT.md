# Development Workflow

Quick reference for common development tasks.

## Daily Development

### Start Development Server
```bash
npm run dev
```
- Opens at http://localhost:3000
- Hot reload enabled
- Turbopack for fast refreshes

### View Database
```bash
npm run db:studio
```
- Opens Prisma Studio at http://localhost:5555
- Visual database editor
- View/edit all tables

## Making Changes

### Adding a New Feature

1. **Create a new branch** (optional):
```bash
git checkout -b feature/your-feature-name
```

2. **Make changes** to code

3. **Test locally**:
   - Run the app: `npm run dev`
   - Test the feature manually
   - Check for TypeScript errors
   - Check browser console for errors

4. **Commit**:
```bash
git add .
git commit -m "Add your feature description"
git push
```

### Modifying Database Schema

1. **Edit** `prisma/schema.prisma`

2. **Create migration**:
```bash
npm run db:migrate
```
- This will prompt for migration name
- Example: "add_favorites_table"

3. **Generate Prisma Client**:
```bash
npm run db:generate
```

4. **Restart dev server** if it was running

### Changing AI Prompt

1. Edit `/app/api/generate/route.ts`
2. Find `SYSTEM_PROMPT` constant
3. Modify the prompt text
4. Test by generating a thread
5. Iterate until you like the output

### Updating Styles

- Edit component files (`.tsx`)
- Use Tailwind classes
- Changes hot reload automatically
- Check responsive design (mobile/tablet/desktop)

## Testing

### Manual Testing Checklist

**Landing Page:**
- [ ] Page loads correctly
- [ ] Sign In button works
- [ ] Responsive on mobile

**Authentication:**
- [ ] Can sign in with GitHub
- [ ] Redirects to dashboard after sign in
- [ ] Sign out works

**Dashboard:**
- [ ] Shows user name
- [ ] Shows remaining generations (free tier)
- [ ] Input textarea works
- [ ] Generate button works
- [ ] Loading state shows
- [ ] Thread appears after generation
- [ ] Copy button works
- [ ] Usage count increments

**Free Tier Limit:**
- [ ] Shows warning at 4 generations
- [ ] Blocks at 5 generations
- [ ] Shows error message
- [ ] Suggests upgrade

**Pro Features:**
- [ ] Upgrade link works
- [ ] Polar checkout loads
- [ ] Webhook updates user
- [ ] Unlimited generation works

## Database Commands

### Reset database (careful!)
```bash
npm run db:reset
```
Deletes all data and re-runs migrations.

### View migrations
```bash
ls prisma/migrations/
```

### Manually run specific migration
```bash
npx prisma migrate deploy
```

## Debugging

### Check Logs
- **Browser Console**: F12 → Console tab
- **Server Logs**: Check terminal running `npm run dev`
- **Database**: `npm run db:studio`

### Common Issues

**"Module not found"**
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

**Database locked (SQLite)**
```bash
# Close Prisma Studio if open
npm run db:reset  # If you can lose data
```

**TypeScript errors**
```bash
# Check for errors
npx tsc --noEmit

# Restart VS Code TypeScript server
# Cmd+Shift+P → "Restart TS Server"
```

**NextAuth session issues**
```bash
# Clear cookies in browser
# Or use incognito mode
```

## Git Workflow

### Before committing
```bash
# Check what changed
git status

# View specific changes
git diff

# Add specific files
git add path/to/file

# Or add all
git add .

# Commit with clear message
git commit -m "Fix: bug in thread generation"
```

### Commit message convention
- `feat: Add new feature`
- `fix: Fix bug in X`
- `docs: Update README`
- `style: UI improvements`
- `refactor: Restructure code`
- `perf: Improve performance`
- `test: Add tests`

### Undo last commit (keep changes)
```bash
git reset --soft HEAD~1
```

### View commit history
```bash
git log --oneline
```

## Environment Variables

### Add new variable

1. Add to `.env`:
```bash
NEW_VAR=value
```

2. Add to `.env.example`:
```bash
NEW_VAR=your-value-here
```

3. Use in code:
```typescript
const myVar = process.env.NEW_VAR
```

4. Restart dev server

### For production (Vercel)
- Add in Vercel dashboard
- Settings → Environment Variables
- Redeploy after adding

## Performance

### Check bundle size
```bash
npm run build
```
Look for page sizes in output.

### Optimize images
- Use Next.js `<Image>` component
- It auto-optimizes

### Check Lighthouse score
- F12 → Lighthouse tab
- Run report
- Aim for 90+ on all metrics

## Deployment

### Deploy to Vercel (if connected)
```bash
git push origin main
```
Auto-deploys!

### Manual deploy
```bash
vercel --prod
```

### Check production
- Visit your Vercel URL
- Test all features
- Check function logs in Vercel dashboard

## Maintenance

### Update dependencies
```bash
npm outdated  # Check what's outdated
npm update    # Update to latest minor versions
```

### Major version updates (careful)
```bash
npm install package@latest
```

### Check for vulnerabilities
```bash
npm audit
npm audit fix  # Auto-fix if possible
```

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run db:studio` | Open database UI |
| `npm run db:migrate` | Create migration |
| `npm run db:generate` | Generate Prisma Client |
| `git status` | Check changes |
| `git add .` | Stage all changes |
| `git commit -m "msg"` | Commit changes |
| `git push` | Push to GitHub |

---

**Pro tip**: Keep terminal open with `npm run dev` and a second terminal for git commands.

## Quick Start Checklist

Follow these steps to get VibeThread running locally:

### ✅ Step 1: Install Dependencies
```bash
npm install
```

### ✅ Step 2: Set Up Environment Variables

1. Copy the example file:
```bash
cp .env.example .env
```

2. **Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```
Copy the output and paste it as `NEXTAUTH_SECRET` in `.env`

3. **Set up GitHub OAuth** (Required to sign in):
   - Go to: https://github.com/settings/developers
   - Click "New OAuth App"
   - Fill in:
     - Application name: `VibeThread Local`
     - Homepage URL: `http://localhost:3000`
     - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
   - Click "Register application"
   - Copy the Client ID → paste as `GITHUB_ID` in `.env`
   - Click "Generate a new client secret"
   - Copy the secret → paste as `GITHUB_SECRET` in `.env`

4. **Set up OpenAI API** (Required to generate threads):
   - Go to: https://platform.openai.com/api-keys
   - Click "Create new secret key"
   - Copy the key → paste as `OPENAI_API_KEY` in `.env`

5. **Optional**: Set up Google OAuth (same process as GitHub)

6. **Optional**: Set up Polar.sh for payments (can skip for testing)

### ✅ Step 3: Set Up Database
```bash
npx prisma migrate dev
npx prisma generate
```

### ✅ Step 4: Run the App
```bash
npm run dev
```

Open http://localhost:3000 in your browser!

### 🎯 Testing the App

1. Click "Sign In" and authenticate with GitHub
2. You'll be redirected to the dashboard
3. Paste some notes in the textarea:
   ```
   fixed bug today, still no users, kinda tired
   spent 5hrs on auth
   idk if anyone will use this
   ```
4. Click "Generate Thread ✨"
5. Copy the generated thread and post it on X!

### 🚨 Common Issues

**"Invalid environment variables"**
- Make sure all required vars in `.env` are filled in
- Check that `NEXTAUTH_SECRET` is set

**"Database error"**
- Run `npx prisma migrate dev` again
- Check that `dev.db` file exists in the project root

**"OpenAI API error"**
- Verify your `OPENAI_API_KEY` is correct
- Make sure you have credits in your OpenAI account

**Can't sign in**
- Double-check GitHub OAuth callback URL matches exactly
- Make sure `GITHUB_ID` and `GITHUB_SECRET` are correct

### 📝 What's Next?

- Test the free tier limit (5 generations)
- Set up Polar.sh if you want to test payments
- Customize the AI prompt in `/app/api/generate/route.ts`
- Deploy to Vercel when ready!

---

**Need help?** Open an issue or check the full README.md

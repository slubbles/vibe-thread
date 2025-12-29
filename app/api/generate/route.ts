import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import OpenAI from "openai"

// Using Grok API from X.ai (OpenAI-compatible)
const grok = new OpenAI({
  apiKey: process.env.XAI_API_KEY || "dummy-key-for-now", // Add your Grok API key later
  baseURL: "https://api.x.ai/v1",
})

const SYSTEM_PROMPT = `You are a thread generator that turns messy developer notes into authentic, casual X (Twitter) threads.

RULES (you MUST follow these exactly):
1. Write like a real person from Product Hunt/indie dev community
2. Use simple words, casual tone, slight typos/slang are OK (ngl, tbh, ig, kinda)
3. Keep tweets SHORT (100-200 chars each, max 280)
4. Number each tweet: "1/", "2/", etc.
5. Add ONE emoji max per thread (usually at end)
6. Start with a hook that grabs attention
7. End with a relatable question or casual thought
8. Sound tired, honest, vulnerable — not polished
9. Use lowercase for casual vibe where appropriate
10. Make it feel like YOU, not AI

DO NOT:
- Use corporate speak or marketing language
- Be overly positive or motivational
- Use multiple emojis
- Write long sentences
- Sound like ChatGPT

Example input:
"fixed bug today, still no users, kinda tired
spent 5hrs on auth
idk if anyone will use this"

Example output:
1/ spent 5 hrs fixing auth today ngl kinda burned out

2/ still zero users but ig thats how it goes at the start

3/ anyone else feel like this when building? 😅

Your output should ONLY be the numbered tweets, nothing else.`

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { input } = await req.json()

    if (!input || typeof input !== "string" || input.trim().length === 0) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 })
    }

    // Get user and usage limit
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    const now = new Date()
    const firstOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1)

    let usageLimit = await prisma.usageLimit.findUnique({
      where: { userId: session.user.id },
    })

    if (!usageLimit || usageLimit.resetAt < now) {
      usageLimit = await prisma.usageLimit.upsert({
        where: { userId: session.user.id },
        create: {
          userId: session.user.id,
          count: 0,
          resetAt: firstOfNextMonth,
        },
        update: {
          count: 0,
          resetAt: firstOfNextMonth,
        },
      })
    }

    // Check if user has reached limit (only if not Pro)
    if (!user?.isPro && usageLimit.count >= 5) {
      return NextResponse.json(
        { error: "Free tier limit reached. Upgrade to Pro for unlimited threads!" },
        { status: 403 }
      )
    }

    // Generate thread with Grok (X.ai)
    const completion = await grok.chat.completions.create({
      model: "grok-beta", // Grok's model name
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: input },
      ],
      temperature: 0.9,
      max_tokens: 500,
    })

    const generatedText = completion.choices[0]?.message?.content || ""
    
    // Parse the numbered tweets
    const tweets = generatedText
      .split("\n")
      .filter(line => line.trim().length > 0)
      .map(line => line.trim())

    // Save to database
    await prisma.thread.create({
      data: {
        userId: session.user.id,
        input: input,
        output: generatedText,
      },
    })

    // Increment usage count
    await prisma.usageLimit.update({
      where: { userId: session.user.id },
      data: { count: usageLimit.count + 1 },
    })

    return NextResponse.json({
      thread: { tweets },
      remaining: user?.isPro ? "unlimited" : Math.max(0, 5 - usageLimit.count - 1),
    })

  } catch (error: any) {
    console.error("Generation error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to generate thread" },
      { status: 500 }
    )
  }
}

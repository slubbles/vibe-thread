import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import crypto from "crypto"

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const signature = req.headers.get("x-polar-signature")
    
    // Verify webhook signature
    const webhookSecret = process.env.POLAR_WEBHOOK_SECRET
    if (webhookSecret && signature) {
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(body)
        .digest("hex")
      
      if (signature !== expectedSignature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 401 })
      }
    }

    const event = JSON.parse(body)

    // Handle subscription events
    switch (event.type) {
      case "subscription.created":
      case "subscription.updated":
        const subscription = event.data
        
        // Find user by email or stripe customer id
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: subscription.customer_email },
              { stripeCustomerId: subscription.customer_id },
            ],
          },
        })

        if (user) {
          await prisma.user.update({
            where: { id: user.id },
            data: {
              isPro: subscription.status === "active",
              stripeCustomerId: subscription.customer_id,
            },
          })
        }
        break

      case "subscription.cancelled":
      case "subscription.ended":
        const cancelledSub = event.data
        
        const cancelledUser = await prisma.user.findUnique({
          where: { stripeCustomerId: cancelledSub.customer_id },
        })

        if (cancelledUser) {
          await prisma.user.update({
            where: { id: cancelledUser.id },
            data: { isPro: false },
          })
        }
        break
    }

    return NextResponse.json({ received: true })
  } catch (error: any) {
    console.error("Webhook error:", error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

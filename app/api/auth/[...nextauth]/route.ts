// import { handlers } from "@/lib/auth"

// Auth temporarily disabled
export const GET = async () => {
  return new Response(JSON.stringify({ error: "Auth disabled" }), {
    status: 503,
    headers: { "Content-Type": "application/json" }
  })
}

export const POST = async () => {
  return new Response(JSON.stringify({ error: "Auth disabled" }), {
    status: 503,
    headers: { "Content-Type": "application/json" }
  })
}

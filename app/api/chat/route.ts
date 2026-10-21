import { convertToModelMessages, streamText, gateway } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    const result = streamText({
      model: gateway('google/gemini-2.5-flash-lite'),
      system: `You are Pahlwan's portfolio assistant. Answer questions about Pahlwan Rabiul Islam's experience, projects, skills, and contact options using the portfolio context. Be concise, friendly, and honest. If something is not in the portfolio context, say you don't have that detail and suggest visiting the contact page.`,
      messages: await convertToModelMessages(messages),
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error('[v0] Chat request failed:', error)
    return NextResponse.json(
      { error: 'The assistant is temporarily unavailable. Please try again later.' },
      { status: 503 },
    )
  }
}

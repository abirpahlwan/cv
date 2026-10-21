import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { convertToModelMessages, streamText } from 'ai'
import { NextResponse } from 'next/server'

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
})

export async function POST(request: Request) {
  try {
    const { messages } = await request.json()

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'The chat service is not configured yet.' },
        { status: 503 },
      )
    }

    const result = streamText({
      model: google('gemini-3.8-flash'),
      system: `You are Pahlwan's portfolio assistant. Answer questions about Pahlwan Rabiul Islam's experience, projects, skills, and contact options using the portfolio context. Be concise, friendly, and honest. If something is not in the portfolio context, say you don't have that detail and suggest visiting the contact page.`,
      messages: await convertToModelMessages(messages),
      onError: ({ error }) => {
        console.error('[v0] Gemini stream error:', error)
      },
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

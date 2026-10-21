'use client'

import { FormEvent, useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import type { UIMessage } from 'ai'
import { MessageCircle, Mic, Send, Square, Volume2, X } from 'lucide-react'
import { cn } from '@/lib/utils'

function messageText(message: UIMessage) {
  return message.parts
    .filter((part): part is typeof part & { text: string } => part.type === 'text' && 'text' in part)
    .map((part) => part.text)
    .join('')
}

export function PortfolioAssistant() {
  const { messages, sendMessage, status, stop, error } = useChat()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, status])

  useEffect(() => () => recognitionRef.current?.abort(), [])

  function submit(event: FormEvent) {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || status === 'streaming' || status === 'submitted') return
    sendMessage({ text: trimmed })
    setInput('')
  }

  function toggleVoiceInput() {
    if (listening) {
      recognitionRef.current?.stop()
      setListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setInput('Voice input is not supported in this browser.')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = true
    recognition.continuous = false
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map((result) => result[0].transcript).join('')
      setInput(transcript)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  function speakLastReply() {
    const lastReply = [...messages].reverse().find((message) => message.role === 'assistant')
    if (!lastReply || !('speechSynthesis' in window)) return
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(messageText(lastReply))
    utterance.onend = () => setSpeaking(false)
    window.speechSynthesis.speak(utterance)
    setSpeaking(true)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 sm:bottom-7 sm:right-7">
      {open && (
        <section aria-label="Portfolio assistant" className="mb-3 flex h-[min(620px,calc(100vh-7rem))] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
          <header className="flex items-center justify-between border-b border-neutral-200 bg-neutral-950 px-4 py-3 text-white">
            <div><p className="text-sm font-semibold">Ask Pahlwan&apos;s assistant</p><p className="text-xs text-neutral-400">Chat now, local inference later</p></div>
            <button onClick={() => setOpen(false)} aria-label="Close assistant" className="rounded-md p-1.5 text-neutral-400 transition hover:bg-white/10 hover:text-white"><X className="size-4" /></button>
          </header>
          <div className="flex-1 space-y-4 overflow-y-auto p-4" aria-live="polite">
            {messages.length === 0 && <div className="rounded-xl bg-neutral-50 p-4 text-sm text-neutral-600"><p className="font-medium text-neutral-900">Hi, I&apos;m here to help.</p><p className="mt-1">Ask about projects, skills, experience, or how to get in touch.</p><div className="mt-3 flex flex-wrap gap-2"><button onClick={() => setInput('What kind of projects has Pahlwan built?')} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs hover:border-neutral-400">Projects</button><button onClick={() => setInput('What are Pahlwan&apos;s main skills?')} className="rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-xs hover:border-neutral-400">Skills</button></div></div>}
            {messages.map((message) => <div key={message.id} className={cn('flex', message.role === 'user' ? 'justify-end' : 'justify-start')}><div className={cn('max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed', message.role === 'user' ? 'rounded-br-sm bg-neutral-950 text-white' : 'rounded-bl-sm bg-neutral-100 text-neutral-800')}>{messageText(message)}</div></div>)}
            {(status === 'submitted' || status === 'streaming') && <div className="text-xs text-neutral-500">Thinking…</div>}
            {error && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-relaxed text-red-700">The assistant could not reply right now. The AI service may need billing verification or may be temporarily unavailable.</div>}
            <div ref={bottomRef} />
          </div>
          <div className="border-t border-neutral-200 p-3"><form onSubmit={submit} className="flex items-end gap-2"><textarea value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing && event.keyCode !== 229) { event.preventDefault(); submit(event) } }} placeholder="Ask a question…" rows={1} aria-label="Message assistant" className="min-h-10 flex-1 resize-none rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-neutral-500" /><button type="button" onClick={toggleVoiceInput} aria-label={listening ? 'Stop listening' : 'Use voice input'} className={cn('rounded-xl p-2.5 transition', listening ? 'bg-red-100 text-red-700' : 'text-neutral-500 hover:bg-neutral-100')}><Mic className="size-4" /></button><button type="submit" disabled={!input.trim() || status === 'streaming' || status === 'submitted'} aria-label="Send message" className="rounded-xl bg-neutral-950 p-2.5 text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"><Send className="size-4" /></button></form><div className="mt-2 flex items-center justify-between"><p className="text-[10px] text-neutral-400">Free-tier AI for now · voice runs in your browser</p>{status === 'streaming' ? <button onClick={stop} className="inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900"><Square className="size-3" /> Stop</button> : <button onClick={speakLastReply} disabled={!messages.some((message) => message.role === 'assistant')} className={cn('inline-flex items-center gap-1 text-[11px] text-neutral-500 hover:text-neutral-900 disabled:opacity-30', speaking && 'text-neutral-900')}><Volume2 className="size-3" /> {speaking ? 'Stop voice' : 'Read reply'}</button>}</div></div>
        </section>
      )}
      <button onClick={() => setOpen((value) => !value)} aria-label={open ? 'Close portfolio assistant' : 'Open portfolio assistant'} className="group ml-auto flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-neutral-800"><MessageCircle className="size-4" /><span className="hidden sm:inline">Ask me anything</span></button>
    </div>
  )
}

declare global {
  interface SpeechRecognition {
    lang: string
    interimResults: boolean
    continuous: boolean
    onresult: ((event: { results: ArrayLike<{ 0: { transcript: string } }> }) => void) | null
    onend: (() => void) | null
    onerror: (() => void) | null
    start: () => void
    stop: () => void
    abort: () => void
  }
  interface Window {
    SpeechRecognition?: new () => SpeechRecognition
    webkitSpeechRecognition?: new () => SpeechRecognition
  }
}

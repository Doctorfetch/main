import { useEffect, useRef, useState } from 'react'
import { brand } from '../brand'
import { coachReply, quickReplies, uid, type Msg } from '../data/coach'

const seed: Msg[] = [
  {
    id: uid(),
    from: 'coach',
    text: `Hey, I'm ${brand.coach} 👋 Your move today is whatever you've got energy for. How are you feeling?`,
  },
]

export default function ChatCoach({ compact = false }: { compact?: boolean }) {
  const [msgs, setMsgs] = useState<Msg[]>(seed)
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [msgs, typing])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return
    setMsgs((m) => [...m, { id: uid(), from: 'user', text: trimmed }])
    setDraft('')
    setTyping(true)
    const delay = 600 + Math.min(trimmed.length * 18, 1100)
    window.setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: uid(), from: 'coach', text: coachReply(trimmed) }])
    }, delay)
  }

  return (
    <div
      className={`glass rounded-4xl flex flex-col overflow-hidden ${
        compact ? 'h-[520px]' : 'h-[560px]'
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/[0.03]">
        <div className="relative">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-lime to-grape grid place-items-center text-ink-900 font-bold">
            A
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-lime ring-2 ring-ink-800" />
        </div>
        <div className="leading-tight">
          <p className="font-semibold">{brand.coach}</p>
          <p className="text-xs text-lime">online · ready when you are</p>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-3">
        {msgs.map((m) => (
          <Bubble key={m.id} msg={m} />
        ))}
        {typing && <TypingBubble />}
      </div>

      {/* Quick replies */}
      <div className="px-4 pb-2 flex gap-2 flex-wrap">
        {quickReplies.map((q) => (
          <button
            key={q}
            onClick={() => send(q)}
            className="text-xs px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/10 hover:border-lime/60 hover:text-lime transition"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          send(draft)
        }}
        className="p-3 border-t border-white/10 flex items-center gap-2 bg-white/[0.02]"
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Message your coach…"
          className="flex-1 bg-ink-700 rounded-full px-4 py-3 text-sm outline-none placeholder:text-white/30 focus:ring-2 focus:ring-lime/50"
        />
        <button
          type="submit"
          aria-label="Send"
          className="h-11 w-11 shrink-0 grid place-items-center rounded-full bg-lime text-ink-900 hover:brightness-95 active:scale-95 transition"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 11.5 21 3l-8.5 18-2.2-7.3L3 11.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
    </div>
  )
}

function Bubble({ msg }: { msg: Msg }) {
  const mine = msg.from === 'user'
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'} animate-pop`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed rounded-3xl ${
          mine
            ? 'bg-lime text-ink-900 rounded-br-md font-medium'
            : 'bg-white/[0.06] border border-white/10 rounded-bl-md'
        }`}
      >
        {msg.text}
      </div>
    </div>
  )
}

function TypingBubble() {
  return (
    <div className="flex justify-start">
      <div className="bg-white/[0.06] border border-white/10 rounded-3xl rounded-bl-md px-4 py-3 flex gap-1">
        {[0, 1, 2].map((d) => (
          <span
            key={d}
            className="h-2 w-2 rounded-full bg-white/70 animate-blink"
            style={{ animationDelay: `${d * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

// Scroll-driven 3D phone: as the section scrolls through the viewport, the
// phone rotates a full turn on its Y axis — front face (chat) turns around to
// reveal the back face (dashboard). Pure transforms, no libraries.
export default function ScrollPhone() {
  const ref = useRef<HTMLDivElement>(null)
  const [rot, setRot] = useState(0)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1))
      const p = total > 0 ? scrolled / total : 0
      setRot(p * 180)
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Captions cross-fade as the phone turns.
  const frontVisible = Math.cos((rot * Math.PI) / 180) // 1 at front, -1 at back

  return (
    <section ref={ref} className="relative" style={{ height: '240vh' }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-center px-5 mb-2">
          Two sides, <span className="text-gradient">one coach.</span>
        </h2>
        <p className="text-white/50 text-center mb-10 px-5">Scroll to flip it over →</p>

        {/* captions */}
        <div className="relative h-6 mb-6 w-full text-center">
          <span
            className="absolute inset-0 text-lime font-medium transition-opacity duration-200"
            style={{ opacity: Math.max(frontVisible, 0) }}
          >
            💬 Chat with your coach
          </span>
          <span
            className="absolute inset-0 text-grape-soft font-medium transition-opacity duration-200"
            style={{ opacity: Math.max(-frontVisible, 0) }}
          >
            📊 Track every win
          </span>
        </div>

        {/* 3D stage */}
        <div style={{ perspective: '1400px' }}>
          <div
            className="relative will-change-transform"
            style={{
              width: 280,
              height: 580,
              transformStyle: 'preserve-3d',
              transform: `rotateY(${rot}deg)`,
            }}
          >
            <PhoneFace rotate={0}>
              <ChatScreen />
            </PhoneFace>
            <PhoneFace rotate={180}>
              <DashScreen />
            </PhoneFace>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneFace({ rotate, children }: { rotate: number; children: React.ReactNode }) {
  return (
    <div
      className="absolute inset-0 rounded-[44px] bg-ink-900 border-[6px] border-ink-600 shadow-2xl overflow-hidden"
      style={{
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: `rotateY(${rotate}deg)`,
        boxShadow: '0 30px 80px rgba(124,92,255,0.25)',
      }}
    >
      {/* notch */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 h-5 w-24 bg-ink-900 rounded-full z-10 border border-ink-600" />
      {children}
    </div>
  )
}

function ChatScreen() {
  return (
    <div className="h-full w-full bg-aurora p-4 pt-9 flex flex-col">
      <div className="flex items-center gap-2 pb-3 border-b border-white/10">
        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-lime to-grape grid place-items-center text-ink-900 text-xs font-bold">
          A
        </div>
        <div className="text-xs">
          <p className="font-semibold">Coach Atlas</p>
          <p className="text-lime text-[10px]">online</p>
        </div>
      </div>
      <div className="flex-1 space-y-2 py-3 text-[11px]">
        <Bubble>How are you feeling today? 💪</Bubble>
        <Bubble mine>Bit tired tbh 😮‍💨</Bubble>
        <Bubble>Low battery day — let's do a 10-min flow. Showing up still counts. 🔋</Bubble>
        <Bubble mine>Okay let's go</Bubble>
      </div>
      <div className="bg-ink-700 rounded-full px-3 py-2 text-[10px] text-white/40">
        Message your coach…
      </div>
    </div>
  )
}

function Bubble({ children, mine }: { children: React.ReactNode; mine?: boolean }) {
  return (
    <div className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
      <span
        className={`max-w-[80%] px-2.5 py-1.5 rounded-2xl leading-snug ${
          mine ? 'bg-lime text-ink-900 rounded-br-sm' : 'bg-white/10 rounded-bl-sm'
        }`}
      >
        {children}
      </span>
    </div>
  )
}

function DashScreen() {
  return (
    <div className="h-full w-full bg-aurora p-4 pt-9 flex flex-col gap-3">
      <p className="text-sm font-display font-bold">Today 🔥</p>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        {[
          ['Steps', '8,420'],
          ['kcal', '612'],
          ['Streak', '12🔥'],
          ['Workouts', '4'],
        ].map(([l, v]) => (
          <div key={l} className="glass rounded-2xl p-2.5">
            <p className="text-white/40">{l}</p>
            <p className="font-display text-base font-bold">{v}</p>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-3 flex items-end gap-1.5 h-24">
        {[40, 0, 62, 30, 78, 52, 40].map((h, i) => (
          <div key={i} className="flex-1 flex items-end h-full">
            <div
              className="w-full rounded bg-gradient-to-t from-lime/40 to-lime"
              style={{ height: `${Math.max(h, 4)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl p-3 flex items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-white/10 border-t-lime" />
        <p className="text-[10px] text-white/60">78% of today's goal — one short session left 💪</p>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { brand } from '../brand'
import ChatCoach from '../components/ChatCoach'

export default function Landing() {
  return (
    <div className="bg-aurora min-h-screen">
      <Nav />
      <Hero />
      <Marquee />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-lime text-ink-900">
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
          <path
            d="M4 17h6l2-6 4 12 3-9 2 3h7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {brand.name}
    </Link>
  )
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-ink-900/60 border-b border-white/5">
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="#stats" className="hover:text-white transition">Results</a>
          <a href="#love" className="hover:text-white transition">Reviews</a>
        </nav>
        <Link
          to="/dashboard"
          className="rounded-full bg-lime text-ink-900 px-5 py-2.5 text-sm font-semibold hover:brightness-95 active:scale-95 transition"
        >
          Open app
        </Link>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 pb-10 grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-lime mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse" />
          Now with real-time voice coaching
        </span>
        <h1 className="font-display text-5xl sm:text-6xl font-bold leading-[1.05] tracking-tight">
          Your AI fitness coach that{' '}
          <span className="text-gradient">actually talks back.</span>
        </h1>
        <p className="mt-6 text-lg text-white/60 max-w-md">
          {brand.name} plans your workouts, counts your macros, and hypes you up — adapting to
          how you feel, every single day. No guilt. Just momentum.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/dashboard"
            className="rounded-full bg-lime text-ink-900 px-7 py-3.5 font-semibold hover:brightness-95 active:scale-95 transition"
          >
            Start moving — free
          </Link>
          <a
            href="#features"
            className="rounded-full glass px-7 py-3.5 font-semibold hover:border-white/30 transition"
          >
            See how it works
          </a>
        </div>
        <div className="mt-8 flex items-center gap-3 text-sm text-white/50">
          <div className="flex -space-x-2">
            {['#C6FF3D', '#7C5CFF', '#FF6B6B', '#D9FF7A'].map((c) => (
              <span
                key={c}
                className="h-7 w-7 rounded-full ring-2 ring-ink-900"
                style={{ background: c }}
              />
            ))}
          </div>
          Loved by 40,000+ early movers
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-6 bg-grape/20 blur-3xl rounded-full -z-10" />
        <div className="animate-floaty">
          <ChatCoach />
        </div>
      </div>
    </section>
  )
}

const marqueeItems = [
  'Adaptive workouts',
  'Macro tracking',
  'Streaks that stick',
  'Form cues',
  'Recovery scoring',
  'Voice coaching',
  'Personal records',
  'Zero judgement',
]

function Marquee() {
  return (
    <div className="border-y border-white/5 py-4 overflow-hidden">
      <div className="flex w-max animate-marquee gap-4">
        {[...marqueeItems, ...marqueeItems].map((t, i) => (
          <span
            key={i}
            className="text-white/40 text-sm whitespace-nowrap flex items-center gap-4"
          >
            {t}
            <span className="text-lime">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

const features = [
  {
    icon: '🧠',
    title: 'Coaching that adapts',
    body: "Slept badly? Sore? Crushed it yesterday? Pulse reshapes today's session around your real life — not a rigid plan you'll abandon by Wednesday.",
  },
  {
    icon: '🔥',
    title: 'Streaks without the guilt',
    body: 'Miss a day? No shame spiral. We make the comeback session tiny and doable, so consistency actually compounds.',
  },
  {
    icon: '🍳',
    title: 'Macros made human',
    body: 'Snap a meal or just describe it. Pulse estimates protein, carbs, and fat, then nudges you toward your goal — no food off-limits.',
  },
  {
    icon: '📈',
    title: 'Progress you can feel',
    body: 'PRs, recovery scores, and weekly trends in one glance. See momentum building before the mirror catches up.',
  },
]

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-5 py-24">
      <div className="max-w-2xl">
        <h2 className="font-display text-4xl font-bold tracking-tight">
          A coach in your pocket, <span className="text-gradient">not a spreadsheet.</span>
        </h2>
        <p className="mt-4 text-white/60">
          Everything you need to keep showing up — and nothing that makes it feel like a chore.
        </p>
      </div>
      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {features.map((f) => (
          <div
            key={f.title}
            className="glass rounded-4xl p-7 hover:border-lime/40 transition group"
          >
            <div className="text-3xl mb-4 group-hover:animate-floaty">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-2 text-white/60 leading-relaxed">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const stats = [
  { value: '40k+', label: 'active movers' },
  { value: '2.1M', label: 'workouts coached' },
  { value: '87%', label: 'still going at 90 days' },
  { value: '4.9★', label: 'average rating' },
]

function Stats() {
  return (
    <section id="stats" className="mx-auto max-w-6xl px-5 py-12">
      <div className="glass rounded-4xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-4xl font-bold text-gradient">{s.value}</p>
            <p className="mt-1 text-sm text-white/50">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const reviews = [
  {
    name: 'Maya R.',
    tag: 'down 9kg, up 2 pull-ups',
    quote:
      "It's the first thing that didn't make me feel behind. On bad days it just shrinks the workout instead of guilt-tripping me.",
  },
  {
    name: 'Devin K.',
    tag: '142-day streak',
    quote:
      'Talking to it genuinely feels like texting a mate who happens to be a great trainer. The streak thing is dangerously addictive.',
  },
  {
    name: 'Priya S.',
    tag: 'first 5k ever',
    quote:
      'The interval coaching during runs is wild — it paced me to my first 5k without stopping. I actually look forward to it now.',
  },
]

function Testimonials() {
  return (
    <section id="love" className="mx-auto max-w-6xl px-5 py-24">
      <h2 className="font-display text-4xl font-bold tracking-tight text-center">
        People who hate the gym <span className="text-gradient">kind of love this.</span>
      </h2>
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {reviews.map((r) => (
          <figure key={r.name} className="glass rounded-4xl p-7 flex flex-col">
            <div className="text-lime mb-3">★★★★★</div>
            <blockquote className="text-white/80 leading-relaxed flex-1">"{r.quote}"</blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <span className="h-9 w-9 rounded-full bg-gradient-to-br from-lime to-grape" />
              <span>
                <span className="block font-semibold text-sm">{r.name}</span>
                <span className="block text-xs text-white/40">{r.tag}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24">
      <div className="relative overflow-hidden rounded-4xl p-12 text-center bg-gradient-to-br from-lime/90 to-lime-soft text-ink-900">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-grape/30 blur-2xl" />
        <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight relative">
          Your strongest year starts today.
        </h2>
        <p className="mt-4 text-ink-900/70 max-w-md mx-auto relative">
          Free to start. No equipment required. Your coach is already warming up.
        </p>
        <Link
          to="/dashboard"
          className="relative inline-block mt-8 rounded-full bg-ink-900 text-white px-8 py-4 font-semibold hover:brightness-125 active:scale-95 transition"
        >
          Open the app
        </Link>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/5">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <Logo />
        <p>© {new Date().getFullYear()} {brand.name}. A demo build — not affiliated with any other brand.</p>
        <a href={`mailto:${brand.email}`} className="hover:text-white transition">
          {brand.email}
        </a>
      </div>
    </footer>
  )
}

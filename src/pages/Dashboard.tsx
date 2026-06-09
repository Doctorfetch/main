import { Link } from 'react-router-dom'
import { brand } from '../brand'
import ChatCoach from '../components/ChatCoach'

export default function Dashboard() {
  return (
    <div className="bg-aurora min-h-screen flex">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Topbar />
        <div className="p-5 sm:p-8 max-w-6xl mx-auto">
          <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-white/50 text-sm">Wednesday · {today()}</p>
              <h1 className="font-display text-3xl font-bold mt-1">
                Morning, Sam 👋 Let's bank a win.
              </h1>
            </div>
            <button className="rounded-full bg-lime text-ink-900 px-5 py-2.5 text-sm font-semibold hover:brightness-95 active:scale-95 transition">
              + Start workout
            </button>
          </header>

          <StatGrid />

          <div className="mt-6 grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <WeeklyChart />
              <Activity />
            </div>
            <div className="space-y-6">
              <RingCard />
              <ChatCoach compact />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

function today() {
  return new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long' })
}

const nav = [
  { icon: '🏠', label: 'Home', active: true },
  { icon: '🏋️', label: 'Workouts' },
  { icon: '🍳', label: 'Nutrition' },
  { icon: '📈', label: 'Progress' },
  { icon: '⚙️', label: 'Settings' },
]

function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-white/5 bg-ink-900/60 p-4 sticky top-0 h-screen">
      <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl px-2 py-3">
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
      <nav className="mt-6 space-y-1">
        {nav.map((n) => (
          <button
            key={n.label}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition ${
              n.active
                ? 'bg-white/[0.06] text-white font-medium'
                : 'text-white/50 hover:text-white hover:bg-white/[0.04]'
            }`}
          >
            <span>{n.icon}</span>
            {n.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto glass rounded-2xl p-4 text-sm">
        <p className="font-semibold">Go Pro 🔓</p>
        <p className="text-white/50 text-xs mt-1">Voice coaching + unlimited plans.</p>
        <button className="mt-3 w-full rounded-full bg-lime text-ink-900 py-2 text-xs font-semibold">
          Upgrade
        </button>
      </div>
    </aside>
  )
}

function Topbar() {
  return (
    <div className="md:hidden sticky top-0 z-30 backdrop-blur-xl bg-ink-900/70 border-b border-white/5 px-5 h-14 flex items-center justify-between">
      <Link to="/" className="font-display font-bold">{brand.name}</Link>
      <span className="h-8 w-8 rounded-full bg-gradient-to-br from-lime to-grape" />
    </div>
  )
}

const cards = [
  { label: 'Steps', value: '8,420', goal: 'of 10,000', pct: 84, tint: 'from-lime/30' },
  { label: 'Active kcal', value: '612', goal: 'of 700', pct: 87, tint: 'from-coral/30' },
  { label: 'Workouts', value: '4', goal: 'this week', pct: 80, tint: 'from-grape/30' },
  { label: 'Streak', value: '12🔥', goal: 'days', pct: 100, tint: 'from-lime/30' },
]

function StatGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <div key={c.label} className="glass rounded-3xl p-5 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${c.tint} to-transparent opacity-50`} />
          <div className="relative">
            <p className="text-white/50 text-sm">{c.label}</p>
            <p className="font-display text-3xl font-bold mt-1">{c.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{c.goal}</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-lime origin-left animate-grow"
                style={{ width: `${c.pct}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const week = [
  { d: 'Mon', v: 45 },
  { d: 'Tue', v: 0 },
  { d: 'Wed', v: 62 },
  { d: 'Thu', v: 30 },
  { d: 'Fri', v: 78 },
  { d: 'Sat', v: 52 },
  { d: 'Sun', v: 40 },
]

function WeeklyChart() {
  const max = Math.max(...week.map((w) => w.v))
  return (
    <div className="glass rounded-4xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-semibold text-lg">This week</h2>
          <p className="text-white/40 text-sm">Active minutes · 307 total</p>
        </div>
        <span className="text-xs text-lime glass rounded-full px-3 py-1">+18% vs last week</span>
      </div>
      <div className="flex items-end gap-3 h-44">
        {week.map((w) => (
          <div key={w.d} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex-1 flex items-end">
              <div
                className="w-full rounded-xl bg-gradient-to-t from-lime/40 to-lime origin-bottom animate-grow"
                style={{ height: `${max ? (w.v / max) * 100 : 2}%`, minHeight: '4px' }}
                title={`${w.v} min`}
              />
            </div>
            <span className="text-xs text-white/40">{w.d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const feed = [
  { icon: '🏃', title: 'Morning run', meta: '5.2 km · 28:14 · new PR', time: '7:05' },
  { icon: '🥤', title: 'Logged breakfast', meta: '38g protein · oats + whey', time: '8:20' },
  { icon: '💪', title: 'Upper body — push', meta: '6 exercises · 42 min', time: 'yesterday' },
  { icon: '😴', title: 'Recovery score', meta: '82 / 100 · well rested', time: 'yesterday' },
]

function Activity() {
  return (
    <div className="glass rounded-4xl p-6">
      <h2 className="font-semibold text-lg mb-4">Recent activity</h2>
      <ul className="space-y-2">
        {feed.map((f) => (
          <li
            key={f.title}
            className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/[0.04] transition"
          >
            <span className="h-10 w-10 grid place-items-center rounded-xl bg-white/[0.06] text-lg">
              {f.icon}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{f.title}</p>
              <p className="text-sm text-white/40 truncate">{f.meta}</p>
            </div>
            <span className="text-xs text-white/30 shrink-0">{f.time}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RingCard() {
  const pct = 78
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="glass rounded-4xl p-6 text-center">
      <h2 className="font-semibold text-lg mb-4">Today's goal</h2>
      <div className="relative inline-grid place-items-center">
        <svg width="140" height="140" className="-rotate-90">
          <circle cx="70" cy="70" r={r} stroke="rgba(255,255,255,0.08)" strokeWidth="12" fill="none" />
          <circle
            cx="70"
            cy="70"
            r={r}
            stroke="#C6FF3D"
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c - (pct / 100) * c}
          />
        </svg>
        <div className="absolute">
          <p className="font-display text-3xl font-bold">{pct}%</p>
          <p className="text-xs text-white/40">complete</p>
        </div>
      </div>
      <p className="text-sm text-white/50 mt-3">One short session and you're done. 💪</p>
    </div>
  )
}

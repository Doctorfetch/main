// Rule-based "coach" — a tiny front-end demo so the chat feels alive with no
// backend. Match keywords to a friendly, on-brand reply.
export type Msg = { id: string; from: 'coach' | 'user'; text: string }

type Rule = { test: RegExp; replies: string[] }

const rules: Rule[] = [
  {
    test: /(tired|exhaust|no energy|lazy|can.?t be bothered)/i,
    replies: [
      "Low battery day? Totally fine. Let's do a 10-min mobility flow instead of skipping. Showing up tired still counts. 🔋",
      'Rest is training too. Want a gentle stretch session, or a 7-min walk to shake it off?',
    ],
  },
  {
    test: /(leg|squat|lower body|glute)/i,
    replies: [
      "Leg day, let's go. 4 rounds: 12 goblet squats, 10 lunges/side, 15 hip thrusts. I'll rest-time you. 🦵",
      'Building those wheels. Warm up 5 min first, then we hit squats — I’ll cue your tempo.',
    ],
  },
  {
    test: /(run|cardio|5k|10k|jog)/i,
    replies: [
      "Cardio mode! Easy pace, conversational — if you can't talk, slow down. Intervals or a steady 25 min?",
      "Lace up. 5 min warm-up, then 6×1 min push / 90s float. Last 5k was 5:42/km — beat it. 🏃",
    ],
  },
  {
    test: /(eat|food|meal|protein|diet|calorie)/i,
    replies: [
      'Fuel matters. A palm of protein + a fist of carbs post-workout. Want a quick high-protein snack idea? 🍳',
      "No food is off-limits here. Let's just get protein in — you're at 64g today, target's 120g.",
    ],
  },
  {
    test: /(sore|hurt|pain|injur)/i,
    replies: [
      "Sharp pain = stop. Dull soreness = normal. Where's it bugging you? We'll swap the movement so you keep your streak. 🧊",
      "Let's protect that. I'll pull anything that loads it and sub in something safe.",
    ],
  },
  {
    test: /(streak|miss|skip|missed)/i,
    replies: [
      "One miss doesn't kill a streak — quitting does. You're on 12 days. Let's bank an easy win today. 🔥",
      'Consistency > perfection. A 5-min session keeps the chain alive. Down?',
    ],
  },
  {
    test: /(motivat|hard|give up|quit|hate)/i,
    replies: [
      "I've seen your last 3 weeks — you're stronger than you feel right now. Smallest step: put your shoes on. 👟",
      'Future-you is begging present-you to start. 10 minutes. That’s the whole ask.',
    ],
  },
  {
    test: /(hi|hey|hello|sup|yo)\b/i,
    replies: [
      'Hey! Ready to move today, or want me to plan something around how you’re feeling? 💪',
      'Yo! What’s the vibe — push hard, or keep it light and steady?',
    ],
  },
]

const fallback = [
  "Tell me how you're feeling and I'll build today's session around it. 💪",
  'I can plan a workout, count macros, or just hype you up. What do you need?',
  'Got it. Want me to turn that into a quick plan you can start right now?',
]

let i = 0
export function coachReply(input: string): string {
  for (const r of rules) {
    if (r.test.test(input)) return r.replies[i++ % r.replies.length]
  }
  return fallback[i++ % fallback.length]
}

export const quickReplies = [
  "I'm tired today 😮‍💨",
  'Plan a leg day',
  'Keep my streak?',
  'Protein idea',
]

export const uid = () => Math.random().toString(36).slice(2, 9)

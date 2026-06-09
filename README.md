# Pulse — AI Fitness Coach (demo)

An original fitness marketing site **and** dashboard built in a modern,
playful "AI-coach" design language: bold gradients, a chat-first interaction
model, and snappy micro-animations. Built from scratch — all branding, copy,
and visuals are original and not affiliated with any other product.

## Stack
- Vite + React + TypeScript
- Tailwind CSS
- React Router (`/` landing, `/dashboard` app)

## Run it
```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build -> dist/
npm run preview  # serve the build
```

## Rebrand in one place
Edit `src/brand.ts` to change the product name, tagline, coach name, etc.
Tune the palette/animations in `tailwind.config.js`.

## Structure
- `src/pages/Landing.tsx` — hero, features, stats, testimonials, CTA
- `src/pages/Dashboard.tsx` — stat cards, weekly chart, goal ring, activity feed
- `src/components/ChatCoach.tsx` — the interactive coach chat (rule-based demo)
- `src/data/coach.ts` — keyword → reply rules powering the chat

## Notes
The chat coach is a front-end-only demo (no backend / no real AI calls).
Swap `coachReply()` in `src/data/coach.ts` for a real API when you're ready.

import { useState } from 'react'
import { View, Text, Pressable, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import Logo from '@/components/Logo'
import { C, radius } from '@/pulse-theme'

type Step = {
  key: string
  title: string
  subtitle: string
  options: { label: string; emoji: string }[]
}

const steps: Step[] = [
  {
    key: 'goal',
    title: "What's your goal?",
    subtitle: 'No wrong answer — it just shapes how I coach you.',
    options: [
      { label: 'Lose fat', emoji: '🔥' },
      { label: 'Build muscle', emoji: '💪' },
      { label: 'Stay active', emoji: '🏃' },
      { label: 'Feel better', emoji: '🌱' },
    ],
  },
  {
    key: 'frequency',
    title: 'How often can you train?',
    subtitle: 'Be honest — consistency beats ambition.',
    options: [
      { label: '2–3 days', emoji: '🗓️' },
      { label: '4–5 days', emoji: '⚡' },
      { label: 'Every day', emoji: '🚀' },
    ],
  },
  {
    key: 'vibe',
    title: "What's your vibe?",
    subtitle: 'This sets how hard your coach pushes.',
    options: [
      { label: 'Chill', emoji: '🧘' },
      { label: 'Balanced', emoji: '⚖️' },
      { label: 'Beast mode', emoji: '🦾' },
    ],
  },
]

export default function Onboarding() {
  const router = useRouter()
  const [stage, setStage] = useState(0) // 0 = welcome, 1..n = questions, n+1 = ready
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const total = steps.length
  const isWelcome = stage === 0
  const isReady = stage === total + 1
  const step = steps[stage - 1]

  if (isWelcome) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.welcome}>
          <Logo size={40} />
          <Text style={styles.h1}>
            Your AI fitness coach that{'\n'}
            <Text style={{ color: C.lime }}>actually talks back.</Text>
          </Text>
          <Text style={styles.lead}>
            Adaptive workouts, macro tracking, and streaks that stick — built around how you
            feel, every day.
          </Text>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.cta} onPress={() => setStage(1)}>
            <Text style={styles.ctaText}>Get started</Text>
          </Pressable>
          <Text style={styles.fine}>Takes 20 seconds. No card needed.</Text>
        </View>
      </SafeAreaView>
    )
  }

  if (isReady) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.welcome}>
          <View style={{ flex: 1 }} />
          <Text style={{ fontSize: 64 }}>🎉</Text>
          <Text style={styles.h1}>Your coach is ready.</Text>
          <Text style={styles.lead}>
            {answers.goal ? `Goal: ${answers.goal}. ` : ''}
            {answers.vibe ? `Vibe: ${answers.vibe}. ` : ''}I’ll tailor every session to that.
          </Text>
          <View style={{ flex: 1 }} />
          <Pressable style={styles.cta} onPress={() => router.replace('/home')}>
            <Text style={styles.ctaText}>Meet Coach Atlas →</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    )
  }

  const selected = answers[step.key]
  const progress = (stage - 1) / total

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.qWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.max(progress, 0.06) * 100}%` }]} />
        </View>

        <Text style={styles.kicker}>
          Step {stage} of {total}
        </Text>
        <Text style={styles.h2}>{step.title}</Text>
        <Text style={styles.lead}>{step.subtitle}</Text>

        <ScrollView style={{ marginTop: 8 }} contentContainerStyle={{ gap: 12, paddingVertical: 12 }}>
          {step.options.map((o) => {
            const active = selected === o.label
            return (
              <Pressable
                key={o.label}
                onPress={() => setAnswers((a) => ({ ...a, [step.key]: o.label }))}
                style={[styles.option, active && styles.optionActive]}>
                <Text style={{ fontSize: 22 }}>{o.emoji}</Text>
                <Text style={[styles.optionLabel, active && { color: C.ink }]}>{o.label}</Text>
                {active && (
                  <Text style={{ marginLeft: 'auto', color: C.ink, fontWeight: '800' }}>✓</Text>
                )}
              </Pressable>
            )
          })}
        </ScrollView>

        <View style={styles.navRow}>
          <Pressable onPress={() => setStage((s) => s - 1)} style={styles.back}>
            <Text style={{ color: C.sub, fontWeight: '600' }}>Back</Text>
          </Pressable>
          <Pressable
            disabled={!selected}
            onPress={() => setStage((s) => s + 1)}
            style={[styles.cta, { flex: 1, opacity: selected ? 1 : 0.4 }]}>
            <Text style={styles.ctaText}>{stage === total ? 'Finish' : 'Continue'}</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  welcome: { flex: 1, padding: 28, paddingTop: 40 },
  qWrap: { flex: 1, padding: 24 },
  h1: { color: C.text, fontSize: 38, fontWeight: '800', letterSpacing: -1, marginTop: 28, lineHeight: 42 },
  h2: { color: C.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.5, marginTop: 18 },
  lead: { color: C.sub, fontSize: 16, lineHeight: 23, marginTop: 14 },
  kicker: { color: C.lime, fontSize: 13, fontWeight: '700', marginTop: 24, letterSpacing: 1, textTransform: 'uppercase' },
  cta: { backgroundColor: C.lime, paddingVertical: 17, borderRadius: radius.pill, alignItems: 'center' },
  ctaText: { color: C.ink, fontSize: 16, fontWeight: '800' },
  fine: { color: C.faint, fontSize: 13, textAlign: 'center', marginTop: 14 },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: radius.lg,
  },
  optionActive: { backgroundColor: C.lime, borderColor: C.lime },
  optionLabel: { color: C.text, fontSize: 17, fontWeight: '700' },
  progressTrack: { height: 6, backgroundColor: C.card, borderRadius: 999, overflow: 'hidden', marginTop: 8 },
  progressFill: { height: '100%', backgroundColor: C.lime, borderRadius: 999 },
  navRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingTop: 8 },
  back: { paddingVertical: 16, paddingHorizontal: 18 },
})

import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle } from 'react-native-svg'
import { C, radius } from '@/pulse-theme'

const cards = [
  { label: 'Steps', value: '8,420', goal: 'of 10,000', pct: 0.84 },
  { label: 'Active kcal', value: '612', goal: 'of 700', pct: 0.87 },
  { label: 'Workouts', value: '4', goal: 'this week', pct: 0.8 },
  { label: 'Streak', value: '12🔥', goal: 'days', pct: 1 },
]

const week = [
  { d: 'M', v: 45 },
  { d: 'T', v: 0 },
  { d: 'W', v: 62 },
  { d: 'T', v: 30 },
  { d: 'F', v: 78 },
  { d: 'S', v: 52 },
  { d: 'S', v: 40 },
]

const feed = [
  { icon: '🏃', title: 'Morning run', meta: '5.2 km · 28:14 · new PR' },
  { icon: '🥤', title: 'Logged breakfast', meta: '38g protein · oats + whey' },
  { icon: '💪', title: 'Upper body — push', meta: '6 exercises · 42 min' },
]

export default function Home() {
  const maxV = Math.max(...week.map((w) => w.v))
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 28, gap: 16 }}>
        <View>
          <Text style={styles.sub}>Wednesday · 9 June</Text>
          <Text style={styles.h1}>Morning, Sam 👋</Text>
          <Text style={styles.lead}>Let’s bank a win today.</Text>
        </View>

        {/* stat cards */}
        <View style={styles.grid}>
          {cards.map((c) => (
            <View key={c.label} style={styles.statCard}>
              <Text style={styles.statLabel}>{c.label}</Text>
              <Text style={styles.statValue}>{c.value}</Text>
              <Text style={styles.statGoal}>{c.goal}</Text>
              <View style={styles.bar}>
                <View style={[styles.barFill, { width: `${c.pct * 100}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* goal ring */}
        <View style={[styles.card, { flexDirection: 'row', alignItems: 'center', gap: 18 }]}>
          <Ring pct={0.78} />
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Today’s goal</Text>
            <Text style={styles.lead}>78% complete — one short session and you’re done. 💪</Text>
          </View>
        </View>

        {/* weekly chart */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.cardTitle}>This week</Text>
            <Text style={styles.badge}>+18%</Text>
          </View>
          <Text style={styles.lead}>Active minutes · 307 total</Text>
          <View style={styles.chart}>
            {week.map((w, i) => (
              <View key={i} style={styles.chartCol}>
                <View style={styles.chartTrack}>
                  <View
                    style={[styles.chartBar, { height: `${Math.max((w.v / maxV) * 100, 3)}%` }]}
                  />
                </View>
                <Text style={styles.chartLabel}>{w.d}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* activity */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent activity</Text>
          <View style={{ gap: 6, marginTop: 8 }}>
            {feed.map((f) => (
              <View key={f.title} style={styles.feedRow}>
                <View style={styles.feedIcon}>
                  <Text style={{ fontSize: 18 }}>{f.icon}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.feedTitle}>{f.title}</Text>
                  <Text style={styles.feedMeta}>{f.meta}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

function Ring({ pct }: { pct: number }) {
  const size = 92
  const stroke = 11
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={r} stroke={C.card} strokeWidth={stroke} fill="none" />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={C.lime}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={circ * (1 - pct)}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  sub: { color: C.sub, fontSize: 14 },
  h1: { color: C.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.5, marginTop: 4 },
  lead: { color: C.sub, fontSize: 15, lineHeight: 21, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  statCard: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: radius.lg,
    padding: 16,
  },
  statLabel: { color: C.sub, fontSize: 13 },
  statValue: { color: C.text, fontSize: 26, fontWeight: '800', marginTop: 2 },
  statGoal: { color: C.faint, fontSize: 12, marginTop: 1 },
  bar: { height: 6, backgroundColor: 'rgba(255,255,255,0.10)', borderRadius: 999, marginTop: 10, overflow: 'hidden' },
  barFill: { height: '100%', backgroundColor: C.lime, borderRadius: 999 },
  card: {
    backgroundColor: C.card,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: radius.lg,
    padding: 18,
  },
  cardTitle: { color: C.text, fontSize: 17, fontWeight: '700' },
  rowBetween: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { color: C.lime, fontSize: 12, fontWeight: '700', backgroundColor: 'rgba(198,255,61,0.1)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, overflow: 'hidden' },
  chart: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 120, marginTop: 16 },
  chartCol: { flex: 1, alignItems: 'center', gap: 6, height: '100%' },
  chartTrack: { flex: 1, width: '100%', justifyContent: 'flex-end' },
  chartBar: { width: '100%', backgroundColor: C.lime, borderRadius: 8, minHeight: 4 },
  chartLabel: { color: C.faint, fontSize: 11 },
  feedRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  feedIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  feedTitle: { color: C.text, fontSize: 15, fontWeight: '600' },
  feedMeta: { color: C.faint, fontSize: 13, marginTop: 1 },
})

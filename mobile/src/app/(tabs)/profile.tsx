import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import PixelAvatar from '@/components/PixelAvatar'
import { C, radius } from '@/pulse-theme'

const stats = [
  { label: 'Day streak', value: '12' },
  { label: 'Workouts', value: '48' },
  { label: 'PRs', value: '7' },
]

const rows: { icon: keyof typeof Ionicons.glyphMap; label: string }[] = [
  { icon: 'barbell', label: 'My plan' },
  { icon: 'notifications', label: 'Reminders' },
  { icon: 'heart', label: 'Connected apps' },
  { icon: 'shield-checkmark', label: 'Privacy' },
  { icon: 'help-circle', label: 'Help & support' },
]

export default function Profile() {
  const router = useRouter()
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32, gap: 16 }}>
        <Text style={styles.h1}>Profile</Text>

        <View style={[styles.card, { alignItems: 'center', paddingVertical: 24 }]}>
          <View style={styles.avatarWrap}>
            <PixelAvatar seed={0} size={72} />
          </View>
          <Text style={styles.name}>Sam Rivera</Text>
          <Text style={styles.sub}>Beast mode · Build muscle</Text>
          <View style={styles.statRow}>
            {stats.map((s) => (
              <View key={s.label} style={styles.statItem}>
                <Text style={styles.statValue}>{s.value}</Text>
                <Text style={styles.statLabel}>{s.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Pro upsell */}
        <View style={styles.pro}>
          <Text style={styles.proTitle}>Go Pro 🔓</Text>
          <Text style={styles.proSub}>Voice coaching, unlimited plans, and deeper insights.</Text>
          <Pressable style={styles.proBtn}>
            <Text style={styles.proBtnText}>Upgrade</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          {rows.map((r, i) => (
            <Pressable
              key={r.label}
              style={[styles.row, i < rows.length - 1 && styles.rowBorder]}>
              <Ionicons name={r.icon} size={20} color={C.grapeSoft} />
              <Text style={styles.rowLabel}>{r.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={C.faint} style={{ marginLeft: 'auto' }} />
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.signOut} onPress={() => router.replace('/')}>
          <Text style={{ color: C.coral, fontWeight: '700' }}>Restart onboarding</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  h1: { color: C.text, fontSize: 30, fontWeight: '800', letterSpacing: -0.5 },
  card: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderRadius: radius.lg, padding: 18 },
  avatarWrap: { padding: 10, backgroundColor: C.cardSolid, borderRadius: 18, borderWidth: 1, borderColor: C.border },
  name: { color: C.text, fontSize: 22, fontWeight: '800', marginTop: 12 },
  sub: { color: C.sub, fontSize: 14, marginTop: 3 },
  statRow: { flexDirection: 'row', gap: 28, marginTop: 18 },
  statItem: { alignItems: 'center' },
  statValue: { color: C.lime, fontSize: 24, fontWeight: '800' },
  statLabel: { color: C.faint, fontSize: 12, marginTop: 2 },
  pro: { backgroundColor: C.lime, borderRadius: radius.lg, padding: 20 },
  proTitle: { color: C.ink, fontSize: 19, fontWeight: '800' },
  proSub: { color: 'rgba(10,10,15,0.7)', fontSize: 14, marginTop: 4 },
  proBtn: { backgroundColor: C.ink, borderRadius: 999, paddingVertical: 12, alignItems: 'center', marginTop: 14 },
  proBtnText: { color: C.text, fontWeight: '800' },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 15 },
  rowBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  rowLabel: { color: C.text, fontSize: 16, fontWeight: '500' },
  signOut: { alignItems: 'center', paddingVertical: 14 },
})

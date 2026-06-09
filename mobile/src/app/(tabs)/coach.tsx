import { useRef, useState } from 'react'
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { C, radius } from '@/pulse-theme'
import { coachReply, quickReplies, uid, type Msg } from '@/lib/coach'

export default function Coach() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      id: uid(),
      from: 'coach',
      text: "Hey, I'm Coach Atlas 👋 Your move today is whatever you've got energy for. How are you feeling?",
    },
  ])
  const [draft, setDraft] = useState('')
  const [typing, setTyping] = useState(false)
  const scrollRef = useRef<ScrollView>(null)

  function send(text: string) {
    const t = text.trim()
    if (!t) return
    setMsgs((m) => [...m, { id: uid(), from: 'user', text: t }])
    setDraft('')
    setTyping(true)
    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50)
    const delay = 600 + Math.min(t.length * 18, 1100)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: uid(), from: 'coach', text: coachReply(t) }])
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50)
    }, delay)
  }

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      {/* header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={{ color: C.ink, fontWeight: '800' }}>A</Text>
        </View>
        <View>
          <Text style={styles.name}>Coach Atlas</Text>
          <Text style={styles.status}>online · ready when you are</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={8}>
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 10 }}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}>
          {msgs.map((m) => (
            <View
              key={m.id}
              style={[styles.bubble, m.from === 'user' ? styles.mine : styles.theirs]}>
              <Text style={[styles.bubbleText, m.from === 'user' && { color: C.ink }]}>
                {m.text}
              </Text>
            </View>
          ))}
          {typing && (
            <View style={[styles.bubble, styles.theirs, { flexDirection: 'row', gap: 5 }]}>
              {[0, 1, 2].map((i) => (
                <View key={i} style={styles.dot} />
              ))}
            </View>
          )}
        </ScrollView>

        {/* quick replies */}
        <View style={styles.quickRow}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingHorizontal: 12, alignItems: 'center' }}>
            {quickReplies.map((q) => (
              <Pressable key={q} style={styles.chip} onPress={() => send(q)}>
                <Text style={styles.chipText}>{q}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* composer */}
        <View style={styles.composer}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Message your coach…"
            placeholderTextColor={C.faint}
            style={styles.input}
            onSubmitEditing={() => send(draft)}
            returnKeyType="send"
          />
          <Pressable style={styles.sendBtn} onPress={() => send(draft)}>
            <Ionicons name="send" size={18} color={C.ink} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center' },
  name: { color: C.text, fontSize: 16, fontWeight: '700' },
  status: { color: C.lime, fontSize: 12 },
  bubble: { maxWidth: '82%', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 20 },
  theirs: { alignSelf: 'flex-start', backgroundColor: C.card, borderWidth: 1, borderColor: C.border, borderBottomLeftRadius: 6 },
  mine: { alignSelf: 'flex-end', backgroundColor: C.lime, borderBottomRightRadius: 6 },
  bubbleText: { color: C.text, fontSize: 15, lineHeight: 21 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: C.sub },
  quickRow: { height: 52, justifyContent: 'center' },
  chip: { backgroundColor: C.card, borderWidth: 1, borderColor: C.border, paddingHorizontal: 14, paddingVertical: 9, borderRadius: 999 },
  chipText: { color: C.text, fontSize: 13 },
  composer: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 12, borderTopWidth: 1, borderTopColor: C.border },
  input: { flex: 1, backgroundColor: C.cardSolid, borderRadius: 999, paddingHorizontal: 18, paddingVertical: 12, color: C.text, fontSize: 15 },
  sendBtn: { width: 46, height: 46, borderRadius: 23, backgroundColor: C.lime, alignItems: 'center', justifyContent: 'center' },
})

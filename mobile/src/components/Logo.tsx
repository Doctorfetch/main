import { View, Text } from 'react-native'
import Svg, { Path } from 'react-native-svg'
import { C } from '@/pulse-theme'

export default function Logo({ size = 28, showText = true }: { size?: number; showText?: boolean }) {
  const box = size * 1.15
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
      <View
        style={{
          width: box,
          height: box,
          borderRadius: box * 0.28,
          backgroundColor: C.lime,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Svg width={size * 0.7} height={size * 0.7} viewBox="0 0 32 32">
          <Path
            d="M4 17h6l2-6 4 12 3-9 2 3h7"
            fill="none"
            stroke={C.ink}
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
      {showText && (
        <Text style={{ color: C.text, fontSize: size * 0.78, fontWeight: '800', letterSpacing: -0.5 }}>
          Pulse
        </Text>
      )}
    </View>
  )
}

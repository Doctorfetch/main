// Original pixel-art character busts, drawn from a small character grid so they
// scale crisply at any size. Palette varies per variant.
const GRID = [
  '            ',
  '    HHHH    ',
  '   HHHHHH   ',
  '  HHFFFFHH  ',
  '  HFFFFFFH  ',
  '  HFEFFEFH  ',
  '  HFFFFFFH  ',
  '  HFFMMFFH  ',
  '   FFFFFF   ',
  '   SSSSSS   ',
  '  SSSWWSSS  ',
  '  SSSSSSSS  ',
]

type Palette = { H: string; F: string; S: string; E: string; M: string; W: string }

const palettes: Palette[] = [
  { H: '#2b1a0f', F: '#f1c27d', S: '#7C5CFF', E: '#0A0A0F', M: '#b14b4b', W: '#A78BFA' },
  { H: '#0f0f0f', F: '#8d5524', S: '#C6FF3D', E: '#0A0A0F', M: '#7a3b2e', W: '#0A0A0F' },
  { H: '#7a3b12', F: '#ffdbac', S: '#FF6B6B', E: '#0A0A0F', M: '#9c4a4a', W: '#ffd0d0' },
  { H: '#3a2c5a', F: '#e0ac69', S: '#22d3a8', E: '#0A0A0F', M: '#8a4242', W: '#0A0A0F' },
]

export default function PixelAvatar({ seed = 0, size = 44 }: { seed?: number; size?: number }) {
  const p = palettes[seed % palettes.length]
  const cols = GRID[0].length
  const rows = GRID.length
  const rects: JSX.Element[] = []
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const c = GRID[y][x] as keyof Palette
      const fill = p[c]
      if (!fill) continue
      rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />)
    }
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      style={{ imageRendering: 'pixelated' }}
      className="rounded-lg bg-ink-700 ring-1 ring-white/10"
      role="img"
      aria-label="Pixel-art portrait"
    >
      {rects}
    </svg>
  )
}

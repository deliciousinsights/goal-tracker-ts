// Jauge (composant partagé)
// =========================

import LinearProgress from '@mui/material/LinearProgress'

type GaugeProps = {
  max?: number
  value: number
}

export default function Gauge({ max = 100, value }: GaugeProps) {
  return (
    <LinearProgress
      style={{ height: 8 }}
      variant='determinate'
      value={normalize(value, max)}
    />
  )
}

function normalize(value: number, max: number) {
  return Math.min(value * (100 / max), 100)
}

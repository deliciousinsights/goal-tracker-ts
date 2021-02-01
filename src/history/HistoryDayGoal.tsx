// Journée historique d’un objectif
// ================================

// Sous-section de l'écran d’historique, dédiée à un objectif sur un jour
// précis.  Rendu en fait à l'intérieur d'un autre composant bête: `HistoryDay`.

import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import Gauge from '../shared/Gauge'
import type { Goal } from '../reducers/goals'

interface HDGProps {
  goal: Goal
  stats: [progress: number, target: number]
}

// La déstructuration et les valeurs par défaut en force !
export default function HistoryDayGoal({
  goal: { name, units },
  stats: [progress, target],
}: HDGProps) {
  const details = (
    <div>
      <Gauge value={progress} max={target} />
      {progress} {units} sur {target}
    </div>
  )

  return (
    <ListItem>
      <ListItemText
        primary={name}
        secondary={details}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  )
}

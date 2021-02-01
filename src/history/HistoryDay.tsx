// Journée d’historique
// ====================

// Section de l'écran d’historique, dédiée à un jour précis.

import Divider from '@mui/material/Divider'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'

import { formatDate } from '../lib/helpers'
import type { Goal } from '../reducers/goals'
import HistoryDayGoal from './HistoryDayGoal'
import type { HistoryEntry } from '../reducers/history'

type HDProps = {
  goals: Goal[]
  stats: HistoryEntry
}

export default function HistoryDay({
  goals,
  stats: { date, progresses },
}: HDProps) {
  return (
    <div>
      <Divider />
      <List>
        <Typography variant='subtitle1'>{formatDate(date)}</Typography>
        {goals.map((goal) => {
          const goalStats = progresses[goal.id]
          if (goalStats) {
            return (
              <HistoryDayGoal key={goal.id} goal={goal} stats={goalStats} />
            )
          }
          return null
        })}
      </List>
    </div>
  )
}

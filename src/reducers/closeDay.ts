import { createAction, createReducer } from '@reduxjs/toolkit'

import type { HistoryEntry } from './history'
import { isoDate } from '../lib/helpers'
import type { RootState } from '../store'

// Action Creators
// ---------------

export const closeDay = createAction(
  'goal-tracker/closeDay/closeDay',
  ({ date = new Date() } = {}) => ({
    payload: { date },
  })
)

// Réducteur
// ---------

export default createReducer<RootState>({} as RootState, (builder) => {
  builder.addCase(closeDay, (state, { payload }) => {
    state.history = tallyPreviousDay(state)
    state.today = isoDate(payload.date)
    state.todaysProgress = {}
  })
})

// Calcul de l’historisation
// -------------------------

function tallyPreviousDay({
  goals,
  history,
  today,
  todaysProgress,
}: RootState) {
  const progresses: HistoryEntry['progresses'] = {}
  for (const { id, target } of goals) {
    const progress = todaysProgress[id] || 0
    if (progress > 0) {
      progresses[id] = [progress, target]
    }
  }

  if (Object.keys(progresses).length === 0) {
    return history
  }

  return [{ date: today, progresses }, ...history]
}

import { createAction, createReducer } from '@reduxjs/toolkit'

export type HistoryEntry = {
  date: string
  progresses: {
    [goalId: string]: [progress: number, target: number]
  }
}

// Action Creators
// ---------------

export const clearHistory = createAction('goal-tracker/history/clearHistory')

// Réducteur
// ---------

export default createReducer<HistoryEntry[]>([], (builder) => {
  builder.addCase(clearHistory, () => [])
})

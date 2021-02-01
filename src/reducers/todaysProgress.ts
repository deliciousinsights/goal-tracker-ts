import { createAction, createReducer } from '@reduxjs/toolkit'

export type TodaysProgress = {
  [goalId: string]: number
}

// Action Creators
// ---------------

type POGPayload = { goalId: string; increment?: number }

export const progressOnGoal = createAction(
  'goal-tracker/todaysProgress/progressOnGoal',
  ({ goalId, increment = 1 }: POGPayload) => ({
    payload: { goalId, increment: Number(increment) || 0 },
  })
)

// Réducteur
// ---------

export default createReducer<TodaysProgress>({}, (builder) => {
  builder.addCase(
    progressOnGoal,
    (state, { payload: { goalId, increment } }) => {
      const previous = state[goalId] || 0
      state[goalId] = previous + increment
    }
  )
})

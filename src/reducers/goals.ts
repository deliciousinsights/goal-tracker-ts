import { createAction, createReducer } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

export type Goal = {
  id: string
  name: string
  target: number
  units: string
}

// Action Creators
// ---------------

export const addGoal = createAction(
  'goal-tracker/goals/addGoal',
  (payload: Omit<Goal, 'id'>) => ({
    payload: { ...payload, id: ObjectID().toHexString() },
  })
)

export const removeGoal = createAction<Pick<Goal, 'id'>>(
  'goal-tracker/goals/removeGoal'
)

export const updateGoal = createAction<Goal>('goal-tracker/goals/updateGoal')

// Réducteur
// ---------

export default createReducer<Goal[]>([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      state.push(payload)
    })
    .addCase(removeGoal, (state, { payload }) => {
      // FIXME
    })
    .addCase(updateGoal, (state, action) => {
      // FIXME
    })
})

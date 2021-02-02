// Objectifs (reducer)
// ===================

import { createAction, createReducer } from '@reduxjs/toolkit'
import ObjectID from 'bson-objectid'

// *(Structuration de type
// [Ducks](https://github.com/erikras/ducks-modular-redux))*

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

// Par défaut, `goals` vaut `[]` (pas d’objectifs définis)
export default createReducer<Goal[]>([], (builder) => {
  builder
    .addCase(addGoal, (state, { payload }) => {
      // Remarquez que grâce à l'enrobage automatique de nos réducteurs par
      // Immer, on peut se payer le luxe d'utiliser du code mutatif si c'est
      // plus simple, sans perdre en immuabilité réelle !
      state.push(payload)
    })
    .addCase(removeGoal, (state, { payload }) => {
      // Ici et en-dessous en revanche, l'approche immuable, à base de `filter`
      // et de `map`, est plus concise qu'une approche mutative, alors pourquoi
      // s'en priver ?
      return state.filter(({ id }) => id !== payload.id)
    })
    .addCase(updateGoal, (state, { payload }) => {
      return state.map((goal) => (goal.id === payload.id ? payload : goal))
    })
})

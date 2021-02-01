import { createAction, createReducer } from '@reduxjs/toolkit'

import type { RootState } from '../store'

// Types d’actions
// ---------------

export const closeDay = createAction('goal-tracker/closeDay/closeDay')

// Réducteur
// ---------

export default createReducer<RootState>({} as RootState, (builder) => {
  builder.addCase(closeDay, (state, action) => {
    // FIXME
  })
})

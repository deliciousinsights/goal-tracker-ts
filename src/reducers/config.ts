import { createReducer } from '@reduxjs/toolkit'
// @ts-ignore
import { REHYDRATE } from 'redux-persist/constants'

type Config = { rehydrated: boolean }

export default createReducer<Config>({ rehydrated: false }, (builder) => {
  builder.addCase(REHYDRATE, (state) => {
    state.rehydrated = true
  })
})

import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
// @ts-ignore
import { REHYDRATE } from 'redux-persist/constants'

type Config = {
  canPromptForNotify: boolean
  canNotify: boolean
  rehydrated: boolean
}

const bootNotificationPermission =
  (typeof window !== 'undefined' && window.Notification?.permission) || 'denied'

// Action Creators
// ---------------

export const requestNotificationPermission = createAsyncThunk(
  'goal-tracker/config/requestNotificationPermission',
  async () => {
    if (bootNotificationPermission === 'denied') {
      return 'denied'
    }

    return window.Notification.requestPermission()
  }
)

// Réducteur
// ---------

export default createReducer<Config>(
  {
    canPromptForNotify: bootNotificationPermission === 'default',
    canNotify: bootNotificationPermission === 'granted',
    rehydrated: false,
  },
  (builder) => {
    builder
      .addCase(REHYDRATE, (state) => {
        state.rehydrated = true
      })
      .addCase(
        requestNotificationPermission.fulfilled,
        (state, { payload: status }) => {
          state.canPromptForNotify = status === 'default'
          state.canNotify = status === 'granted'
        }
      )
  }
)

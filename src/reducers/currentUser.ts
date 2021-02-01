import { createAction, createReducer } from '@reduxjs/toolkit'

export type UserInfo =
  | { loginState: 'logged-out' | 'pending' | 'failure' }
  | { loginState: 'logged-in'; email: string }

// Action Creators
// ---------------

export function logIn(payload: { email: string; password: string }) {
  return {
    type: logInStart.toString(),
    meta: {
      offline: {
        effect: {
          json: payload,
          method: 'POST',
          url: `http://${window.location.hostname}:3001/api/v1/sessions`,
        },
        commit: { type: logInSuccess.toString() },
        rollback: { type: logInFailure.toString() },
      },
    },
  }
}

export const logInStart = createAction('goal-tracker/currentUser/logInStart')
export const logInSuccess = createAction<{ email: string }>(
  'goal-tracker/currentUser/logInSuccess'
)
export const logInFailure = createAction(
  'goal-tracker/currentUser/logInFailure'
)
export const logOut = createAction('goal-tracker/currentUser/logOut')

// Réducteur
// ---------

export default createReducer<UserInfo>(
  { loginState: 'logged-out' },
  (builder) => {
    builder
      .addCase(logInStart, () => ({ loginState: 'pending' }))
      .addCase(logInFailure, () => ({ loginState: 'failure' }))
      .addCase(logInSuccess, (state, { payload: { email } }) => ({
        loginState: 'logged-in',
        email,
      }))
      .addCase(logOut, () => ({ loginState: 'logged-out' }))
  }
)

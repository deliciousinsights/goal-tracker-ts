import { createAction, createReducer } from '@reduxjs/toolkit'

export type UserInfo =
  | { loginState: 'logged-out' | 'pending' | 'failure' }
  | { loginState: 'logged-in'; email: string }

// Action Creators
// ---------------

export const logIn = createAction<{ email: string; password: string }>(
  'goal-tracker/currentUser/login'
)
export const logOut = createAction('goal-tracker/currentUser/logOut')

// Réducteur
// ---------

export default createReducer<UserInfo>(
  { loginState: 'logged-out' },
  (builder) => {
    builder
      .addCase(logIn, (state, { payload: { email } }) => ({
        loginState: 'logged-in',
        email,
      }))
      .addCase(logOut, () => ({ loginState: 'logged-out' }))
  }
)

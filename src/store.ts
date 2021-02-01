// État applicatif
// ===============

import { configureStore } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import DEFAULT_STATE from './default-state'
import goalTrackerReducer from './reducers'

export type RootState = ReturnType<typeof goalTrackerReducer>

const state = (
  process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE
) as RootState

export function makeStore(preloadedState = state) {
  const store = configureStore({
    preloadedState,
    reducer: goalTrackerReducer,
  })

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(goalTrackerReducer)
    )
  }

  return store
}

const store = makeStore()

type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store

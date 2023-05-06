import { combineReducers } from 'redux'
import type { Reducer } from 'redux'
import reduceReducers from 'reduce-reducers'

import config from './config'
import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import reduceCloseDay from './closeDay'
import today from './today'
import todaysProgress from './todaysProgress'

const coreReducer = combineReducers({
  config,
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

export type RootState = ReturnType<typeof coreReducer>

const goalTrackerReducer = reduceReducers(
  coreReducer,
  reduceCloseDay
) as Reducer<RootState>

export default goalTrackerReducer

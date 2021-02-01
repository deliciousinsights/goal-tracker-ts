// État applicatif
// ===============

import DEFAULT_STATE from './default-state'
import type { Goal } from './reducers/goals'
import type { UserInfo } from './reducers/currentUser'

export type RootState = {
  currentUser: UserInfo
  goals: Goal[]
  today: string
  todaysProgress: TodaysProgress
  history: HistoryEntry[]
}

const state = (
  process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE
) as RootState

export default state

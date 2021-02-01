// État applicatif
// ===============

import DEFAULT_STATE from './default-state'

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

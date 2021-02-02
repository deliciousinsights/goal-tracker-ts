// Historisation quotidienne (tests)
// =================================

import { isoDate } from '../lib/helpers'
import { mockGoal } from '../testHelpers'
import reducer, { closeDay } from './closeDay'
import type { RootState } from '../store'

// Le *reducer* est censé…
describe('Close Day reducer', () => {
  // …historiser la journée courante
  // -------------------------------
  //
  // (calcul des données à historiser, ajout en début d’historique,
  // réinitialisation des données du jour courant)
  it('should properly add the current progressions to the history and reset for a new day', () => {
    const initialState: RootState = {
      config: { canNotify: false, canPromptForNotify: true, rehydrated: true },
      currentUser: { loginState: 'logged-in', email: 'john@example.com' },
      goals: [
        mockGoal({ id: '1', target: 5 }),
        mockGoal({ id: '2', target: 10 }),
        mockGoal({ id: '3', target: 15 }),
      ],
      history: [{ date: '2017-02-16', progresses: { 1: [2, 5] } }],
      today: '2017-02-17',
      todaysProgress: { 2: 4, 3: 10 },
    }

    const expectedState = {
      ...initialState,
      history: [
        { date: initialState.today, progresses: { 2: [4, 10], 3: [10, 15] } },
        ...initialState.history,
      ],
      today: isoDate(new Date()),
      todaysProgress: {},
    }

    expect(reducer(initialState, closeDay())).toEqual(expectedState)
  })
})

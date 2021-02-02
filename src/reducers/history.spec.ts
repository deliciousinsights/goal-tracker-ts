// Historique (tests)
// ==================

import type { HistoryEntry } from './history'
import { isoDate } from '../lib/helpers'
import reducer, { clearHistory } from './history'

// Le *reducer* est censé…
describe('History reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState: HistoryEntry[] = []

    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple
    // consiste à envoyer un état `undefined` et une action de type inconnu, et
    // à vérifier le résultat (ici, un historique vide).
    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  // …gérer l’effacement
  // -------------------
  it('should handle clearing', () => {
    const initialState = [
      mockHistoryEntry({ date: '2022-10-04' }),
      mockHistoryEntry({ date: '2022-10-03' }),
      mockHistoryEntry({ date: '2022-10-02' }),
    ]
    const expectedState: HistoryEntry[] = []

    expect(reducer(initialState, clearHistory())).toEqual(expectedState)
  })
})

// Utilitaires internes
// --------------------

function mockHistoryEntry(data: Partial<HistoryEntry>): HistoryEntry {
  return {
    date: isoDate(new Date()),
    progresses: { '0': [1, 1] },
    ...data,
  }
}

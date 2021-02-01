import type { Goal } from './goals'
import reducer, { addGoal, removeGoal, updateGoal } from './goals'

describe('Goals reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState: Goal[] = []

    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  it.todo('should handle goal addition')

  it.todo('should handle goal removal')

  it.todo('should handle goal update (when in goals)')
})

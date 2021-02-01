// Utilitaires de tests
// --------------------

import ObjectID from 'bson-objectid'

import type { Goal } from './reducers/goals'

export function mockGoal(data: Partial<Goal>) {
  return {
    id: ObjectID().toHexString(),
    name: 'A goal',
    target: 1,
    units: 'units',
    ...data,
  }
}

// Utilitaires de tests
// --------------------

import ObjectID from 'bson-objectid'

import type { Goal } from './reducers/goals'

// Avec TS, on ne peut pas se contenter de poser des objets littéraux
// singletons, à la volée, partiels, pour nos tests.  Il faut que ça ait "une
// tête de Goal" au final, d'où ce mocker partagé.
export function mockGoal(data: Partial<Goal>) {
  return {
    id: ObjectID().toHexString(),
    name: 'A goal',
    target: 1,
    units: 'units',
    ...data,
  }
}

// Date du jour (reducer)
// ======================

import type { AnyAction } from 'redux'

import { isoDate } from '../lib/helpers'

// Aucune action particulière, ce réducteur est uniquement là pour la valeur par
// défaut de la tranche.
export default function today(
  state: string = isoDate(new Date()),
  action: AnyAction
) {
  return state
}

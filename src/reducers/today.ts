import type { AnyAction } from 'redux'

import { isoDate } from '../lib/helpers'

export default function today(
  state: string = isoDate(new Date()),
  action: AnyAction
) {
  return state
}

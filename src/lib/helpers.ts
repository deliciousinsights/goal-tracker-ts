// Utilitaires
// ===========

import { differenceInCalendarDays, formatISO } from 'date-fns'

import type { Goal } from '../reducers/goals'
import type { TodaysProgress } from '../reducers/todaysProgress'

const FORMATTERS = {
  full: new Intl.DateTimeFormat('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
  medium: new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }),
}

type FormatterKey = keyof typeof FORMATTERS

const SPECIAL_FORMATS = ['Aujourd’hui', 'Hier', 'Avant-hier']

/**
 * Formatage de date de façon “pratique”.
 *
 * Si un format est passé (`String`), il est utilisé directement (c’est le cas
 * pour le titre de `TrackerScreen` par exemple, qui utilise le code de format
 * local semi-long `'medium'`), sinon on utilise des textes spéciaux pour
 * aujourd’hui, hier et avant-hier, et des formats longs pour toute date autre.
 *
 * @export
 * @param {Date | string} date - La date à formater
 * @param {FormatterKey | null} [format] - Le format (optionnel)
 * @param {Object} [options]
 * @param {Date | string } [options.refDate=new Date()] - La date de référence à
 * utiliser comme point de comparaison pour les textes spéciaux.
 * @return {String} La date formatée.
 */
export function formatDate(
  date: Date | string,
  format?: FormatterKey | null,
  { refDate = new Date() }: { refDate?: Date | string } = {}
) {
  if (typeof date === 'string') {
    date = new Date(date)
  }
  if (typeof refDate === 'string') {
    refDate = new Date(refDate)
  }
  if (format) {
    return FORMATTERS[format].format(date)
  }
  const diff = differenceInCalendarDays(refDate, date)
  return SPECIAL_FORMATS[diff] || FORMATTERS.full.format(date)
}

/**
 * Calcule les totaux de progression et d’objectifs sur la journée, pour
 * déterminer ensuite par exemple le taux global de progression, ou le retard
 * potentiel (avec des données résultats permettant de l’affiche de façon
 * explicite).
 *
 * @export
 * @param {TodaysProgress} todaysProgress - La progression du jour
 * @param {Goal[]} goals - Les définitions d'objectifs
 * @return {{ totalProgress: number, totalTarget: number }} - La progression
 * totale et l'objectif consolidé.
 */
export function getDayCounts(todaysProgress: TodaysProgress, goals: Goal[]) {
  let [totalProgress, totalTarget] = [0, 0]

  for (const { id, target } of goals) {
    totalProgress += todaysProgress[id] || 0
    totalTarget += target
  }

  return { totalProgress, totalTarget }
}

/**
 * Formate une date au format ISO8601 (YYYY-MM-DD)
 *
 * @export
 * @param {Date} date - La date à formater
 * @return {String} La date formatée
 */
export function isoDate(date: Date) {
  return formatISO(date, { representation: 'date' })
}

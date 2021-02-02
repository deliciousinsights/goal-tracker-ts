// Configuration "système" de l'appli
// ==================================
//
// En écoutant l'action de réhydratation de redux-persist, nous pouvons
// maintenir un drapeau la signifiant, ce qui permettra à notre petit composant
// `RehydrationWaiter` de retenir le rendu initial jusqu'à ce moment-là.
//
// On traite également ici les permissions de notification, tant leur état
// initial (et la dispo de l'API) que la demande ultérieure de la permission,
// dans une [action asynchrone
// générique](https://redux-toolkit.js.org/usage/usage-guide#async-requests-with-createasyncthunk),
// traitée grâce au middleware Redux approprié préconfiguré par Redux Toolkit.

import { createAsyncThunk, createReducer } from '@reduxjs/toolkit'
// Redux-Persist ne semble pas exporter de types pour ses constantes, donc…
// @ts-ignore
import { REHYDRATE } from 'redux-persist/constants'

type Config = {
  // - Est-il pertinent de solliciter l'utilisateur ?
  canPromptForNotify: boolean
  // - Dispose-t-on de la permission de notifier ?
  canNotify: boolean
  // - L'état a-t-il été réhydraté par Redux-Persist ?
  rehydrated: boolean
}

const bootNotificationPermission =
  (typeof window !== 'undefined' && window.Notification?.permission) || 'denied'

// Action Creators
// ---------------

// Dispatché par l'UI, déclenche la demande de permission.  Chromium n'exige pas
// pour le moment que ces demandes soient faites au sein d'une interaction
// utilisateur, mais Firefox si.
export const requestNotificationPermission = createAsyncThunk(
  'goal-tracker/config/requestNotificationPermission',
  // Notre fonction étant `async`, tout renvoi interne, s'il n'est pas déjà une
  // promesse, sera automatiqement enrobé comme une promesse accomplie.
  async () => {
    if (bootNotificationPermission === 'denied') {
      return 'denied'
    }

    // Le recours aux
    // [notifications](https://developer.mozilla.org/fr/docs/Web/API/notification/Using_Web_Notifications)
    // “système” n’est pas automatiquement possible : l’utilisateur doit nous
    // l’avoir accordé.  Cette fonction renvoie une promesse vers le statut
    // résultant, utilisée suite à l'action de demande de permission.
    return window.Notification.requestPermission()
  }
)

// Réducteur
// ---------

export default createReducer<Config>(
  {
    canPromptForNotify: bootNotificationPermission === 'default',
    canNotify: bootNotificationPermission === 'granted',
    rehydrated: false,
  },
  (builder) => {
    builder
      .addCase(REHYDRATE, (state) => {
        state.rehydrated = true
      })
      .addCase(
        requestNotificationPermission.fulfilled,
        (state, { payload: status }) => {
          state.canPromptForNotify = status === 'default'
          state.canNotify = status === 'granted'
        }
      )
  }
)

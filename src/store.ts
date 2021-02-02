// État applicatif
// ===============

import { configureStore } from '@reduxjs/toolkit'
import { offline } from '@redux-offline/redux-offline'
import type { StoreEnhancer } from '@reduxjs/toolkit'
import type { TypedUseSelectorHook } from 'react-redux'
import { useDispatch, useSelector } from 'react-redux'

import DEFAULT_STATE from './default-state'
import goalTrackerReducer from './reducers'
import type { RootState } from './reducers'

export { RootState }

// Définition de l'état par défaut (hors hydratation).  En production, on
// partira sur un état vide, tous les réducteurs de tranches Redux posant alors
// leurs valeurs par défaut granulaires.
//
// L'import statique de `DEFAULT_STATE`, plutôt qu'un import dynamique, peut
// sembler ajouter du poids au bundle, mais en réalité c'est préférable : non
// seulemment le ternaire ci-dessous va s'inliner en `{}` dans un build de
// production, entraînant *de facto* la purge de l'import lors de l'élimination
// de code mort, mais en prime il évite un *code splitting* superflu en
// développement.
const state = (
  process.env.NODE_ENV === 'production' ? {} : DEFAULT_STATE
) as RootState

// Cet export nous permet de construire facilement un *store* selon nos besoins
// (et notamment un état initial précis), par exemple lors des tests ou dans
// Storybook.
export function makeStore(
  preloadedState = state,
  { shouldPersist = process.env.NODE_ENV !== 'test' } = {}
) {
  const store = configureStore({
    preloadedState,
    reducer: goalTrackerReducer,
    // Le typage de redux-offline n'est pas au cordeau, un affinage par
    // annotation de type est nécessaire.
    enhancers: shouldPersist ? [offline({}) as StoreEnhancer] : [],
  })

  // Gestion du HMR sur les réducteurs pendant le développement.
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(goalTrackerReducer)
    )
  }

  return store
}

// Création de l'état par défaut (pour le dev et la prod principalement, les tests
// et Storybook créeraient les leurs sur-mesure selon leurs besoins.)

const store = makeStore()

// Enrobage
// [recommandé](https://react-redux.js.org/using-react-redux/usage-with-typescript#define-typed-hooks),
// pour des questions de typage automatique, des hooks de base `useDispatch` et
// `useSelector`, afin notamment de s'épargner du typage explicite pour les
// sélecteurs *inline*.
type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Le store pour le dev / la prod est l'export par défaut.

export default store

// Reducer combiné global
// ======================

import { combineReducers } from 'redux'
import type { Reducer } from 'redux'
import reduceReducers from 'reduce-reducers'

import config from './config'
import currentUser from './currentUser'
import goals from './goals'
import history from './history'
import reduceCloseDay from './closeDay'
import today from './today'
import todaysProgress from './todaysProgress'

// Selon la [meilleure pratique
// Redux](https://redux.js.org/recipes/structuring-reducers/splitting-reducer-logic),
// nous avons réalisé indépendamment les *reducers* des diverses tranches de
// l’état.  On va utiliser
// [`combineReducers`](https://redux.js.org/api/combinereducers) pour les
// recombiner en un seul, qui délèguera automatiquement aux nôtres, champ par
// champ.
//
// Toutefois, une action (`closeDay`) impacte plusieurs champs (en l’occurrence,
// `today`, `todaysProgress` et `history`), de sorte que nous allons la traiter
// dans un reducer *top-level* dédié (`reduceCloseDay`).

// On crée le reducer consolidé…
const coreReducer = combineReducers({
  // … basé sur nos reducers individuels pour chaque tranche…
  config,
  currentUser,
  goals,
  history,
  today,
  todaysProgress,
})

// Afin d'éviter des problématiques de circularité dans les types auto-définis /
// inférés par TS et Redux-Toolkit, on cale le `RootState` non pas sur base du
// réducteur final, mais sur base du réducteur combiné (le type obtenu est
// structurellement identique).
export type RootState = ReturnType<typeof coreReducer>

// Ensuite, on définit le reducer final exporté par ce module, qui sera donc
// celui exploité par le *store* Redux, afin de traiter les actions
// multi-champs.  Reduce-Reducers n'est pas très au point sur son typage, ce qui
// nous force à expliciter le type résultat pour être bien compatible avec nos
// attentes.
const goalTrackerReducer = reduceReducers(
  coreReducer,
  reduceCloseDay
) as Reducer<RootState>

/*
Parmi les autres options d'implémentation, on aurait pu avoir…

## La version hard-codée naïve

```js
function goalTrackerReducer(state, action) {
  state = coreReducer(state, action)
  state = closeDay(state, action)
  return state
}
```

## La version déjà plus générique

```js
function goalTrackerReducer(state, action) {
  for (const reducer of [coreReducer, closeDay]) {
    state = reducer(state, action)
  }
  return state
}
```

## Le `reduce` justifié

```js
function goalTrackerReducer(state, action) {
  return [coreReducer, closeDay].reduce(
    (prev, reducer) => reducer(prev, action),
    state
  )
}
```
*/

export default goalTrackerReducer

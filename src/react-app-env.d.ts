/// <reference types="react-scripts" />

// Les types ci-dessous seront à terme déplacés dans les fichiers de réducteurs
// Redux appropriés, mais pour le moment nos utilitaires et composants en ont
// déjà besoin, alors il faut qu'ils soient accessibles !

declare type Goal = {
  id: string
  name: string
  target: number
  units: string
}

declare type HistoryEntry = {
  date: string
  progresses: {
    [goalId: string]: [progress: number, target: number]
  }
}

declare type TodaysProgress = {
  [goalId: string]: number
}

declare type UserInfo =
  | { loginState: 'logged-out' | 'pending' | 'failure' }
  | { loginState: 'logged-in'; email: string }

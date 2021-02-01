// Attente de réhydratation
// ========================
//
// Tout petit composant basé sur le drapeau `rehydrated` de l'état applicatif,
// qui permet d'éviter un rendu avant que ce dernier ne soit réhydraté par
// redux-persist.  On s'épargne ainsi un rendu en deux temps (avec les
// transitions CSS sur les jauges) au lancement.

import { useAppSelector } from './store'

export default function RehydrationWaiter({
  children,
}: {
  children: JSX.Element
}) {
  // @ts-expect-error
  const rehydrated = useAppSelector(({ config: { rehydrated } }) => rehydrated)
  return rehydrated ? children : null
}

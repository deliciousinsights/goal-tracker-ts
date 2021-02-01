// Enrobeur de grappe authentifiée
// ===============================
//
// Nous permet de définir des parties de l'UI qui exigent l'authentification
// (c'est-à-dire que l'utilisateur soit logué).  En pratique, s'abonne au store
// pour suivre son état de connexion, auquel cas on *rendere* les *children* ou,
// à défaut, le contenu de la route de layout qui nous utilise (ce qui permet
// notamment notre utilisation comme groupement de routes authentifiées au sein
// d'un `<Routes>`).  Si on n'est pas logué, on *rendere* le `<Navigate/>` de
// React Router, qui nous ramène immédiatement à l'URL racine, donc à l'écran de
// connexion.

import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../store'

export default function RequireAuth({ children }: { children?: JSX.Element }) {
  const loggedIn = useAppSelector(
    (state) => state.currentUser.loginState === 'logged-in'
  )
  if (!loggedIn) {
    return <Navigate to='/' />
  }

  return children ?? <Outlet />
}

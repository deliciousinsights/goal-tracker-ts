// Enrobeur de route authentifiée
// ==============================
//
// Permet de définir des routes exigeant que l’utilisateur soit logué.  En
// pratique, définit une route classique amenant sur un HOC connecté au *store*
// Redux et vérifiant l’état de l’authentification.  Si l’utilisateur est
// connecté, on *render* le composant normalement, sinon on utilise un
// `<Redirect />` pour ramener à l’écran de connexion.

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../store'

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const loggedIn = useAppSelector(
    (state) => state.currentUser.loginState === 'logged-in'
  )

  return loggedIn ? children : <Navigate to='/' />
}

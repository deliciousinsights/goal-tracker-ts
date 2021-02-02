// Écran principal
// ===============

import LoginScreen from '../auth/LoginScreen'
import TrackerScreen from './TrackerScreen'
import { useAppSelector } from '../store'

export default function HomeScreen() {
  // Récupération des infos qui nous intéressent depuis l’état global applicatif
  // géré par Redux. En l’occurrence, seul `currentUser.loginState` nous
  // intéresse.
  const loggedIn = useAppSelector(
    (state) => state.currentUser.loginState === 'logged-in'
  )

  // Si on a un compte “connecté”, notre URL (la racine) affiche l’écran de
  // suivi des objectifs.  Sinon, on affiche l’écran de connexion.
  return loggedIn ? <TrackerScreen /> : <LoginScreen />
}

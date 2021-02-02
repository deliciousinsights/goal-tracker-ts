// Utilisateur courant (tests)
// ===========================

import reducer, {
  logIn,
  logInFailure,
  logInSuccess,
  logOut,
} from './currentUser'
import type { UserInfo } from './currentUser'

// Le *reducer* est censé…
describe('Current User reducer', () => {
  // …fournir son état par défaut
  // ----------------------------
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = { loginState: 'logged-out' }

    // On teste toujours que l’état par défaut est bien fourni.  Le plus simple
    // consiste à envoyer un état `undefined` et une action de type inconnu, et
    // à vérifier le résultat (ici, un état non connecté).
    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  // …gérer la connexion
  // -------------------
  it('should handle login steps', () => {
    const email = 'john@example.com'
    // Toujours pareil :
    //
    // 1) On définit l’état initial et les constituants de l'action
    const initialState: UserInfo = { loginState: 'logged-out' }

    // 2) On appelle le *reducer* avec un état préalable approprié
    //    (`initialState`) et l'action **créée par le creator** (ce qui fait une
    //    sorte de test combiné du *action creator*).  Et on vérifie le segment
    //    d'état obtenu en retour.
    expect(reducer(initialState, logIn({ email, password: 'foobar' }))).toEqual(
      {
        loginState: 'pending',
      }
    )

    expect(reducer(initialState, logInSuccess({ email }))).toEqual({
      loginState: 'logged-in',
      email,
    })

    expect(reducer(initialState, logInFailure())).toEqual({
      loginState: 'failure',
    })
  })

  // …gérer la déconnexion
  // ---------------------
  it('should handle logout', () => {
    // On prend un état opposé (connecté) et on vérifit le résultat, donc un
    // état non connecté.
    const initialState: UserInfo = {
      loginState: 'logged-in',
      email: 'john@example.com',
    }
    const expectedState: UserInfo = { loginState: 'logged-out' }

    expect(reducer(initialState, logOut())).toEqual(expectedState)
  })

  // Remarquez qu'on pourrait aussi, par acquit de conscience, tester que pour
  // toute action non gérée, l'état est préservé.  À vous de jouer ?  Notez
  // toutefois qu'en TypeScript avec Redux Toolkit, en pratique ce serait
  // impossible, ça ne typerait pas !
})

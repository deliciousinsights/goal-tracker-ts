import reducer, { logIn, logOut } from './currentUser'
import type { UserInfo } from './currentUser'

describe('Current User reducer', () => {
  it('should return its initial state', () => {
    const initialState = undefined
    const expectedState = { loginState: 'logged-out' }

    expect(reducer(initialState, { type: 'unknown' })).toEqual(expectedState)
  })

  it('should handle login', () => {
    const email = 'john@example.com'
    const initialState: UserInfo = { loginState: 'logged-out' }
    const expectedState = { loginState: 'logged-in', email }

    expect(
      reducer(initialState, logIn({ email, password: 'no fate' }))
    ).toEqual(expectedState)
  })

  it('should handle logout', () => {
    const initialState: UserInfo = {
      loginState: 'logged-in',
      email: 'john@example.com',
    }
    const expectedState: UserInfo = { loginState: 'logged-out' }

    expect(reducer(initialState, logOut())).toEqual(expectedState)
  })
})

import LoginScreen from '../auth/LoginScreen'
import TrackerScreen from './TrackerScreen'
import { useAppSelector } from '../store'

export default function HomeScreen() {
  const loggedIn = useAppSelector(
    (state) => state.currentUser.loginState === 'logged-in'
  )

  return loggedIn ? <TrackerScreen /> : <LoginScreen />
}

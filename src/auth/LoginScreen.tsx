import type { FormEvent } from 'react'
import { useState } from 'react'

import ArrowForward from '@mui/icons-material/ArrowForward'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import TextField from '@mui/material/TextField'

import classes from './LoginScreen.module.css'
import { logIn } from '../reducers/currentUser'
import TogglablePasswordField from './TogglablePasswordField'
import { useAppDispatch } from '../store'

const MIN_PASSWORD_LENGTH = 6

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const canLogIn = email !== '' && password.trim().length >= MIN_PASSWORD_LENGTH
  const dispatch = useAppDispatch()

  return (
    <form onSubmit={handleSubmit}>
      <Card className={classes.loginScreen}>
        <CardHeader title='Goal Tracker' subheader='Connexion' />
        <CardContent>
          <TextField
            autoComplete='home email'
            id='email'
            name='email'
            label='E-mail'
            fullWidth
            margin='normal'
            onChange={(event) => setEmail(normalizeEmail(event.target.value))}
            placeholder='mon@email.tld'
            required
            type='email'
            value={email}
          />
          <TogglablePasswordField
            autoComplete='current-password'
            helperText={`${MIN_PASSWORD_LENGTH} caractères minimum`}
            id='password'
            name='password'
            label='Mot de passe'
            fullWidth
            margin='normal'
            onChange={(event) => setPassword(event.target.value)}
            placeholder='super mot de passe'
            required
            value={password}
          />
        </CardContent>
        <CardActions style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            color='primary'
            disabled={!canLogIn}
            startIcon={<ArrowForward />}
            type='submit'
            variant='contained'
          >
            Connecte-toi
          </Button>
        </CardActions>
      </Card>
    </form>
  )

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    dispatch(logIn({ email, password }))
  }
}

function normalizeEmail(email: string) {
  return email
    .replace(/\s+/g, '')
    .replace(/^[^@]+/, (text) => text.toLowerCase())
}

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Add from '@mui/icons-material/Add'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Logout from '@mui/icons-material/ExitToApp'
import Typography from '@mui/material/Typography'

import { addGoal, removeGoal, updateGoal } from '../reducers/goals'
import AddSettingDialog from './AddSettingDialog'
import type { ASDState } from './AddSettingDialog'
import DeleteSettingDialog from './DeleteSettingDialog'
import type { Goal } from '../reducers/goals'
import GoalSetting from './GoalSetting'
import { logOut } from '../reducers/currentUser'
import type { RootState } from '../store'
import { useAppDispatch, useAppSelector } from '../store'

const DEFAULT_STATE: {
  goal: Goal | {}
  dialog: 'delete' | 'add-or-update' | null
} = {
  goal: {},
  dialog: null,
}

export default function SettingsScreen() {
  useEffect(() => {
    document.title = 'Mes paramètres'
  }, [])

  const [{ goal, dialog }, setState] = useState(DEFAULT_STATE)

  const { goals, email } = useAppSelector(selectState)
  const dispatch = useAppDispatch()

  return (
    <>
      <Button component={Link} startIcon={<ArrowBack />} to='/' variant='text'>
        Retour
      </Button>
      <Card className='settings'>
        <CardHeader title='Paramètres' />
        <CardContent>
          <List>
            <ListItem>
              <ListItemText
                primary='Vous êtes connecté-e en tant que'
                secondary={email}
              />
              <ListItemSecondaryAction>
                <IconButton onClick={() => dispatch(logOut())}>
                  <Logout />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Typography variant='subtitle1'>Mes objectifs</Typography>
            {goals.map((goal) => (
              <GoalSetting
                goal={goal}
                key={goal.id}
                onDeleteClick={openGoalDeleter}
                onEditClick={openGoalEditor}
              />
            ))}
            {goals.length === 0 && (
              <ListItem>
                <ListItemText secondary='Aucun objectif pour le moment' />
              </ListItem>
            )}
          </List>
        </CardContent>
        <CardActions>
          <Button
            color='primary'
            onClick={openGoalAdder}
            startIcon={<Add />}
            variant='contained'
          >
            Ajouter un objectif
          </Button>
        </CardActions>
      </Card>
      <AddSettingDialog
        goal={goal}
        key={'id' in goal ? goal.id : null}
        onAdd={addOrUpdateGoal}
        onCancel={closeDialogs}
        onClosed={resetGoal}
        open={dialog === 'add-or-update'}
      />
      <DeleteSettingDialog
        goal={goal}
        onCancel={closeDialogs}
        onClosed={resetGoal}
        onDelete={deleteSelectedGoal}
        open={dialog === 'delete'}
      />
    </>
  )

  function addOrUpdateGoal({ id, name, target, units, keepOpen }: ASDState) {
    if (id !== undefined) {
      dispatch(updateGoal({ id, name, target, units }))
      keepOpen = false
    } else {
      dispatch(addGoal({ name, target, units }))
    }
    if (!keepOpen) {
      closeDialogs()
    }
  }

  function closeDialogs() {
    setState({ goal, dialog: null })
  }

  function deleteSelectedGoal() {
    dispatch(removeGoal({ id: (goal as Goal).id }))
    closeDialogs()
  }

  function openGoalAdder() {
    setState({ goal: {}, dialog: 'add-or-update' })
  }

  function openGoalDeleter(goal: Goal) {
    setState({ goal, dialog: 'delete' })
  }

  function openGoalEditor(goal: Goal) {
    setState({ goal, dialog: 'add-or-update' })
  }

  function resetGoal() {
    setState(DEFAULT_STATE)
  }
}

function selectState({ goals, currentUser }: RootState) {
  const email =
    currentUser.loginState === 'logged-in' ? currentUser.email : null
  return { goals, email }
}

// Suppression de paramètre
// ========================

// C’est en fait une boîte de dialogue, inclue d’office dans le conteneur parent
// (`SettingsScreen`), et qui va donc être initialement *rendered* sans objectif
// (`goal`), puis verra ses propriétés mises à jour à chaque utilisation.

import Button from '@mui/material/Button'
import Clear from '@mui/icons-material/Clear'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useMediaQuery from '@mui/material/useMediaQuery'

import type { Goal } from '../reducers/goals'

type DSDProps = {
  goal: Goal | { name?: string }
  onDelete: () => void
  onCancel: () => void
  onClosed?: () => void
  open: boolean
}

// Il y a vraiment quelque chose de délicieux dans la déstructuration, surtout
// pour un argument objet et en ajoutant des valeurs par défaut, comme ici…
export default function DeleteSettingDialog({
  goal = {},
  onCancel,
  onClosed,
  onDelete,
  open,
}: DSDProps) {
  const smallViewport = useMediaQuery('(max-width: 480px)')
  return (
    <Dialog
      aria-labelledby='deleteGoalTitle'
      fullScreen={smallViewport}
      onClose={onCancel}
      open={open}
      TransitionProps={{
        onExited: onClosed,
      }}
    >
      <DialogTitle id='deleteGoalTitle'>Supprimer un objectif</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Supprimer l’objectif {`« ${goal.name} » ?`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onCancel}>
          Ouh là, non !
        </Button>
        <Button color='primary' onClick={onDelete} startIcon={<Clear />}>
          Adios !
        </Button>
      </DialogActions>
    </Dialog>
  )
}

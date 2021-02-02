// Suivi du jour pour un objectif
// ==============================

import Add from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import ThumbUp from '@mui/icons-material/ThumbUp'
import Typography from '@mui/material/Typography'

import classes from './TrackerScreen.module.css'
import Gauge from '../shared/Gauge'
import type { Goal } from '../reducers/goals'

type GTWProps = {
  goal: Goal
  progress: number
  onProgress?: (goal: Goal) => void
}

// Section de l'écran principal, dédiée à un objectif.  Fournit notamment le
// descriptif de l'objectif et l’éventuel bouton de progression.
export default function GoalTrackerWidget({
  // La déstructuration en force !
  goal,
  goal: { name, units, target },
  onProgress,
  progress,
}: GTWProps) {
  // La beauté d'un ternaire multi-lignes…
  const adderComponent =
    target > progress ? (
      <Fab
        color='secondary'
        size='small'
        aria-label={`Progresser sur ${name}`}
        onClick={() => onProgress?.(goal)}
      >
        <Add data-testid='in-progress' />
      </Fab>
    ) : (
      <Fab disabled size='small' aria-label='Objectif atteint, bravo !'>
        <ThumbUp data-testid='completed' />
      </Fab>
    )

  return (
    <div className={classes.goal}>
      <div className={classes.summary}>
        <Typography variant='h6' component='h2'>
          {name}
        </Typography>
        <Gauge value={progress} max={target} />
        <Typography component='small'>
          {`${progress} ${units} sur ${target}`}
        </Typography>
      </div>
      <div className={classes.cta}>{adderComponent}</div>
    </div>
  )
}

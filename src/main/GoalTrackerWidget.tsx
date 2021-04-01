import Add from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import ThumbUp from '@mui/icons-material/ThumbUp'
import Typography from '@mui/material/Typography'

import classes from './TrackerScreen.module.css'
import Gauge from '../shared/Gauge'

type GTWProps = {
  goal: Goal
  progress: number
}

export default function GoalTrackerWidget({
  goal: { name, units, target },
  progress,
}: GTWProps) {
  const adderComponent =
    target > progress ? (
      <Fab color='secondary' size='small' aria-label={`Progresser sur ${name}`}>
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

import React from 'react'
import classes from './PickPlayer.module.css';
import { useMatchContext } from '../../context/matchReducer';

function PickPlayer() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  

  return (
    <div className={classes.containerBox}>
        <div className={classes.titleBar}>
            Select Batter
        </div>
        <div className={classes.playerList}>
            {matchState.players.team1.map((playerName, i)=>(
                <div key={i} className={classes.playernames}>{playerName}</div>
            ))}
        </div>
        <div className={classes.control}>
            <button type="button" className={classes.nextBtn} disabled='true'>Next</button>
        </div>
    </div>
  )
}

export default PickPlayer
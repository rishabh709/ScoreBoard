import React from 'react'
import classes from './DropDownList.module.css';
import { useMatchContext } from '../../context/matchReducer';

function DropDownList() {

  const {state:matchState, dispatch:matchDispatch} = useMatchContext();

  function setBolwer(bowlerName){
    console.log(bowlerName)
    matchDispatch({type:'SET_BOLWER_NAME', payload:bowlerName});
  }

  return (
    <div className={classes.container}>
        {
          matchState.players['team'+(matchState.currentInnings+1)].map((names, i)=>(
            <div 
            key={i}
            className={classes.items}
            onClick={()=>setBolwer(names)}
            >{names}</div>
          ))
        }
    </div>
  )
}

export default DropDownList
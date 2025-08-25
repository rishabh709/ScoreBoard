import React from 'react'
import classes from './DropDownList.module.css';
import { useMatchContext } from '../../context/matchReducer';

function DropDownList({children}) {
  // DropDownList must require two things: 
  //    1. Child elements for listing
  //    2. selectHandler





  return(
    <div className={classes.container}>
      {children}
    </div>
  )


  // return (
  //   <div className={classes.container}>
  //       {
  //         matchState.players['team'+(matchState.currentInnings+1)].map((names, i)=>(
  //           <div 
  //           key={i}
  //           className={classes.items}
  //           onClick={()=>setBolwer(names)}
  //           >{names}</div>
  //         ))
  //       }
  //   </div>
  // )
}

export default DropDownList
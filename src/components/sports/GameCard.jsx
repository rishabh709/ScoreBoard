import React, { useState } from 'react'
import classes from "./GameCard.module.css"
import Backdrop from '../common/Backdrop';
import GameConfigForm from './GameConfigForm';
import CricketConfigForm from './CricketConfigForm';
import CricketGameConfigForm from '../cricket/CricketGameConfigForm';

function GameCard(props) {
  const [FormIsOpen, setFormIsOpen] = useState(false);

  const cancelHandler = () => setFormIsOpen(false)
  const showForm = () => setFormIsOpen((prev) => !prev);

  return (
    <div className={classes.card}>
      <div className={classes.topCard}>
        <div className={classes.imgWrapper}>
        <img src={props.img} alt={props.text} />
        </div>
      <div className={classes.title}>{props.text}</div>

      </div>
      <div className={classes.bottomCard}>
        <button className={classes.btn} onClick={()=>{showForm()}}>Create</button>
      </div>
      
      {/* {FormIsOpen && <GameConfigForm title={props.text} game={props.game} onNext={props.link} onCancle={cancelHandler}/>} */}
      {FormIsOpen && <CricketConfigForm referPage={props.link}/>}
      
    </div>
  )
}

export default GameCard;
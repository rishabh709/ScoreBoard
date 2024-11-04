import React, { useState } from 'react'
import classes from "./GameCard.module.css"
import Backdrop from '../common/Backdrop';
import GameConfigForm from './GameConfigForm';

function GameCard(props) {
  const [FormIsOpen, setFormIsOpen] = useState(false);

  const cancelHandler = () => setFormIsOpen(false)
  const showForm = () => setFormIsOpen(true);

  return (
    <div className={classes.card}>
      <div>
        <img src={props.img} alt={props.text} srcset="" />
      </div>
      <div className={classes.title}>{props.text}</div>

      <button className={classes.btn} onClick={()=>{showForm()}}>Create</button>
      {FormIsOpen && <GameConfigForm title={props.text} game={props.game} onNext={props.link} onCancle={cancelHandler}/>}
      {FormIsOpen && <Backdrop onClick={cancelHandler}/>}
      
    </div>
  )
}

export default GameCard;
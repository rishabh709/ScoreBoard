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
      <div className={classes.imgWrapper}>
        <img src={props.img} alt={props.text} srcset="" />
      </div>
      <div className={classes.title}>{props.text}</div>

      <button className={classes.btn} onClick={()=>{showForm()}}>Create</button>
      
      {/* {FormIsOpen && <GameConfigForm title={props.text} game={props.game} onNext={props.link} onCancle={cancelHandler}/>} */}
      {FormIsOpen && <CricketConfigForm referPage={props.link}/>}
      {console.log("We have got the link: ", props.link)}
      
    </div>
  )
}

export default GameCard;
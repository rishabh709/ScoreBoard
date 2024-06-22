import React, { useState } from 'react'
import classes from "./GameCard.module.css"
import Modal from "./Modal"
import { Link } from 'react-router-dom'
import Backdrop from './Backdrop';

function GameCard(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function createModalHandler(){
    setModalIsOpen(true);
  }
  function closeModalHandler(){
    setModalIsOpen(false);
    console.log("colsing...")
  }

  return (
    <div className={classes.card}>
      <div>
        <img src={props.img} alt={props.text} srcset="" />
      </div>
      <div className={classes.title}>{props.text}</div>
      <Link to={props.link} className={classes.btn}>Create</Link>

      {/* Modal */}
      {/* <button className={classes.btn} onClick={()=>{createModalHandler()}}>Create</button>
      {modalIsOpen && <Modal onClick={closeModalHandler}/>}
      {modalIsOpen && <Backdrop onClick={closeModalHandler}/>} */}

    </div>
  )
}

export default GameCard
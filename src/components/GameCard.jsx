import React, { useEffect, useState } from 'react'
import classes from "./GameCard.module.css"
import Modal from "./Modal"
import { Link } from 'react-router-dom'
import Backdrop from './Backdrop';
import ModalForm from './ModalForm';

function GameCard(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function createModalHandler(){
    setModalIsOpen(true);
  }
  function closeModalHandler(){
    setModalIsOpen(false);
    console.log("colsing...")
  }

  const [modalFormIsOpen, setModalFormIsOpen] = useState(false);

  function cancelHandler(){
    setModalFormIsOpen(false);
    console.log("colsing...")
  }
  function showModalForm(){
    setModalFormIsOpen(true);
  }
  useEffect(() => {
    console.log("clicked")
    console.log(modalFormIsOpen)
  }, [modalFormIsOpen])
  


  return (
    <div className={classes.card}>
      <div>
        <img src={props.img} alt={props.text} srcset="" />
      </div>
      <div className={classes.title}>{props.text}</div>
      {/* <Link to={props.link} className={classes.btn}>Create</Link> */}

      <button className={classes.btn} onClick={()=>{showModalForm()}}>Create</button>
      {modalFormIsOpen && <ModalForm title={props.text} game={props.game} onNext={props.link} onCancle={cancelHandler}/>}
      {modalFormIsOpen && <Backdrop onClick={closeModalHandler}/>}
      
      {/* Modal */}
      {/* <button className={classes.btn} onClick={()=>{createModalHandler()}}>Create</button>
      {modalIsOpen && <Modal onClick={closeModalHandler}/>}
      {modalIsOpen && <Backdrop onClick={closeModalHandler}/>} */}

    </div>
  )
}

export default GameCard
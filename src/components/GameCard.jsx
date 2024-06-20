import React from 'react'
import classes from "./GameCard.module.css"
import { Link } from 'react-router-dom'

function GameCard(props) {
  return (
    <div className={classes.card}>
      <div>
        <img src={props.img} alt={props.text} srcset="" />
      </div>
      <div className={classes.title}>{props.text}</div>
      <Link to={props.link} className={classes.btn}>Create</Link>
    </div>
  )
}

export default GameCard
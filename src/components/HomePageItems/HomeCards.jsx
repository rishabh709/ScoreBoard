import React from 'react'

import classes from "./HomeCards.module.css";
import GameCard from '../GameCard';
import ModalForm from '../ModalForm';
import Backdrop from '../Backdrop';

function HomeCards() {
  return (
    <div className={classes.homeCardsList}>
        <GameCard text="Cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
        <Backdrop/>
        <ModalForm/>
    </div>
  )
}

export default HomeCards
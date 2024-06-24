import React, { useState } from 'react'

import classes from "./HomeCards.module.css";
import GameCard from '../GameCard';
import ModalForm from '../ModalForm';
import Backdrop from '../Backdrop';

function HomeCards() {

  return (
    <div className={classes.homeCardsList}>
        <GameCard text="Cricket" game="cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
    </div>
  )
}

export default HomeCards
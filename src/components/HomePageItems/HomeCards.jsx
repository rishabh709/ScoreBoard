import React from 'react'

import classes from "./HomeCards.module.css";
import GameCard from '../GameCard';

function HomeCards() {
  return (
    <div className={classes.homeCardsList}>
        <GameCard text="Cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
    </div>
  )
}

export default HomeCards
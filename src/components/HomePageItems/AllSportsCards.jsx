import React, { useState } from 'react'

import GameCard from '../GameCard';
import ModalForm from '../ModalForm';
import Backdrop from '../Backdrop';

function HomeCards() {

  return (
    <div style={{padding: "1% 3%"}}>
        <GameCard text="Cricket" game="cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
    </div>
  )
}

export default HomeCards
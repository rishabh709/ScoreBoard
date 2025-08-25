import React from 'react'

import GameCard from '../sports/GameCard';

function HomeCards() {

  return (
    <div style={{
      display: 'flex',
      gap:"10px",
      padding: '1%'
    }}>
        <GameCard text="Cricket" game="cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
        <GameCard text="Cricket" game="cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
    </div>
  )
}

export default HomeCards
import React from 'react'

import GameCard from '../sports/GameCard';

function HomeCards() {

  return (
    <div style={{
      display: 'flex',
      padding: '1%'
    }}>
        <GameCard text="Cricket" game="cricket" link="/cricket-match" img="src\assets\icons\cricket-icon.svg"/>
    </div>
  )
}

export default HomeCards
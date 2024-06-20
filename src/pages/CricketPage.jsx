import React from 'react'
import ScoreCard from '../components/scoreboard/ScoreCard'
import OverBar from '../components/scoreboard/OverBar'
import ScoringController from '../components/scoreboard/ScoringController'

function CricketPage() {
  return (
    <>
      <ScoreCard />
      <OverBar />
      <ScoringController/>
    </>
  )
}

export default CricketPage
import React from 'react'
import ScoreCard from '../components/cricket/ScoreCard'
import OverBar from '../components/cricket/OverBar'
import ScoringController from '../components/cricket/ScoringController'

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
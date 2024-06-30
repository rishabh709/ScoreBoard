import React from 'react'
import ScoreCard from '../components/cricket/ScoreCard'
import OverBar from '../components/cricket/OverBar'
import ScoringController from '../components/cricket/ScoringController'
import OversSummary from '../components/cricket/OversSummary'

function CricketPage() {
  return (
    <>
      <ScoreCard />
      <OverBar />
      <ScoringController/>
      <OversSummary />
    </>
  )
}

export default CricketPage
import React from 'react'
import ScoreCard from '../components/cricket/ScoreCard'
import OverBar from '../components/cricket/OverBar'
import ScoringController from '../components/cricket/ScoringController'
import OversSummary from '../components/cricket/OversSummary'
import classes from "./cricket.module.css"
function CricketPage() {
  return (
    <>
      <ScoreCard />
      <OverBar />
      <ScoringController/>
      <div className={classes.overs}>
        <OversSummary />
      </div>
    </>
  )
}

export default CricketPage
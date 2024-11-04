import React from 'react'
import ScoreCard from '../components/cricket/ScoreCard'
import OverBar from '../components/cricket/OverBar'
import ScoringController from '../components/cricket/ScoringController'
import OversSummary from '../components/cricket/OversSummary'
function CricketPage() {
  return (
    <div style={{
      height:'90dvh',
      display: 'flex',
      flexGrow: '1',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <ScoreCard />
      <OverBar />
      <ScoringController/>
      {/* <div className={classes.overs}>
        <OversSummary />
      </div> */}
    </div>
  )
}

export default CricketPage
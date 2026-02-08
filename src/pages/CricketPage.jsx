import React from 'react'
import ScoreCard from '../components/cricket/ScoreCard'
import OverBar from '../components/cricket/OverBar'
import ScoringController from '../components/cricket/ScoringController'
import OversSummary from '../components/cricket/OversSummary'
import SidebarLayout from '../layout/componentLayout/SidebarLayout'
import CricketSidebar from '../components/cricket/CricketSidebar'
function CricketPage() {
  return (
    <>
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
    {/* <SidebarLayout></SidebarLayout> */}
    <CricketSidebar></CricketSidebar>
    </>
  )
}

export default CricketPage
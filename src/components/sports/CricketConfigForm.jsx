import React, { useState } from 'react'
import ModalPanelLayout from '../../layout/componentLayout/ModalPanelLayout'
import FormInput from '../common/FormInput'
import ToggleButton from '../common/ToggleButton'

function CricketConfigForm() {

  // set onBack, 
  // onNext, 
  // manage the tabs, 

    // const circket =[
    //   [
    //     { type: "text", field: "team1", place: "Team 1" },
    //     { type: "text", field: "team2", place: "Team 2" },
    //   ],

    //   [{ type: "number", field: "maxOvers", place: "Max Overs" }],

    //   [{ isModule: true, module: <Teamup /> }],
    //   [{ isModule: true, module: <Toss /> }],
    //   [{ isModule: true, module: <TossDecision /> }],
    // ]
  
    const [isHeads, setIsHeads] = useState(true)
    const handleTossToggle = () => {
    setIsHeads((prev) => !prev);
  };


  return (
    <ModalPanelLayout heading="Cricket Match">





      
      {/* <ToggleButton options={["Heads", "Tails"]} isToggled={isHeads} onToggle={handleTossToggle}></ToggleButton> */}
    </ModalPanelLayout>
  )
}

export default CricketConfigForm
import React from 'react'
import SidebarLayout from '../../layout/componentLayout/SidebarLayout'
import FormInput from '../common/FormInput'

import { useMatchContext } from '../../context/matchReducer'

function CricketSidebar() {
    const {state:matchState, dispatch:matchDispatch} = useMatchContext();

  return (
    <SidebarLayout>
        <FormInput
          inputField={{
            type: "text",
            field: "team2",
            place: "Team 2 name",
            data: matchState.team2,
            onFocus: "this.select()",

          }}
        ></FormInput>

    </SidebarLayout>
  )
}

export default CricketSidebar
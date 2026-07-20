import React, { useState } from "react";
import SidebarLayout from "../../layout/componentLayout/SidebarLayout";
import FormInput from "../common/FormInput";

import { useMatchContext } from "../../context/matchReducer";
import FormInputAndLabel from "../common/FormInputAndLabel";
import classes from "./CricketSidebar.module.css";
import Teaminfo from "./form/Teaminfo";
import SelectPlayer from "../common/SelectPlayer";
function CricketSidebar() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const inputStyle = {
    background: "#E5E5E5",
    width: "50%",
  };

  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [overs, setOvers] = useState(null);

  const handleTeam1Name = (team1Name) => {
    setTeam1Name(team1Name);
    matchDispatch({ type: "team1", payload: team1Name });
  };
  const handleTeam2Name = (team2Name) => {
    setTeam2Name(team2Name);
    matchDispatch({ type: "team2", payload: team2Name });
  };
  const handleMaxOvers = (overs) => {
    setOvers(overs);
    matchDispatch({ type: "MAX_OVERS", payload: overs });
  };

  return (
    <SidebarLayout>
      <div className={classes.wrapper}>
        <d1>Team Details</d1>
        <Teaminfo></Teaminfo>
        <div>Batters</div>
      </div>
    </SidebarLayout>
  );
}

export default CricketSidebar;

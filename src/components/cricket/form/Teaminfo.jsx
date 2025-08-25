import React, { useState } from "react";

import classes from "./Teaminfo.module.css";
import FormInput from "../../common/FormInput";
import Logo from "../../common/Logo";
import { useMatchContext } from "../../../context/matchReducer";

function Teaminfo() {
  const [team1Logo, setTeam1Logo] = useState(null);
  const [team2Logo, setTeam2Logo] = useState(null);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");
  const [overs, setOvers] = useState(null);

  const {state:matchState, dispatch:matchDispatch} = useMatchContext();
  
  const handleTeam1Name = (team1Name) => {
    setTeam1Name(team1Name);
    matchDispatch({type:'team1', payload:team1Name});
  }
  const handleTeam2Name = (team2Name) => {
    setTeam2Name(team2Name);
    matchDispatch({type:'team2', payload:team2Name});
  }
  const handleMaxOvers = (overs) => {
    setOvers(overs);
    matchDispatch({type:'MAX_OVERS', payload:overs})
  }
  const teamLogos = import.meta.glob("/src/assets/team-icons/TeamIcons/*.svg", {
    eager: true,
    import: "default",
  });

  const team1LogoSelect = (logoPath) => {
    setTeam1Logo(logoPath);
    matchDispatch({type:'team1Logo', payload:logoPath})
  };
  const team2LogoSelect = (logoPath) => {
    setTeam2Logo(logoPath);
    matchDispatch({type:'team2Logo', payload:logoPath})
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <FormInput
          inputField={{
            type: "text",
            field: "team1",
            place: "Team 1 name",
            data: matchState.team1,
            setData: handleTeam1Name,
            onFocus: "this.select()",
          }}
        ></FormInput>
        <Logo
          logos={teamLogos}
          profileImage={team1Logo}
          logoSelectionHandler={team1LogoSelect}
        />
        <FormInput
          inputField={{
            type: "text",
            field: "team2",
            place: "Team 2 name",
            data: matchState.team2,
            setData: handleTeam2Name,
            onFocus: "this.select()",

          }}
        ></FormInput>
        <Logo
          logos={teamLogos}
          profileImage={team2Logo}
          logoSelectionHandler={team2LogoSelect}
        />
      </div>
      <div className={classes.oversWrapper}>
        <FormInput
          inputField={{
            type: "number",
            field: "overs",
            place: "Overs",
            data: matchState.maxOvers,
            setData: handleMaxOvers,
          }}
        />
      </div>
    </div>
  );
}

export default Teaminfo;

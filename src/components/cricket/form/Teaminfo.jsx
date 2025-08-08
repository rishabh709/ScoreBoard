import React, { useState } from "react";

import classes from "./Teaminfo.module.css";
import FormInput from "../../common/FormInput";
import Logo from "../../common/Logo";

function Teaminfo() {
  const [team1Logo, setTeam1Logo] = useState(null);
  const [team2Logo, setTeam2Logo] = useState(null);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");

  const [overs, setOvers] = useState(null);
  const teamLogos = import.meta.glob("/src/assets/team-icons/TeamIcons/*.svg", {
    eager: true,
    import: "default",
  });

  const team1LogoSelect = (logoPath) => {
    setTeam1Logo(logoPath);
  };
  const team2LogoSelect = (logoPath) => {
    setTeam2Logo(logoPath);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <FormInput
          inputField={{
            type: "text",
            field: "team1",
            place: "Team 1 name",
            data: team1Name,
            setData: setTeam1Name,
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
            data: team2Name,
            setData: setTeam2Name,
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
            data: overs,
            setData: setOvers,
          }}
        />
      </div>
    </div>
  );
}

export default Teaminfo;

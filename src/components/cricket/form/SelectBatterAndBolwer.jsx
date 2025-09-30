import React, { useState } from "react";
import DropDownList from "../../common/DropDownList";
import classes from "./SelectBatterAndBolwer.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import DropdownMenu from "../../common/DropdownMenu";
import { useMatchContext } from "../../../context/matchReducer";

function SelectBatterAndBolwer() {
  const [isDropDownOpen1, setIsDropDownOpen1] = useState(false);
  const [isDropDownOpen2, setIsDropDownOpen2] = useState(false);
  const [isDropDownOpen3, setIsDropDownOpen3] = useState(false);

  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const ddContainer = (
    <div className={classes.ddContainer}>
      <DropDownList>
        <div>one</div>
        <div>one</div>
        <div>one</div>
      </DropDownList>
    </div>
  );

  const setOnStrikeBatter = (batterName) => {
    matchDispatch({type:'SET_BATTER_ON_STRIKE', payload:batterName})
  }
  const setOnNonStrikeBatter = (batterName) => {
    matchDispatch({type:'SET_BATTER_ON_NONSTRIKE', payload:batterName})
  }
  const setBolwerName = (bolwerName) => {
    matchDispatch({type:'SET_BOLWER_NAME', payload:bolwerName})
  }
  return (
    <div
      style={{
        margin: "auto",
        width: "max-content",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <div className={classes.bar}>
        <div>Batter on Strike</div>
        <DropdownMenu
          defaultValue={matchState.current_batter.onStrike}
          setSelectedOption={setOnStrikeBatter}
          options={matchState.players[matchState.battingTeam]}
        ></DropdownMenu>
      </div>

      <div className={classes.bar}>
        <div>Batter on Non Strike</div>
        <DropdownMenu
          defaultValue={matchState.current_batter.nonStrike}
          setSelectedOption={setOnNonStrikeBatter}
          options={matchState.players[matchState.battingTeam]}
        ></DropdownMenu>
      </div>
      <hr style={{borderTopColor:'blue'}} />
      <div className={classes.bar}>
        <div>Bolwer</div>
        <DropdownMenu
          defaultValue={matchState.over.bowlerName}
          setSelectedOption={setBolwerName}
          options={matchState.players[matchState.bowlingTeam]}
        ></DropdownMenu>
      </div>
    </div>
  );
}

export default SelectBatterAndBolwer;

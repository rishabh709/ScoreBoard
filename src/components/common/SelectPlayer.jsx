import React, { useState } from "react";
import { useMatchContext } from "../../context/matchReducer";
import classes from "./SelectPlayer.module.css";

function SelectPlayer({ limit = 3, selectionRole }) {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const [selectedPlayer, setSelectedPlayer] = useState([]);

  function addPlayer(playerName) {
    if (selectedPlayer.length < limit) {
      console.log(selectedPlayer);
      setSelectedPlayer([...selectedPlayer, playerName]);
    } else {
      const updatedSelectedPlayer = [...selectedPlayer];
      updatedSelectedPlayer.pop();
      setSelectedPlayer([...updatedSelectedPlayer, playerName]);
    }
  }

  function removePlayer(playerName) {
    const itemIndex = selectedPlayer.indexOf(playerName);
    const updatedSelectedPlayer = [...selectedPlayer];

    updatedSelectedPlayer.splice(itemIndex, 1);
    setSelectedPlayer(updatedSelectedPlayer);
  }

  const onSelectHandler = (name) => {
    console.log("The value of limit: ", limit);
    if (selectedPlayer.includes(name) == true) {
      removePlayer(name);
    } else addPlayer(name);
  };

  const onConfirm = () => {
    if (selectionRole === "batsman") {
      matchDispatch({
        type: "SET_BATSMAN_NAME",
        payload: selectedPlayer,
      });
    } else if (selectionRole === "bowler") {
      matchDispatch({
        type: "SET_BOLWER_NAME",
        payload: selectedPlayer,
      });
    }
  };

  return (
    <div className={classes.containerBox}>
      <div className={classes.wrapper}>
        <div className={classes.titleBar}>
          <h2>Select Player</h2>
        </div>
        <div className={classes.playerList}>
          {matchState.players.team1.map((playerName, index) => (
            <button
              key={index}
              className={
                `${classes.playernames} ` +
                (selectedPlayer.includes(playerName) == true
                  ? classes.selected
                  : null)
              }
              onClick={() => onSelectHandler(playerName)}
            >
              {playerName}
            </button>
          ))}
        </div>
      </div>
      <div className={classes.controls}>
        <input type="button" value="Confirm" onClick={onConfirm} />
      </div>
    </div>
  );
}

export default SelectPlayer;

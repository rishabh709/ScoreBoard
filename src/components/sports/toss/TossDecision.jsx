import React, { useState } from "react";

import classes from "./TossDecision.module.css";
import { useMatchContext } from "../../../context/matchReducer";
function TossDecision() {
  const [tossDecision, setTossDecision] = useState(null);
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  function onBattingDecisionHandler() {
    setTossDecision("bat");
    matchDispatch({ type: "SET_BATTING_TEAM", payload: matchState.tossWinner });

    matchState.tossWinner != "team1"
      ? matchDispatch({ type: "SET_BOLWING_TEAM", payload: "team1" })
      : matchDispatch({ type: "SET_BOLWING_TEAM", payload: "team2" });
  }
  function onBolwingDecisionHandler() {
    setTossDecision("ball");
    matchDispatch({ type: "SET_BOLWING_TEAM", payload: matchState.tossWinner });

    matchState.tossWinner != "team1"
      ? matchDispatch({ type: "SET_BATTING_TEAM", payload: "team1" })
      : matchDispatch({ type: "SET_BATTING_TEAM", payload: "team2" });
  }

  return (
    <div className={classes.conatainer}>
      <h4>{matchState[matchState.tossWinner]} choose Batting or Bolwing</h4>
      <div className={classes.options}>
        <div className={classes.bowling}>
          <img src="src\assets\team-icons\toss\ball.svg" alt="cricket ball" />
          <input
            type="button"
            value="Bolwing"
            onClick={onBolwingDecisionHandler}
            className={
              tossDecision == "ball"
                ? classes.selectedOption
                : classes.unselectedOption
            }
          />
        </div>
        <div className={classes.batting}>
          <img
            className={classes.bat}
            src="src\assets\team-icons\toss\bat.svg"
            alt="circket Bat"
          />
          <input
            type="button"
            value="Batting"
            onClick={onBattingDecisionHandler}
            className={
              tossDecision == "bat"
                ? classes.selectedOption
                : classes.unselectedOption
            }
          />
        </div>
      </div>
      <div className={classes.resultBanner}>
        {tossDecision != null ? (
          <h2>
            {matchState[matchState.tossWinner]} Choose to {tossDecision}
          </h2>
        ) : (
          <h2></h2>
        )}
      </div>
    </div>
  );
}

export default TossDecision;

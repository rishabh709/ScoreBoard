import React, { useState } from "react";
import classes from "./Toss.module.css"; // Import the CSS module
import { useMatchContext } from "../../../context/matchReducer";

function Toss() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const [tossing, setTossing] = useState(false); // To track the tossing state
  const [result, setResult] = useState(null); // To store the result (Heads/Tails)
  const [team1Picked, setTeam1Picked] = useState("Heads");
  const [team2Picked, setTeam2Picked] = useState("Tails");

  const team1TossHandler = (team1CoinSide) => {
    setTeam1Picked(team1CoinSide);
    setTeam2Picked(team1CoinSide != "Heads" ? "Heads" : "Tails");
  };
  const team2TossHandler = (team2CoinSide) => {
    setTeam2Picked(team2CoinSide);
    setTeam1Picked(team2CoinSide != "Heads" ? "Heads" : "Tails");
  };

  // The tossCoin function to simulate the coin toss
  const tossCoin = () => {
    setTossing(true); // Start the tossing animation or process
    setResult(null); // Clear previous result

    // Simulate a random coin toss after a short delay
    setTimeout(() => {
      const tossResult = Math.random() > 0.5 ? "Heads" : "Tails"; // Randomize between Heads and Tails
      setResult(tossResult); // Set the result (Heads or Tails)
      team1Picked == tossResult
        ? matchDispatch({ type: "SET_TOSS_WINNER", payload: "team1" })
        : matchDispatch({
            type: "SET_TOSS_WINNER",
            payload: "team2",
          });
      setTossing(false); // Stop the tossing animation or process
    }, 2000); // Delay of 2 seconds to simulate the toss
  };

  return (
    <div className={classes.tossContainer}>
      <div className={classes.tossSetter}>
        <div className={classes.team}>
          <div className={classes.teamName}>
            <h4>{matchState.team1}</h4>
          </div>
          <div className={classes.tossPick}>
            <input
              type="button"
              className={`${
                team1Picked == "Heads" ? classes.headsSelected : ""
              } ${classes.tossBtn}`}
              onClick={() => team1TossHandler("Heads")}
              value="Heads"
              disabled={result !== null ? true : false}
            />
            <input
              type="button"
              className={`${
                team1Picked == "Tails" ? classes.tailsSelected : ""
              } ${classes.tossBtn}`}
              onClick={() => team1TossHandler("Tails")}
              value="Tails"
              disabled={result !== null ? true : false}
            />
          </div>
        </div>

        <div className={classes.team}>
          <div className={classes.teamName}>
            <h4>{matchState.team2}</h4>
          </div>
          <div className={classes.tossPick}>
            <input
              type="button"
              className={`${
                team2Picked == "Heads" ? classes.headsSelected : ""
              } ${classes.tossBtn}`}
              onClick={() => team2TossHandler("Heads")}
              value="Heads"
              disabled={result !== null ? true : false}
            />
            <input
              type="button"
              className={`${
                team2Picked == "Tails" ? classes.tailsSelected : ""
              } ${classes.tossBtn}`}
              onClick={() => team2TossHandler("Tails")}
              value="Tails"
              disabled={result !== null ? true : false}
            />
          </div>
        </div>
      </div>

      <div
        className={`${classes.coin} ${tossing ? classes.coinTossing : ""}`}
        onClick={result == null ? tossCoin : () => {}}
        disabled={tossing}
      >
        {result && !tossing ? (
          <div className={classes.result}>{result}</div> // Show result once toss ends
        ) : (
          <div className={classes.side}>{tossing ? "Tossing..." : "Toss"}</div> // Show status during toss
        )}
      </div>
      {result != null ? (
        <div>
          <h3>
            {team1Picked == result ? matchState.team1 : matchState.team2} won
            the Toss
          </h3>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Toss;

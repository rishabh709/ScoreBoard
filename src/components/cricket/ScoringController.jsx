import React, { useContext, useEffect, useReducer, useRef } from "react";
import { Context } from "../../context/scoreContext.jsx";
import classes from "./ScoringController.module.css";
import { BallProvider, useBallContext } from "../../context/ballsReducer.jsx";
import { useMatchContext } from "../../context/matchReducer.jsx";
import { useOverContext } from "../../context/overReducer.jsx";

import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiArrowLongLeft } from "react-icons/hi2";

function ScoringController() {
  //Implimenting newly created useReducer
  const { state: ballState, dispatch: ballDispatch } = useBallContext();
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const { state: overState, dispatch: overDispatch } = useOverContext();

  const didMountRef1 = useRef(false);
  const didMountRef2 = useRef(false);

  function ballRunHandler(run, type) {
    ballDispatch({ type: "run", payload: run });
    ballDispatch({ type: "type", payload: type });
  }
  function matchRunHandler(run) {
    matchDispatch({ type: "addRuns", payload: run });
  }

  function changeOfInnings() {
    matchDispatch({ type: "CHANGE_INNING" });
    ballDispatch({ type: "RESET_BALL_NUMBER" });
    overDispatch({ type: "RESET_STATE" });
  }
  function wicketHandler() {
    ballDispatch({ type: "wicket", payload: "legal" });
    matchDispatch({ type: "ADD_WICKET" });
  }

  // Function to add runs and update states accordingly
  function addRun(run, type = "legal") {
    ballRunHandler(run, type);
    matchRunHandler(run);
  }

  function addExtras(run, extraType) {
    const typeAlias = { wide: "WD", "no-ball": "NB" };
    addRun(run, typeAlias[extraType]);
  }

  function addWicket(type, run = null) {
    let lastWicket = false;
    if (matchState.wickets[matchState.currentInnings] < 10) {
      if (matchState.wickets[matchState.currentInnings] == 9) lastWicket = true;
    }
    if (lastWicket && matchState.currentInnings == 0) {
      changeOfInnings();
    }
    // TO DO: code for the tie situation
  }

  useEffect(() => {
    if (didMountRef1.current) {
      console.log("THE ball again...")
      overDispatch({ type: "addBall", payload: ballState });
      if (ballState.ballNumber == 6) {
        console.log("another over :", overState.overNumber + 1);
        overDispatch({ type: "overIncrement" });
        matchDispatch({ type: "overIncrement" });
        ballDispatch({ type: "RESET_BALL_NUMBER" });
      }
      matchDispatch({ type: "ballUpdate", payload: ballState.ballNumber });
    } else didMountRef1.current = true;
  }, [ballState.ballNumber]);

  useEffect(() => {
    if (didMountRef2.current) {
      matchDispatch({ type: "INSERT_IN_OVERS", payload: overState });
      if (overState.overNumber >= matchState.maxOvers) {
        matchDispatch({ type: "CHANGE_INNING" });
        overDispatch({ type: "RESET_STATE" });
      }
    } else didMountRef2.current = true;
  }, [overState.overNumber]);

  const runValues = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className={classes.container}>
      <div className={classes.scoring}>
        <div className={classes.batters}>
          <div className={classes.batter} onClick={() => enterBatteName(1)}>
            Batter-name
          </div>
          <div className={classes.batter} onClick={() => enterBatteName(2)}>
            Batter-name
          </div>
        </div>
        <div className={classes.byesOrbat}>
          <button>Bat</button>
          <button>Leg Byes</button>
        </div>

        <div className={classes.mainPan}>
          <div>
            <div className={classes.runs}>
              {runValues.map((run, index) => (
                <button
                  key={index}
                  className={classes.run}
                  onClick={() => addRun(run)}
                >
                  {run}
                </button>
              ))}
            </div>
            <div className={classes.wides}>
              <button onClick={() => addExtras(1, "wide")}>Wide</button>
              <button onClick={() => addExtras(1, "no-ball")}>No-Ball</button>
            </div>
            <div className={classes.out}>
              <button onClick={() => addWicket()}>Out</button>
              <button onClick={() => addWicket()}>Run out</button>
              <button onClick={() => addWicket()}>Catch out</button>
            </div>
            <div className={classes.ballNav}>
              <div className={classes.leftArrow}>
                <GoArrowLeft />
              </div>
              <div>Current</div>
              <div className={classes.rightArrow}>
                <GoArrowRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScoringController;

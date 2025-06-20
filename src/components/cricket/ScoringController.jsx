import React, { useEffect } from "react";
import classes from "./ScoringController.module.css";
import { useMatchContext } from "../../context/matchReducer.jsx";

import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useState } from "react";

function ScoringController() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const [selectedByes, setSelectedByes] = useState("Bat");
  const [selectedRun, setSelectedRun] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [selectedWicket, setSelectedWicket] = useState(null);



  const byes = (type) => {
    if (selectedByes == type) {
      return "";
    }
    setSelectedByes(type);
  };

  const addRun = (run) => {
    console.log("Clicked...");
    if (selectedRun == run) {
      setSelectedRun(null);
      return "";
    }

    setSelectedRun(run);
  };

  const addExtras = (run, extraType) => {
    if (selectedExtra == extraType) {
      setSelectedExtra(null);
      return "";
    }

    setSelectedExtra(extraType);
  };

  const addWicket = (type) => {
    if (selectedWicket == type) {
      setSelectedWicket(null);
      return "";
    }
    setSelectedWicket(type);
  };

  const nextBallHandler = () => {
    selectedByes !== null ? matchDispatch({ type: selectedByes }) : "";
    if (selectedRun !== null && selectedExtra == null) {
      matchDispatch({ type: "ADD_RUNS", payload: selectedRun });
      matchDispatch({ type: "BALL_TYPE", payload: "legal" });
    }
    if (selectedExtra !== null) {
      matchDispatch({ type: "ADD_RUNS", payload: selectedRun });
      matchDispatch({ type: "BALL_TYPE", payload: selectedExtra });
    }
    if (selectedWicket !== null) {
      console.log("set selcted wicket", selectedWicket);
      if(selectedExtra == null){
        matchDispatch({ type: "BALL_TYPE", payload: "legal" });
      }
      matchDispatch({ type: "ADD_WICKET", payload: selectedWicket });
    }
    console.log("BEFORE PUSH:::: ", matchState.ball)
    if(selectedExtra !==null || selectedRun !==null || selectedWicket !==null){
      matchDispatch({ type: "ADD_IN_OVER" });
    }
    console.log("THE FLUSHED BEFORE: ", selectedWicket)
    setSelectedRun(null);
    setSelectedExtra(null);
    setSelectedWicket(null);
    console.log("THE FLUSHED WICKETS: ", selectedWicket)
  };

  const byesValues = ["Bat", "Byes"];
  const runValues = [0, 1, 2, 3, 4, 5, 6];
  const extrasValues = { Wide: "WD", "No-Ball": "NB" };
  const outValues = ["out", "run-out", "catch-out"];



  return (
    <div className={classes.container}>
      <div className={classes.scoring}>
        <div className={classes.batters}>
          <div className={classes.batter} onClick={() => enterBatterName(1)}>
            Batter-name
          </div>
          <div className={classes.batter} onClick={() => enterBatterName(2)}>
            Batter-name
          </div>
        </div>
        <div className={classes.byesOrbat}>
          {byesValues.map((type, index) => (
            <button
              key={index}
              onClick={() => byes(type)}
              className={
                selectedByes !== null && selectedByes !== type
                  ? classes.byesunselected
                  : ""
              }
            >
              {type}
            </button>
          ))}
        </div>

        <div className={classes.mainPan}>
          <div>
            <div className={classes.runs}>
              {runValues.map((run, index) => (
                <button
                  key={index}
                  className={`${classes.run} 
                    ${
                      selectedRun !== null && selectedRun !== run
                        ? classes.unselected
                        : ""
                    }`}
                  onClick={() => addRun(run)}
                >
                  {run}
                </button>
              ))}
            </div>
            <div className={classes.wides}>
              {Object.entries(extrasValues).map(([extraType, value]) => (
                <button
                  key={value}
                  className={
                    selectedExtra !== null && selectedExtra !== value
                      ? classes.unselected
                      : ""
                  }
                  onClick={() => addExtras(1, value)}
                >
                  {extraType}
                </button>
              ))}
            </div>
            <div className={classes.out}>
              {outValues.map((outType, index) => (
                <button
                  key={index}
                  className={
                    selectedWicket !== null && selectedWicket !== outType
                      ? classes.unselected
                      : ""
                  }
                  onClick={() => addWicket(outType)}
                >
                  {outType.charAt(0).toUpperCase() + outType.slice(1)}
                </button>
              ))}
            </div>
            <div className={classes.ballNav}>
              <div className={classes.leftArrow}>
                <GoArrowLeft />
              </div>
              <div>Current</div>
              <div
                className={classes.rightArrow}
                onClick={nextBallHandler}
              >
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

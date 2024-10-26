import React from "react";
import classes from "./ScoringController.module.css";
import { useMatchContext } from "../../context/matchReducer.jsx";

import { FaLeftLong, FaRightLong } from "react-icons/fa6";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { HiArrowLongLeft } from "react-icons/hi2";
import { useState } from "react";

function ScoringController() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const [selectedByes, setSelectedByes] = useState('Bat');
  const [selectedRun, setSelectedRun] = useState(null);
  const [selectedExtra, setSelectedExtra] = useState(null);
  const [selectedWicket, setSelectedWicket] = useState(null);

  const byes = (type) => {
    if (selectedByes == type) {
      return "";
    }
    matchDispatch({ type: type });
    setSelectedByes(type);
  };

  const addRun = (run) => {
    console.log("Clicked...");
    if (selectedRun == run) return "";
    matchDispatch({ type: "ADD_RUNS", payload: run });
    matchDispatch({ type: "BALL_TYPE", payload: "legal" });
    setSelectedRun(run);
  };
  const addExtras = (run, extraType) => {
    if (selectedExtra == extraType) {
      setSelectedExtra(null);
      return "";
    }
    matchDispatch({ type: "ADD_RUNS", payload: run });
    matchDispatch({ type: "BALL_TYPE", payload: extrasValues[extraType] });
    setSelectedExtra(extraType);
  };

  const addWicket = (type) => {
    if (selectedWicket == type) {
      setSelectedWicket(null);
      return "";
    }
    switch (type) {
      case "out":
        if (selectedExtra !== null) break;
        else matchDispatch({ type: "BALL_TYPE", payload: "legal" });
        break;
      case "run-out":
        if (selectedExtra !== null || selectedByes === "byes") break;
        else matchDispatch({ type: "BALL_TYPE", payload: "legal" });
      case "catch-out":
        break;
    }
    matchDispatch({ type: "ADD_WICKET" });
    setSelectedWicket(type);
  };

  const byesValues = ["Bat", "Byes"];
  const runValues = [0, 1, 2, 3, 4, 5, 6];
  const extrasValues = { Wide: "WD", "No-Ball": "NB" };
  const outValues = ["Out", "Run-out", "Catch-out"];

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
                    selectedExtra !== null && selectedExtra !== extraType
                      ? classes.unselected
                      : ""
                  }
                  onClick={() => addExtras(1, extraType)}
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
                  {outType}
                </button>
              ))}
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

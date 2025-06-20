import classes from "./GameConfigForm.module.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useMatchContext } from "../../context/matchReducer";
import { GiConsoleController } from "react-icons/gi";
import useLocalStorage from "../../hooks/useLocalStorage";
import Teamup from "./Teamup.jsx";
import Toss from "./toss/Toss";
import TossDecision from "./toss/TossDecision.jsx";
import SelectPlayer from "../common/SelectPlayer.jsx";

function GameConfigForm({ game, onNext, onCancle, title }) {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const { setItem } = useLocalStorage("matchState");
  const [formPage, setFormPage] = useState(0);
  const navigateTo = useNavigate();

  // Event Handlers

  const handelInputChnage = (field, value) => {
    matchDispatch({ type: field, payload: value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setItem(matchState); // Store Match state in localstorage

    // If there are more pages navigate to next page otherwise to to next step
    if (formPage + 1 < gameForms[game].length) setFormPage(formPage + 1);
    else navigateTo(onNext);
  };

  const gameForms = {
    cricket: [
      [
        { type: "text", field: "team1", place: "Team 1" },
        { type: "text", field: "team2", place: "Team 2" },
      ],

      [{ type: "number", field: "maxOvers", place: "Max Overs" }],

      [{ isModule: true, module: <Teamup /> }],
      [{ isModule: true, module: <Toss /> }],
      [{ isModule: true, module: <TossDecision /> }],
      // [{ isModule: true, module: <SelectPlayer />}]
    ],
  };

  // Form Navigator
  const progressBarHandler = (i) => {
    if (formPage != i) setFormPage(i);
  };

  // Form Inputs
  const inputs = gameForms[game][formPage].map((inputField, index) => {
    if (inputField.isModule !== undefined && inputField.isModule) {
      return inputField.module;
    }
    return (
      <input
        key={index}
        type={inputField.type}
        value={matchState[inputField.field]}
        onChange={(e) => handelInputChnage(inputField.field, e.target.value)}
        placeholder={inputField.place}
        required
        className={classes.inpts}
        onFocus={(e) => e.target.select()}
        autoFocus={index === 0} // Auto focus on the first input field
      />
    );
  });

  // Progress Bar of Form
  const progressBar = gameForms[game].map((_, index) => (
    <div
      key={index}
      className={formPage === index ? classes.currentBar : ""}
      onClick={() => progressBarHandler(index)}
    />
  ));

  return (
    <form className={classes.modal} onSubmit={submitHandler}>
      <h1 className={classes.heading}>{title} Match</h1>
      <div className={classes.middle}>{inputs}</div>
      <div className={classes.bottom}>
        <div className={classes.progressBar}>{progressBar}</div>
        <div className={classes.formControl}>
          <button
            type="button"
            className={classes.cancelBtn}
            onClick={onCancle}
          >
            Cancel
          </button>
          <input type="submit" value="Next" className={classes.nextBtn} />
        </div>
      </div>
    </form>
  );
}

export default GameConfigForm;

import classes from "./GameConfigForm.module.css";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { useMatchContext } from "../../context/matchReducer";
import { GiConsoleController } from "react-icons/gi";
import useLocalStorage from "../../hooks/useLocalStorage";
import Teamup from "./TeamUp";

function GameConfigForm({ game, onNext, onCancle, title }) {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const { setItem } = useLocalStorage("matchState");
  const [formPage, setFormPage] = useState(0);
  const navigateTo = useNavigate();

  // Event Handlers
  const handleTeam1Change = (event) =>
    matchDispatch({ type: "team1", payload: event.target.value });
  const handleTeam2Change = (event) =>
    matchDispatch({ type: "team2", payload: event.target.value });
  const handleMaxOverChange = (event) =>
    matchDispatch({ type: "MAX_OVERS", payload: event.target.value });

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
        {
          type: "text",
          value: matchState.team1,
          place: "Team 1",
          onChange: handleTeam1Change,
        },
        {
          type: "text",
          value: matchState.team2,
          place: "Team 2",
          onChange: handleTeam2Change,
        },
      ],
      [
        {
          type: "number",
          value: matchState.maxOvers,
          place: "Max Overs",
          onChange: handleMaxOverChange,
        },
      ],
      [
        {
          isModule: true,
          module: Teamup(),
        }
      ]
    ],
  };

  // Form Navigator
  const progressBarHandler = (event, i) => formPage != i && setFormPage(i);

  // Form Inputs
  const inputs = gameForms[game][formPage].map((inputField, index) => {
    if (inputField.isModule!==undefined && inputField.isModule){
      return inputField.module
    }
    return (
      <input
        key={index}
        type={inputField.type}
        value={inputField.value}
        onChange={inputField.onChange}
        className={classes.inpts}
        placeholder={inputField.place}
        required
        onFocus={(e)=>{e.target.select(); e.target.autofocus=false}}
        autoFocus={index === 0} // Auto focus on the first input field
      />
    );
  });

  // Progress Bar of Form
  const progressBar = gameForms[game].map((_, index) => (
    <div
      key={index}
      className={formPage === index ? classes.currentBar : ""}
      onClick={(event) => progressBarHandler(event, index)}
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

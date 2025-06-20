import React, { useState } from "react";
import classes from "./ToggleButton.module.css";

function ToggleButton( {options, isToggled, onToggle}) {

// ___________________INFO________________________
// create the states in parents in each toggle buttons as follow
  // const [isToggled, setIsToggled] = useState(true);

  // const handleToggle = () => {
  //   setIsToggled((prev) => !prev);
  // };

  return (
    <label className={classes.toggleSwitch}>
      <input type="checkbox" checked={!isToggled} onChange={onToggle} />
      <span className={classes.slider}>
        <div className={classes.options}>
          <div className={isToggled ? classes.checkedOption : ""}>{options[0]}</div>
          <div className={isToggled ? "" : classes.checkedOption}>{options[1]}</div>
        </div>
      </span>
    </label>
  );
}

export default ToggleButton;

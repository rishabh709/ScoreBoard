import React, { useState } from "react";
import classes from "./ToggleButton.module.css";
import { motion } from "framer-motion";

function ToggleButton( {options, isToggled, onToggle, disabled=false}) {

// ___________________INFO________________________
// create the states in parents in each toggle buttons as follow
  // const [isToggled, setIsToggled] = useState(true);

  // const handleToggle = () => {
  //   setIsToggled((prev) => !prev);
  // };

  const disabledStyle = disabled==true?{opacity:'70%'}:{};

  return (
    <label className={classes.toggleSwitch} style={disabledStyle}>
      <input type="checkbox" checked={!isToggled} onChange={disabled==false? onToggle:''} />
      <motion.span className={classes.slider}>
        <div className={classes.options}>
          <div className={isToggled ? classes.checkedOption : ""}>{options[0]}</div>
          <div className={isToggled ? "" : classes.checkedOption}>{options[1]}</div>
        </div>
      </motion.span>
    </label>
  );
}

export default ToggleButton;

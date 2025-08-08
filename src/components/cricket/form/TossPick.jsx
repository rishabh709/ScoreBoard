import React from "react";
import ToggleButton from "../../common/ToggleButton";

function TossPick({ options, isToggled, onToggle }) {
  return (
    <ToggleButton options={options} isToggled={isToggled} onToggle={onToggle} />
  );
}

export default TossPick;

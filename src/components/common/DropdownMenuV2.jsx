import React from "react";
import classes from "./DropdownMenuV2.module.css";

function DropdownMenuV2({ options, setSelected }) {
  
  const handleChange = (e) => {
    setSelected(e.target.value);
  }
  return (
    <>
      <select id="num-select" name="number" onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </option>
        ))}
      </select>
    </>
  );
}

export default DropdownMenuV2;

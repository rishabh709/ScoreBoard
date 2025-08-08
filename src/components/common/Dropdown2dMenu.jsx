import React, { forwardRef } from "react";
import classes from "./Dropdown2dMenu.module.css";

const Dropdown2dMenu = forwardRef(function Dropdown2dMenu(props, ref) {
  return (
    <div className={classes.menu} ref={ref} style={props.style}>
      {props.children}
    </div>
  );
});

export default Dropdown2dMenu;

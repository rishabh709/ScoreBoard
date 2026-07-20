// just like DialogBox
import React, { useEffect, useRef } from "react";
import classes from "./DialogBox.module.css";

function AlertBox(props) {
  const dialogRef = useRef();

  // Trap focus within the dialog when it's open
  useEffect(() => {
    dialogRef.current.focus();
  }, []);

  return (
    <div
      className={classes.backdrop}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: "10",
        top: 0,
        left: 0,
      }}
      onClick={props.onClick}
    >
      <div className={classes.container}>
        <div className={classes.boxtitle}>Alert</div>
        <div className={classes.top}>{props.message}</div>
        <div className={classes.bottom}>
          <button type="button" ref={dialogRef} onClick={props.onOkay}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

export default AlertBox;

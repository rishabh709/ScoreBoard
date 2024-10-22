import React, { useEffect, useRef } from "react";
import classes from "./DialogBox.module.css";

function DialogBox(props) {
  const dialogRef = useRef();

  // Trap focus within the dialog when it's open
  useEffect(() => {
    dialogRef.current.focus();
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: "1",
        top: 0,
        left: 0,
      }}
      onClick={props.onClick}
    >
      <div className={classes.container}>
        <div className={classes.top}>{props.message}</div>
        <div className={classes.bottom}>
          <button type="button" onClick={props.onCancel}>
            No
          </button>
          <button type="button" ref={dialogRef} onClick={props.onOkay}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DialogBox;

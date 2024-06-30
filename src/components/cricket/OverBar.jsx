import React, { useContext, useEffect } from "react";

import classes from "./OverBar.module.css";
import { Context } from "../../context/scoreContext";

function OverBar(props) {
  const { currentOver } = useContext(Context);

  return (
    <div className={classes.container}>
      <div className={classes.over}>
        <div className={classes.balls}>
          {typeof props.over == 'undefined'
            ? currentOver.balls.map((ball, k) => {
                console.log("ran", typeof props.over)
                return <div key={k}>{ball.run}</div>;
              })
            : props.over.balls.map((ball, k) => {
                console.log("ran when", typeof props.over)
                return <div key={k}>{ball.run}</div>;
              })
          }
        </div>
        <div className={classes.bolwerName}>{currentOver.bolwerName}</div>
      </div>
    </div>
  );
}

export default OverBar;

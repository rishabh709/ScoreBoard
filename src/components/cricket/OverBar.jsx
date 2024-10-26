import React from "react";

import classes from "./OverBar.module.css";
import { useMatchContext } from "../../context/matchReducer";

function OverBar(props) {
  const{ state: matchState } = useMatchContext();

  return (
    <div className={classes.container}>
      <div className={classes.over}>
        <div className={classes.balls}>
          {typeof props.over == 'undefined'
          // when the over array is not provided
            ? matchState.over.balls.map((ball, k) => {
                return <div key={k}>{ball.run}</div>;
              })
          // when the over array is provided
            : props.over.balls.map((ball, k) => {
                return <div key={k}>{ball.run}</div>;
              })
          }
        </div>
        <div className={classes.bowlerName}>{matchState.over.bowlerName}</div>
      </div>
    </div>
  );
}

export default OverBar;

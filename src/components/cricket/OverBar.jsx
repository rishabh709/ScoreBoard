import React from "react";

import classes from "./OverBar.module.css";
import { useMatchContext } from "../../context/matchReducer";

function OverBar(props) {
  const { state: matchState } = useMatchContext();

  console.log(matchState.over.balls)
  console.log(matchState.overs)

  return (
    <div className={classes.container}>
      <div className={classes.over}>
        <div className={classes.balls}>
          {typeof props.over == "undefined"
            ? // when the over array is not provided
              matchState.over.balls.map((ball, k) => {
                var ballOutcome = ball.run;
                var bgColor
                if (ball.wicket != null) {
                  ballOutcome = "W";
                  bgColor = "#FF6767";
                  if (ball.type == "legal" && ball.run > 0) {
                    ballOutcome += ball.run;
                  } else if (ball.run > 0) {
                    ballOutcome += "+" + ball.type + "+" + ball.run;
                  } else if (ball.type != "legal") {
                    ballOutcome += "+" + ball.type;
                  }
                } else if (ball.type != "legal") {
                  ballOutcome = ball.type;
                  if (ball.run > 0) {
                    ballOutcome += ball.run;
                  }
                }
                if([4, 6].includes(ball.run)){
                  bgColor = "#7DE16D"
                }
                return <div key={k} style={{backgroundColor:bgColor}}>{ballOutcome}</div>;
              })
            : // when the over array is provided
              props.over.balls.map((ball, k) => {
                return <div key={k}>{ball.run}</div>;
              })}
        </div>
        <div className={classes.bowlerName}>{matchState.over.bowlerName}</div>
      </div>
    </div>
  );
}

export default OverBar;

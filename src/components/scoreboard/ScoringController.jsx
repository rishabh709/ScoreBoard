import React, { useContext, useEffect } from "react";
import { Context } from "../../context/scoreContext.jsx";
import classes from "./ScoringController.module.css";

function ScoringController() {
  const { currentBall, setCurrentBall, match, setMatch, currentOver, setCurrentOver } = useContext(Context);

  // Function to add runs and update states accordingly

  function addRun(n) {
    const updatedBall = { ...currentBall, run: n };
    setCurrentBall(updatedBall);
    
    // Update match runs and current over together
    setMatch(match => ({ ...match, runs: match.runs + n }));
    setCurrentOver(over => ({
      ...over,
      balls: [...over.balls, updatedBall]
    }));
  }
  function addExtras(n, extraType){
    if(extraType=="wide"){

      const updatedBall = {...currentBall, run:("WD"+((n==1)? "":n)), legal:extraType};
      setCurrentBall(updatedBall)

      setMatch(match =>({...match, runs: match.runs + n}));
      setCurrentOver(over => ({
        ...over,
        balls: [...over.balls, updatedBall]
      }))
    }
    console.log(currentOver);

  }
function addBall(n, extras="", wicket=0){
  if(extras=="wide"){
    addRun()
  }

}

  useEffect(() => {
    // Logging currentOver to observe changes
    // console.log(currentOver);
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.scoring}>
        <div className={classes.batters}>
          <div className={classes.batter}>Batter-Name</div>
          <div className={classes.batter}>Batter-Name</div>
        </div>
        <div className={classes.byesOrbat}>
          <button>Bat</button>
          <button>Leg Byes</button>
        </div>
        <div className={classes.runs}>
          <button className={classes.run} onClick={() => addRun(1)}>1</button>
          <button className={classes.run} onClick={() => addRun(2)}>2</button>
          <button className={classes.run} onClick={() => addRun(3)}>3</button>
          <button className={classes.run} onClick={() => addRun(4)}>4</button>
          <button className={classes.run} onClick={() => addRun(5)}>5</button>
          <button className={classes.run} onClick={() => addRun(6)}>6</button>
        </div>
        <div className={classes.wides}>
          <button onClick={()=> addExtras(1,'wide')}>Wide</button>
          <button onClick={()=> addExtras(1,'no-ball')}>No-Ball</button>
        </div>
        <div className={classes.out}>
          <button>Out</button>
          <button>Run out</button>
          <button>Catch out</button>
        </div>
      </div>
    </div>
  );
}

export default ScoringController;

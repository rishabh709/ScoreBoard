import React, { useContext, useEffect, useReducer } from "react";
import { Context } from "../../context/scoreContext.jsx";
import classes from "./ScoringController.module.css";
import { BallProvider, useBallContext } from "../../context/ballsReducer.jsx";
import {useMatchContext } from "../../context/matchReducer.jsx";
import { useOverContext } from "../../context/overReducer.jsx";

function ScoringController() {

  const { currentBall, setCurrentBall, match, setMatch, currentOver, setCurrentOver, overComplete, setOverComplete } = useContext(Context);

  //Implimenting newly created useReducer
  const { state: ballState, dispatch: ballDispatch } = useBallContext(); // Correct way to access ball context
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const { state: overState, dispatch: overDispatch } = useOverContext();
// Function to add runs and update states accordingly
  function ballRunHandler(run){
    ballDispatch({type:'run', payload:run});
    ballDispatch({type:'type', payload:'legal'});
    ballDispatch({type:'ballIncrement'});
  }
  function matchRunHandler(run){
    matchDispatch({type:'addRuns', payload:run});
  }
  function overBallHandler(){
    if (ballState.ballNumber<=6){
      overDispatch({type:'addBall', payload:ballState});
    } else{
      matchDispatch({type:'overs', payload:overState});
      overDispatch({type:'overIncrement'});
    }
  }

  // function addRun(run){
  //   ballRunHandler(run);
  //   matchRunHandler(run);
  //   overBallHandler()
  // }

  function addRun(n) {
    const updatedBall = { ...currentBall, run: n, type:"legal", ballNumber:currentBall.ballNumber+1};
    setCurrentBall(updatedBall);
    
    // Update match runs and current over together
    setMatch(match => ({ ...match, runs:[...match.runs, match.runs[match.currentInnings]+=n ] }));
    setCurrentOver(over => ({
      ...over,
      balls: [...over.balls, updatedBall]
    }));
  }

  function addExtras(n, extraType){
    const typeAlias = {"wide":"WD", "no-ball":"NB"}

    const updatedBall = {...currentBall, run:((typeAlias[extraType])+((n==1)? "":n)), type:extraType};
    setCurrentBall(updatedBall)

    setMatch(match =>({...match, runs: match.runs + n}));
    setCurrentOver(over => ({
      ...over,
      balls: [...over.balls, updatedBall]
    }))
  }

  function addWicket(){
    if(match.wickets[match.currentInnings]<10){
      const updatedBall = {...currentBall, wicket:1, run:"W", type:"legal", ballNumber:currentBall.ballNumber++}
      setCurrentBall(updatedBall)

      setMatch(match =>({...match, wickets:[...match.wickets, match.wickets[match.currentInnings]+=1]}))
      console.log(match);
      setCurrentOver(over => ({...over, balls:[...over.balls, updatedBall]}))
    }
  }

  useEffect(() => {
    // Logging currentOver to observe changes
    let bcount = currentBall.ballNumber;
    if(bcount==6){
      setMatch(match =>({...match, overs:[...match.overs, currentOver]}))
      setCurrentOver(over=>({...over, overNumber:currentOver.overNumber+1, balls:[]}))
      setCurrentBall(ball=>({...currentBall, ballNumber:0}))

      if(currentOver.overNumber==match.maxOvers){
        setMatch(match => ({...match, currentInnings:match.currentInnings+1}))
      }
    }
  }, [currentBall]);

  return (
    <div className={classes.container}>
      <div className={classes.scoring}>
        <div className={classes.batters}>
          <div className={classes.batter} onClick={()=>enterBatteName(1)}>Batter-name</div>
          <div className={classes.batter} onClick={()=>enterBatteName(2)}>Batter-name</div>
        </div>
        <div className={classes.byesOrbat}>
          <button>Bat</button>
          <button>Leg Byes</button>
        </div>

        <div className={classes.mainPan}>
          <div>
            <div className={classes.runs}>
              <button className={classes.run} onClick={() => addRun(0)}>0</button>
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
              <button onClick={() => addWicket()}>Out</button>
              <button onClick={() => addWicket()}>Run out</button>
              <button onClick={() => addWicket()}>Catch out</button>
            </div>
          </div>
        <div className={classes.addMore}>+</div>
        </div>
      </div>
    </div>
  );
}

export default ScoringController;

import React, { useContext, useEffect } from "react";
import { Context } from "../../context/scoreContext.jsx";
import classes from "./ScoringController.module.css";

function ScoringController() {
  const { currentBall, setCurrentBall, match, setMatch, currentOver, setCurrentOver } = useContext(Context);

  
  // Function to add runs and update states accordingly

  function addRun(n) {
    // let legal balls;
    // currentOver.balls.map(b =>{
    //   (b.type=="legal")? balls++:"";
    // })

    const updatedBall = { ...currentBall, run: n, type:"legal" };
    setCurrentBall(updatedBall);
    
    // Update match runs and current over together
    setMatch(match => ({ ...match, runs: match.runs + n }));
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
    if(match.wickets<10){
      const updatedBall = {...currentBall, wicket:1, run:"W", type:"legal"}
      setCurrentBall(updatedBall)
  
      setMatch(match =>({...match, wickets: match.wickets+1}))
      setCurrentOver(over => ({...over, balls:[...over.balls, updatedBall]}))
    }
  }

  useEffect(() => {
    // Logging currentOver to observe changes
    console.log("currentOver");
    let bcount =0;
    currentOver.balls.map((b)=>{
      if(b.type=="legal"){
        bcount++;
      }
      console.log("this", bcount)
      console.log(b)
    })
    if(bcount==6){
      setMatch(match =>({...match, overs:[...match.overs, currentOver]}))
      setCurrentOver(over=>({...over, overNumber:currentOver.overNumber+1, balls:[]}))
    }
    // console.log(currentOver);
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
          <button onClick={() => addWicket()}>Out</button>
          <button onClick={() => addWicket()}>Run out</button>
          <button onClick={() => addWicket()}>Catch out</button>
        </div>
      </div>
    </div>
  );
}

export default ScoringController;

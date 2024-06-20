import React, { useContext, useEffect } from "react";

import classes from "./OverBar.module.css";
import { Context } from "../../context/scoreContext";

function OverBar() {
  
  const {currentOver} = useContext(Context)
  
  // console.log("currentOver.balls");

  useEffect(() => {
    console.log("OverBar rendered:", currentOver);
  }, []);

 
  let name = "bolwer sing";
  return (
    <div className={classes.container}>
      <div className={classes.over}>
        <div className={classes.balls}>
          {currentOver.balls.map((ball, k)=>{
            return <div key={k}>{ball.run}</div>
          })}
        </div>
        <div className={classes.bolwerName}>{currentOver.bolwerName}</div>
      </div>
    </div>
  );
}

export default OverBar;

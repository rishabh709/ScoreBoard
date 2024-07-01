import React, { useContext } from 'react'
import classes from "./OverBox.module.css"
import { Context } from '../../context/scoreContext'

function OverBox(props) {
    let extraRuns =0;
    let runs =0;

  return (
    <div className={classes.over}>
        <div className={classes.balls}>
            {
                props.over.balls.map((ball, k)=>{
                    if(ball.type=="legal"){
                        typeof ball.run=="number"? runs += ball.run:""; 
                        if([4, 6].includes(ball.run)){
                            return <div style={{backgroundColor:"#7DE16D"}}>{ball.run}</div>
                        } if(ball.run == "W"){
                            return <div style={{backgroundColor:"#FF6767"}}>{ball.run}</div>
                        }
                        return <div style={{backgroundColor:"#D9D9D9"}}>{ball.run}</div>
                    } else{
                        typeof ball.run=="number"? extraRuns+=ball.run:"";
                    }
                })
            }
        </div>
        <div className={classes.overDetails}>
            <div className={classes.overScore}>
                <div>Runs: {runs}</div>
                <div>Extra: {extraRuns}</div>
            </div>
            <div className={classes.bolwername}>{props.over.bolwerName}</div>
        </div>
    </div>
  )
}

export default OverBox
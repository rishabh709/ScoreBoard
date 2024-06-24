import classes from "./ModalForm.module.css"
import { Link, useNavigate } from 'react-router-dom'

import { Context } from "../context/scoreContext"
import { useContext, useState } from "react"

function ModalForm(props) {
    const {match, setMatch} = useContext(Context);
    const [formPage, setFormPage] = useState(0)

    const handleName1Change = (event) =>{
        setMatch(match =>({...match, team1:event.target.value}));
    }
    const handleName2Change = (event) =>{
        setMatch(match =>({...match, team2:event.target.value}));
    }

    const navigateTo = useNavigate();
    const submitHandler = (event)=>{
        event.preventDefault();
        navigateTo(props.onNext)
    }

    const games = {cricket:[
        [
            {type:"text", value:match.team1, place:"Team 1", onChange:handleName1Change}, 
            {type:"text", value:match.team2, place:"Team 2", onChange:handleName2Change}], 
        [
            {type:"number", place:"Max Overs"}]]}


  return (
    <form className={classes.modal} onSubmit={submitHandler}>
        <h1 className={classes.heading}>{props.title} Match</h1>
        <div className={classes.middle}>
            {
                games[props.game][formPage].map((e)=>{
                    return <input type={e.type} name="" value={e.value} onChange={e.onChange} id="" className={classes.inpts} placeholder={e.place} />
                })
            }
            {/* <input type="text" name="" value={match.team1} onChange={handleName1Change} id="" className={classes.inpts} placeholder='Team 1' /> */}
            {/* <input type="text" name="" value={match.team2} onChange={handleName2Change} id="" className={classes.inpts} placeholder='Team 2' /> */}
        </div>
        <div className={classes.bottom}>
            <div className={classes.progressBar}>
                <div></div><div></div><div></div><div></div><div></div>
            </div>
            <div className={classes.formControl}>
                <button type="button" className={classes.cancelBtn} onClick={props.onCancle}>Cancel</button>
                {/* <Link type="submit" className={classes.nextBtn} to={props.onNext}>Next</Link> */}
                <input type="submit" value="Next" className={classes.nextBtn} />
            </div>
        </div>
    </form>

  )
}

export default ModalForm
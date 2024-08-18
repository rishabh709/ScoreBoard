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
        if(formPage+1<games[props.game].length){
            setFormPage(formPage+1);
        } else{
            navigateTo(props.onNext)
        }
    }

    const games = {cricket:[
        [
            {type:"text", value:match.team1, place:"Team 1", onChange:handleName1Change}, 
            {type:"text", value:match.team2, place:"Team 2", onChange:handleName2Change}], 
        [
            {type:"number", place:"Max Overs"}]
        ]}

    const progressBarHandler = (event, i)=>{
        console.log('clicked... the bar', i, event)
        (formPage!=i && setFormPage(i));
    }


  return (
    <form className={classes.modal} onSubmit={submitHandler}>
        <h1 className={classes.heading}>{props.title} Match</h1>
        <div className={classes.middle}>
            {
                games[props.game][formPage].map((e)=>{
                    return <input type={e.type} value={e.value} onChange={e.onChange} className={classes.inpts} placeholder={e.place} required autoFocus/>
                })
            }
            {/* <input type="text" name="" value={match.team1} onChange={handleName1Change} id="" className={classes.inpts} placeholder='Team 1' /> */}
            {/* <input type="text" name="" value={match.team2} onChange={handleName2Change} id="" className={classes.inpts} placeholder='Team 2' /> */}
        </div>
        <div className={classes.bottom}>
            <div className={classes.progressBar}>
                {
                    games[props.game].map((e, i)=>{
                        let cName=""
                        if(formPage==i){
                            cName= classes.currentBar;
                        }
                        return <div key={i} className={cName} onClick={(event)=>progressBarHandler(event, i)}/>
                    })
                }

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
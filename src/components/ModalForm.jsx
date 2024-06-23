import classes from "./ModalForm.module.css"
import { Link } from 'react-router-dom'

function ModalForm(props) {

  return (
    <div className={classes.modal}>
        <h1 className={classes.heading}>{props.title} Match</h1>
        <div className={classes.middle}>
            <input type="text" name="" id="" className={classes.inpts} placeholder='Team 1' />
            <input type="text" name="" id="" className={classes.inpts} placeholder='Team 2' />
        </div>
        <div className={classes.bottom}>
            <div className={classes.progressBar}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className={classes.formControl}>
                <button className={classes.cancelBtn} onClick={props.onCancle}>Cancel</button>
                <Link className={classes.nextBtn} to={props.onNext}>Next</Link>
            </div>
        </div>
    </div>

  )
}

export default ModalForm
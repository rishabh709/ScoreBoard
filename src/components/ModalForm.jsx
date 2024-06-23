import React from 'react'

import classes from "./ModalForm.module.css"

function ModalForm() {
  return (
    <div className={classes.modal}>
        <h1 className={classes.heading}>Cricket Match</h1>
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
                <button className={classes.cancelBtn}>Cancel</button>
                <button className={classes.nextBtn}>Next</button>
            </div>
        </div>
    </div>

  )
}

export default ModalForm
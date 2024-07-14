  import React from 'react'

  import classes from "./ModalFormLayout.module.css"

  function ModalFormLayout(props) {
    return (
      <form>
        <h1>{props.title}</h1>
        <div className={classes.middle}>
          {props.childeren}
        </div>
        <div className={classes.bottom}>
          <div className={classes.progressBar}>
            {/* add the logic */}
          </div>
          <div className={classes.formControls}>
            <button type="button" className={classes.cancelBtn} onClick={props.onCancle}>Cancel</button>
            <input type="submit" value="Next" className={classes.nextBtn} />
          </div>
        </div>
      </form>
    )
  }

  export default ModalFormLayout
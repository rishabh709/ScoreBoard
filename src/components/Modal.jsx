import classes from "./Modal.module.css"

function Modal(props) {

  return (
    <div className={classes.modal}>
        <p>Are you sure?</p>
        <button className={classes.cancelBtn} onClick={props.onClick}>Cancel</button>
        <button className={classes.acceptBtn}>Yes</button>
    </div>
  )
}

export default Modal
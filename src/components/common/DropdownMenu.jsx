import React from 'react'
import classes from './DropdownMenu.module.css'

function DropdownMenu(props) {
  return (
    <div className={classes.container} >
        <div className={classes.menu}>
            {props.children}
        </div>
    </div>
  )
}

export default DropdownMenu
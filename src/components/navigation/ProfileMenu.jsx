import React from 'react'

import classes from "./ProfileMenu.module.css";

function ProfileMenu() {
  return (
    <div className={classes.container} >
        <div className={classes.menu}>
            <div>Profile</div>
            <div>Account Settings</div>
        </div>
        <div className={classes.logout}>Log out</div>
    </div>
  )
}

export default ProfileMenu
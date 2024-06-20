import React from 'react'

import classes from "./LoginPage.module.css"

function LoginPage() {
  return (
    <div className={classes.menu}>
      <form>
      <h4>Login to your Account</h4>
       <input style={{color:"var(--main-font-color)"}} type='text' placeholder='Username' className={classes.inpt}></input>
       <input style={{color:"var(--main-font-color)"}} type='password' placeholder='Password' className={classes.inpt}></input>
       <input type='submit' className={classes.sbmt}></input>

      </form>
    </div>

  )
}

export default LoginPage
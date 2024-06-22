import React from 'react'

import classes from "./SignupPage.module.css"

function SignupPage() {
  return (
    <div className={classes.container}>
        <form action="">
          <div className={classes.editText}>
            <label htmlFor="email">Email </label>
            <input type="text" name="email" id="email" className={classes.inpt} />
          </div>
          <div className={classes.editText}>
            <label htmlFor="passwd">Password</label>
            <input type="password" name="passwd" id="passwd" className={classes.inpt} />
          </div>
            <input type="submit" value="SignUp" className={classes.sbmt} />
        </form>
    </div>
  )
}

export default SignupPage
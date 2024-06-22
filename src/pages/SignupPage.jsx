import React from 'react'

import classes from "./LoginPage.module.css"

function SignupPage() {
  return (
    <div className={classes.container}>
        <form action="">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" id="email" className={classes.inpt} />
            <label htmlFor="passwd">Password</label>
            <input type="password" name="passwd" id="passwd" className={classes.inpt} />
            <input type="submit" value="SignUp" className={classes.sbmt} />
        </form>
    </div>
  )
}

export default SignupPage
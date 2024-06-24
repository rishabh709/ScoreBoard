import React from 'react'

import classes from "./SignupPage.module.css"

function SignupPage() {
  return (
    <div className={classes.container}>
        <form action="">
          <h2>Sign-up</h2>
          <input type="text" name="email" id="email" placeholder='Email' className={classes.inpt} />
          {/* <label htmlFor="passwd">Password</label> */}
          <input type="password" name="passwd" id="passwd" placeholder='Password' className={classes.inpt} />
          <input type="submit" value="SignUp" className={classes.sbmt} />
        </form>
    </div>
  )
}

export default SignupPage
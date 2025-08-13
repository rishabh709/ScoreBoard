import React from "react";
import { Link } from "react-router-dom";

import classes from "./LoginPage.module.css";

function LoginPage() {
  return (
    <div className={classes.container}>
      <form>
        <div className={classes.title}>
          <h4>Log in</h4>
        </div>
        <div className={classes.body}>
          <input
            type="text"
            placeholder="Username"
            className={classes.inpt}
          ></input>
          <input
            type="password"
            placeholder="Password"
            className={classes.inpt}
          ></input>
          <div className={classes.forgetPasswd}>forget password</div>
        </div>
        <Link className={classes.signup} to="/signup">
          SignUp
        </Link>
        <div className={classes.bottom}>
          <input type="submit" className={classes.sbmt} value="Log in"></input>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

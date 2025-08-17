import React from "react";
import { Link } from "react-router-dom";

import classes from "./LoginPage.module.css";
import { motion } from "framer-motion";

function LoginPage() {
  return (
    <div className={classes.container}>
      <form>
        <div>
          <h2 className={classes.title}>Log in</h2>
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
          <motion.input
            whileHover={{ scale: 1.1 }}
            type="submit"
            className={classes.sbmt}
            value="Log in"
          ></motion.input>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;

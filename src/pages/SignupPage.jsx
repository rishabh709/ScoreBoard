import React, { useState } from "react";
import axios from "axios";

import classes from "./SignupPage.module.css";
import api from "../api/axiosInstance";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignupPage() {
  const [newUserCred, setNewUserCred] = useState({
    name: "",
    email: "",
    passwd: "",
  });
  const [isPasswdVisibile, setIsPasswdVisible] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    name = newUserCred.name;

    try {
      const response = await api.post("/signup", {
        player_name: newUserCred.name,
        email_id: newUserCred.email,
        password: newUserCred.passwd,
      });
      if (response.status == 200) {
        console.log("Created the user:::::");
      }
    } catch (error) {
      console.log("Sign up Failed: ", error);
    }
    console.log("Submitted.....");
  };
  const hanleChange = (event) => {
    const { name, value } = event.target;
    setNewUserCred((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <div>
          <h2 className={classes.title}>Sign-up</h2>
        </div>
        <div className={classes.body}>
          <input
            type="text"
            name="name"
            onChange={hanleChange}
            placeholder="Name"
            className={classes.inpt}
            required
          />
          <input
            type="text"
            name="email"
            onChange={hanleChange}
            placeholder="Email"
            className={classes.inpt}
            required
          />
          <div className={classes.passwdWrapper}>
            <input
              type="password"
              name="passwd"
              onChange={hanleChange}
              placeholder="Password"
              className={classes.inpt}
              required
            />
            <span className={classes.eyeIcon}>
              <FaEye/>
            </span>
          </div>
        </div>
        <Link className={classes.login} to="/login">
          Login (already have an account)
        </Link>
        <div className={classes.bottom}>
          <div className={classes.actionBar}>
            <motion.input
              whileHover={{ scale: 1.1 }}
              type="submit"
              value="SignUp"
              className={classes.sbmt}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupPage;

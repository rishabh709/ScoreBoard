import React, { useState } from 'react'
import axios from 'axios';

import classes from "./SignupPage.module.css"
import api from '../api/axiosInstance'

function SignupPage() {
  const [newUserCred, setNewUserCred]= useState({name:"", email:"", passwd:""});

  const submitHandler = async (event)=>{
    event.preventDefault();
    name = newUserCred.name

    try{
      const response = await api.post('/signup', {
        player_name: newUserCred.name,
        email_id: newUserCred.email,
        password: newUserCred.passwd
      })
      if(response.status == 200){
        console.log("Created the user:::::")
      }
    } catch(error){
      console.log("Sign up Failed: ", error);
    }
    console.log("Submitted.....");
  }
  const hanleChange = (event)=>{
    const {name, value} = event.target;
    setNewUserCred(prev=>({...prev, [name]:value}))
  }

  return (
    <div className={classes.container}>
        <form onSubmit={submitHandler}>
          <h2>Sign-up</h2>
          <input type="text" name="name" onChange={hanleChange} placeholder='Name' className={classes.inpt} required />
          <input type="text" name="email" onChange={hanleChange} placeholder='Email' className={classes.inpt} required />
          <input type="password" name="passwd" onChange={hanleChange} placeholder='Password' className={classes.inpt} required />
          <div className={classes.actionBar}>
            <input type="submit" value="SignUp" className={classes.sbmt} /> 
          </div>
        </form>
    </div>
  )
}

export default SignupPage
import React from 'react'
import classes from "./NavigationBar.module.css";
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav className={classes.navigationBar}>
      <div className={classes.navContainer}>
        <Link to="/" className={classes.logo}>Score Board</Link>
        {/* <div className={classes.searchBar}></div> */}
        <Link to={"/login"} className={classes.profile}></Link>
      </div>
    </nav>

  )
}

export default NavigationBar
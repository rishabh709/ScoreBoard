import React, { useState } from 'react'
import classes from "./NavigationBar.module.css";
import { Link } from 'react-router-dom';
import ProfileMenu from './ProfileMenu';

function NavigationBar() {
  const[profileMenuVisibility, setProfileMenuVisibility] = useState(false);

  function profileClickHandler(){
    setProfileMenuVisibility(!profileMenuVisibility);
  }

  return (
    <nav className={classes.navigationBar}>
      <div className={classes.navContainer}>
        <Link to="/" className={classes.logo}>Score Board</Link>
        {/* <div className={classes.searchBar}></div> */}
        {/* <Link to={"/login"} className={classes.profile}></Link> */}
        <>
          <div className={classes.profile} onClick={profileClickHandler}>
          </div>
          {profileMenuVisibility && <ProfileMenu/>}

          {/* Setting the profile menu to be visbible after onClick on
          profile icon and any follwing click outside the menu will
          menu to close.  */}

        </>
        
      </div>
    </nav>

  )
}

export default NavigationBar
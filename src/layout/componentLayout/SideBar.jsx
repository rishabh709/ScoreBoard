import React, { useState } from 'react'
import { motion } from "framer-motion";
import classes from './SideBar.module.css'

function SideBar() {
  const [sideBarIsVisible, setSideBarIsVisible] = useState(false);

  const toggleSidebarVisibility = () => {
    setSideBarIsVisible((prev) => !prev);
  };


  return (
    <div className={classes.sideBar}>
      <div className={classes.toggleButton} onClick={toggleSidebarVisibility}>
        <img
          src="src/assets/icons/settings-icon.svg"
          alt="Toggle Sidebar"
          className={sideBarIsVisible ? classes.slideRight : classes.slideLeft}
        />
      </div>

      <motion.div
        className={classes.sidebarContainer}
        animate={{
          x: sideBarIsVisible ? "-100%" : 0,
          width: sideBarIsVisible ? "30vw" : "0",
        }}
        initial={{ width: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className={classes.sidebarTitle}>
          <h2 style={{ width: sideBarIsVisible ? "100%" : "0px" }}>
            Match Configuration
          </h2>
        </div>
        {sideBarIsVisible && (
          <div className={classes.sidebarContent}>
            <div className={classes.sidebarList}>
              <div className={classes.list}>One</div>
              <div className={classes.list}>Two</div>
            </div>
            <div className={classes.cancel} onClick={toggleSidebarVisibility}>Close</div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default SideBar
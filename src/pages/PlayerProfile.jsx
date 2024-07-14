import React from 'react'

import classes from "./PlayerProfile.module.css"

function PlayerProfile() {
  return (
    <div className={classes.container}>
        <div className={classes.profileContainer}>
            <div className={classes.leftBox}>
                <div className={classes.profileImg}>
                    <img src="src\assets\images\playerImage.png" alt="PlayerProfileImg" srcset="" />
                </div>
            </div>
            <div className={classes.rightBox}>
                <div className={classes.topTitle}>
                    <div className={classes.userName}>Name Last-named</div>
                    <button className={classes.invite}>Invite</button>
                </div>
                <div className={classes.gamesPlays}>
                    <div>Cricket</div>
                    <div>Football</div>
                    <div>Chess</div>
                    {/* the game name played by player */}
                </div>
            </div>

        </div>
    </div>
  )
}

export default PlayerProfile
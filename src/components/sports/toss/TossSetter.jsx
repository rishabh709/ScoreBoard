import React from 'react'

function TossSetter() {
  return (
    <div className={classes.tossContainer}>
      <div className={classes.tossSetting}>
        <div className={classes.tossCaller}>
          <div>Who is calling?</div>
          <div>
            <div className={classes.radioBtn}>Team1</div>
            <div className={classes.radioBtn}>Team2</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TossSetter
import React from "react";

import classes from "./HeroSection.module.css";

function HeroSection() {
  return (
    <div className={classes.heroSection}>
      <div className={classes.leftBanner}>
        <img
          className={classes.logoImg}
          src="src\assets\volleyball.svg"
          alt="volleyball"
          srcset=""
        />
        <img
          className={classes.logoImg}
          src="src\assets\baseball.svg"
          alt="baseball"
          srcset=""
        />
        <img
          className={classes.logoImg}
          src="src\assets\football.svg"
          alt="football"
          srcset=""
        />
      </div>
      <div className={classes.midBanner}>
        <div className={classes.container}>
          <div className={classes.holders}>
            <div>
              <div className={classes.holder}></div>
              <div className={classes.holder}></div>
            </div>
            <div>
              <div className={classes.holder}></div>
              <div className={classes.holder}></div>
            </div>
          </div>
          <div className={classes.board}>
            <div className={classes.pane}>3</div>
            <div className={classes.dots}>
              <div className={classes.dot}></div>
              <div className={classes.dot}></div>
            </div>
            <div className={classes.pane}>7</div>
          </div>
        </div>
      </div>
      <div className={classes.rightBanner}>
        <img
          className={classes.logoImg}
          src="src\assets\cricket.svg"
          alt="cricket"
          srcset=""
        />
        <img
          className={classes.logoImg}
          src="src\assets\tennis.svg"
          alt="tennis"
          srcset=""
        />
        <img
          className={classes.logoImg}
          src="src\assets\basketball.svg"
          alt="basketball"
          srcset=""
        />
      </div>
    </div>
  );
}

export default HeroSection;

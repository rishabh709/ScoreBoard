import React, { useState } from "react";
import ToggleButton from "../../common/ToggleButton";
import BatSVG from "./../../../assets/team-icons/toss/bat.svg";
import BallSVG from "./../../../assets/team-icons/toss/ball.svg";
import { motion } from "framer-motion";

function ChoosingAfterToss() {
  const [isToggled, setIsToggled] = useState(true);

  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return (
    <div
      style={{
        width: "max-content",
        display: "flex",
        flexDirection: "column",
        boxSizing:'border-box',
        overflow:'visible'
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: "1",
          height: "140px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.img
          src={BatSVG}
          alt="bat"
          srcset=""
          initial={false}
          animate={{
            x: isToggled ? 0 : -150,
            opacity: isToggled ? 1 : 0,
          }}
          style={{
            position: "absolute",
            height: "max-height",
          }}
        />
        <motion.img
          src={BallSVG}
          alt="ball"
          srcset=""
          initial={false}
          animate={{
            x: isToggled ? 150 : 0,
            opacity: isToggled ? 0 : 1,
          }}
          style={{
            height: "max-height",
            position: "absolute",
          }}
        />

      </div>
      <ToggleButton
        options={["Batting", "Fielding"]}
        isToggled={isToggled}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default ChoosingAfterToss;


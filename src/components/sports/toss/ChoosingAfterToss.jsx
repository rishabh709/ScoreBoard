import React, { useState } from "react";
import ToggleButton from "../../common/ToggleButton";
import BatSVG from "./../../../assets/team-icons/toss/bat.svg";
import BallSVG from "./../../../assets/team-icons/toss/ball.svg";
import { motion } from "framer-motion";

function ChoosingAfterToss({ chooser, pickedSide }) {
  const [isToggled, setIsToggled] = useState(true);

  const options = ["Batting", "Fielding"];
  // You need to add choices like bat or ball and also need to fetch the respective icons
  // Try including the bat and ball img into OnClick function

  const handleToggle = () => {
    isToggled == !false
      ? pickedSide(options[0].toLowerCase())
      : pickedSide(options[1].toLowerCase());
    setIsToggled((prev) => !prev);
  };

  return (
    <div
      style={{
        width: "max-content",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        overflow: "visible",
      }}
    >
      <div style={{textAlign:'center'}}>{chooser + " Pick:"}</div>
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
        options={options}
        isToggled={isToggled}
        onToggle={handleToggle}
      />
    </div>
  );
}

export default ChoosingAfterToss;

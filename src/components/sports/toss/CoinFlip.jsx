import React, { useState } from "react";
import HeadsSvg from "./../../../assets/team-icons/toss/heads.svg";
import TailsSvg from "./../../../assets/team-icons/toss/tails.svg";
import classes from "./CoinFlip.module.css";
import { motion } from "framer-motion";

function CoinFlip() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [hasFlipped, setHasFlipped] = useState(false);

  const flip = () => {
    if (!isFlipping) {
      setIsFlipping(true);
      setHasFlipped(true);

      // Add multiple full spins to simulate random spinning
      const fullSpins = 5; // number of full 360° spins
      const baseRotation = fullSpins * 720;

      // We'll randomly add either 0 or 180 to land on heads or tails after spinning
      const finalOffset = Math.random() < 0.5 ? 0 : 180;

      const finalRotation = rotation + baseRotation + finalOffset;

      setRotation(finalRotation);
    }
  };

  const handleAnimationComplete = () => {
    // Determine heads or tails based on final resting angle
    const face = rotation % 360 === 0 ? "heads" : "tails";
    setResult(face);
    setIsFlipping(false);
  };

  return (
    <div>
      <div className={classes.container}>
        <motion.div
          key={rotation}
          animate={{ rotateX: rotation, scale: isFlipping? [1, 1.3, 1]:1 }}
          transition={{ duration: 3}}
          onAnimationComplete={() => handleAnimationComplete()}
          className={classes.coin}
        >
          <div className={classes.coin_face}>
            <img src={HeadsSvg} />
          </div>
          <div
            className={classes.coin_face}
            style={{ transform: "rotateX(180deg)" }}
          >
            <img src={TailsSvg} />
          </div>
        </motion.div>
        <button type="button" disabled={hasFlipped} onClick={() => flip()   }>
          {" "}
          Flip
        </button>
      </div>
    </div>
  );
}

export default CoinFlip;

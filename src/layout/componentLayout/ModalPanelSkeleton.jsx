import React, { useState } from "react";
import Backdrop from "../../components/common/Backdrop"; // Make sure to import your Backdrop component
import classes from "./ModalPanelLayout.module.css";
import SelectPlayer from "../../components/common/SelectPlayer";
import Toss from "../../components/sports/toss/Toss";

const ModalPanelSkeleton = ({children, heading, onBack, onNext, hideModal}) => {
  const [isVisible, setIsVisible] = useState(true);

  const showModal = () => {
    setIsVisible(true);
  };

//   const hideModal = () => {
//     setIsVisible(false);
//     // onExit();
//   };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modalBox}>
        <div className={classes.modalPanel}>
          <h3 className={classes.heading}>{heading}</h3>
          <div className={classes.body}>
            {children}
          </div>

          <div className={classes.footer}>
            <button className={classes.buttons} onClick={onBack}>
              Back
            </button>
            <button className={classes.buttons} onClick={onNext}>
              Next
            </button>
          </div>
        </div>
      </div>
      <Backdrop onClick={hideModal} />
    </div>
  );
};

export default ModalPanelSkeleton;

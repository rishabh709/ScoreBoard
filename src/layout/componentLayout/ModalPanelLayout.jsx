import React, { useState } from "react";
import Backdrop from "../../components/common/Backdrop"; // Make sure to import your Backdrop component
import classes from "./ModalPanelLayout.module.css";
import SelectPlayer from "../../components/common/SelectPlayer";
import Toss from "../../components/sports/toss/Toss";

const ModalPanelLayout = (props) => {
  const [isVisible, setIsVisible] = useState(true);

  const showModal = () => {
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <div className={classes.modalContainer}>
      <div className={classes.modalBox}>
        <div className={classes.modalPanel}>
          <h3 className={classes.heading}>{props.heading}</h3>
          <div className={classes.body}>
            {props.children}
            {/* {isVisible && <Toss />} */}
            {/* {isVisible && <SelectPlayer />} */}
          </div>
          <div className={classes.footer}>
            <button className={classes.buttons} onClick={props.onBack}>Back</button>
            <button className={classes.buttons} onClick={props.onNext}>Next</button>
          </div>
        </div>
      </div>
      {isVisible && <Backdrop onClick={hideModal} />}
    </div>
  );
};

export default ModalPanelLayout;

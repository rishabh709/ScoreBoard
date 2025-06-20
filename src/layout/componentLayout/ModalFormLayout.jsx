import React, { useEffect, useRef, useState } from "react";

import classes from "./ModalFormLayout.module.css";
import { useMatchContext } from "../../context/matchReducer";
import Backdrop from "../../components/common/Backdrop";
import { useNavigate } from "react-router-dom";

function ModalFormLayout(props) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [curPage, setCurPage] = useState(0);
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const inputRefs = useRef([]);
  const navigateTo = useNavigate();

  // Event Handlers
  const handleInputChange = (field, value) => {
    matchDispatch({ type: field, payload: value });
  };

  const onNextHandler = (event) => {
    event.preventDefault();
    if (curPage < props.formPages.length) {
      console.log("curPage:>>> ", curPage);
      setCurPage(curPage + 1);
    } else {
      // setIsModalVisible(false);
      navigateTo(props.onNext);
    }
  };
  useEffect(() => {
    inputRefs.current.length != 0 && inputRefs.current[0].focus();
  }, [curPage]);

  const handleKeyDown = (e, index) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const nextIndex = index + 1;
      if (inputRefs.current[nextIndex]) {
        inputRefs.current[nextIndex].focus();
      }
      if (nextIndex >= props.formPages[curPage].length) {
        setCurPage(curPage + 1);
        inputRefs.current = [];
        inputRefs.current[nextIndex].focus();
      }
    }
  };

  const addInputRefs = (el) => {
    console.log("el:>>> ", el);
    el !== null && inputRefs.current.push(el);
  };

  const inputs = props.formPages[curPage].map((inputField, index) => {
    if (inputField.isModule !== undefined && inputField.isModule) {
      const ModuleComponent = inputField.module;
      return <ModuleComponent />;
    }
    return (
      <fieldset className={`${classes.fieldset} `}>
        <legend className={classes.legend}>{inputField.field}</legend>
        <input
          ref={(el) => addInputRefs(el)}
          key={inputField.field} // Ensure unique keys
          type={inputField.type}
          name={inputField.field}
          placeholder={inputField.place}
          value={matchState[inputField.field]}
          onChange={(e) => handleInputChange(inputField.field, e.target.value)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
          required
          className={`${classes.inpts} `}
        />
      </fieldset>
    );
  });

  const progressBar = props.formPages.map((_, index) => (
    <div
      key={`progress-${index}`}
      className={curPage === index ? classes.currentBar : ""}
      onClick={() => setCurPage(index)}
    ></div>
  ));

  return (
    <>
      <form className={classes.modal} onSubmit={onNextHandler}>
        <h1 className={classes.heading}>{props.title} Match</h1>
        <div className={classes.middle}>{inputs}</div>
        <div className={classes.bottom}>
          <div className={classes.progressBar}>{progressBar}</div>
          <div className={classes.formControls}>
            <button
              type="button"
              className={classes.cancelBtn}
              onClick={props.onCancle}
            >
              Cancel
            </button>
            <input type="submit" value="Next" className={classes.nextBtn} />
          </div>
        </div>
      </form>
      {isModalVisible && <Backdrop />}
    </>
  );
}

export default ModalFormLayout;

import React from "react";

function FormInput() {
  
    const handelInputChnage = (field, value) => {
    matchDispatch({ type: field, payload: value });
  };

  return (
    <input
      key={index}
      type={inputField.type}
      value={matchState[inputField.field]}
      onChange={(e) => handelInputChnage(inputField.field, e.target.value)}
      placeholder={inputField.place}
      required
      className={classes.inpts}
      onFocus={(e) => e.target.select()}
      autoFocus={index === 0} // Auto focus on the first input field
    />
  );
}

export default FormInput;

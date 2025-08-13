import React, { useState } from "react";
import { useMatchContext } from "../../context/matchReducer.jsx";

function FormInput(inputField) {
  const { state: matchState } = useMatchContext();

  const [inputData, setInputData] = useState('')
  const handleFocus = (event) => {
    event.target.select()
  }

  inputField = inputField.inputField

  return (
    <input
      type={inputField.type}
      value={inputField.data==null? "":inputField.data}
      onChange={(e) => inputField.setData(e.target.value)}
      placeholder={inputField.place}
      required
      // className={classes.inpts}
      style={{
        border:'none',
        height:'40px',
        width:'100%',
        borderRadius:'7px',
        background:'#D9D9D9',
        boxSizing: 'border-box',
        color: 'black',
        padding: '0 5%',
        fontSize: '1rem'
      }}
      onFocus={handleFocus}

    />
  );
}

export default FormInput;

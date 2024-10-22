import React, { useReducer, useContext, createContext } from "react";

const BallContext = createContext();
const intialBallsState = {
  ballId: "",
  ballNumber: 0,
  overId: "",
  run: 0,
  type: null,
  wicket: 0,
  legbyes: false,
};

function ballReducer(state, action) {
//   console.log(state);
  switch (action.type) {
    case "run":
      return { ...state, run: action.payload };

    case "type":
      if (action.payload == "legal") {
        let tempBallNum = state.ballNumber;
        if (state.ballNumber < 6) tempBallNum += 1;
        else if (state.ballNumber == 6) tempBallNum = 1;
        return {
          ...state,
          ballNumber: tempBallNum,
          type: action.payload,
        };
      }

      return { ...state, type: action.payload };

    case "wicket":
      return { ...state, wicket: 1 };

    case "legbyes":
      return { ...state, legbyes: action.payload };

    case "RESET_BALL_NUMBER":
      return { ...state, ballNumber: 0 };

    default:
      return state;
  }
}

export function BallProvider({ children }) {
  const [state, dispatch] = useReducer(ballReducer, intialBallsState);

  return (
    <BallContext.Provider value={{ state, dispatch }}>
      {children}
    </BallContext.Provider>
  );
}

export function useBallContext() {
  const context = useContext(BallContext);
  if (!context) {
    throw new Error("useBallContext must be used within a BallProvider");
  }
  return context;
}

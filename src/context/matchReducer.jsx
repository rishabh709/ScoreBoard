import React, { useReducer, useContext, createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const MatchContext = createContext();

const { getItem } = useLocalStorage("matchState");

const initialMatchState = {
  matchId: "",
  team1: "Team A",
  team2: "Team B",
  maxOvers: 3,
  currentInnings: 0,
  runs: [0, 0],
  wickets: [0, 0],
  ball: {
    overId: "",
    type: "",
    run: 0,
    wicket: 0,
    byes: false,
  },
  over: {
    overId: "",
    bowlerName: "Jin Yan",
    balls: []
  },
  overNum: [0, 0],
  ballNum: [0, 0],
  overs: [],
  result: "",
};

function matchReducer(state, action) {
  switch (action.type) {
    case "team1":
      return {
        ...state,
        team1: action.payload,
      };
    case "team2":
      return {
        ...state,
        team2: action.payload,
      };
    case "CHANGE_INNING":
      return changeInnings(state);

    case "MAX_OVERS":
      return {
        ...state,
        maxOvers: action.payload,
      };
    case "INSERT_IN_OVERS":
      return {
        ...state,
        overs: [...state.overs, action.payload],
      };
    case "overIncrement":
      const updatedCurOver = [...state.curOver];
      updatedCurOver[state.currentInnings] += 1;
      return {
        ...state,
        curOver: updatedCurOver,
      };

    case "SET_MATCH_STATE":
      return action.payload;

    case "RESET_STATE":
      return initialMatchState;

    case "ADD_RUNS":
      return addRuns(state, action.payload);

    case "BALL_TYPE":
      return handleBallType(state, action.payload);

    case "ADD_WICKET":
      return addWickets(state);

    case "BYES":
      const updatedBallByes = [...state.ball];
      updatedBallByes.byes = action.payload;
      return {
        ...state,
        ball: updatedBallByes,
      };
    default:
      return state;
  }
}

function addRuns(state, runs) {
  const updatedBallRun = { ...state.ball, run: runs };

  const updatedRun = [...state.runs];
  updatedRun[state.currentInnings] += runs;

  return {
    ...state,
    runs: updatedRun,
    ball: updatedBallRun,
  };
}

function addWickets(state) {
  const updatedBallWicket = { ...state.ball, wicket: 1 };

  const updatedWickets = [...state.wickets];
  updatedWickets[state.currentInnings] += 1;

  console.log(updatedWickets)
  if (updatedWickets[state.currentInnings] >= 10) {
    return changeInnings({...state,
        ball: updatedBallWicket,
        wickets: updatedWickets,    
    });
  }

  return {
    ...state,
    ball: updatedBallWicket,
    wickets: updatedWickets,
  };
}

function handleBallType(state, ballType) {
  const updatedBallType = { ...state.ball, type: ballType };
  const insertIntoOver = {...state.over}
  const updatedBallNum = [...state.ballNum];
  const updatedOverNum = [...state.overNum];

  console.log(ballType)
  if (ballType == "legal") {
    const curBallNum = state.ballNum[state.currentInnings];
    const curOverNum = state.overNum[state.currentInnings];

    if (curBallNum < 5) {
      updatedBallNum[state.currentInnings] += 1;

    } else if (curBallNum == 5) {
        // last ball of the over so increase over by 1 and reseting ball num
      updatedOverNum[state.currentInnings] += 1;
      updatedBallNum[state.currentInnings] = 0;
      
      // pushing over to overs array

      if (updatedOverNum[state.currentInnings] >= state.maxOvers) {
        return changeInnings({
            ...state,
            ball: updatedBallType,
            ballNum: updatedBallNum,
            overNum: updatedOverNum,
        });
      }
    }
  }
  return {
    ...state,
    ball: updatedBallType,
    ballNum: updatedBallNum,
    overNum: updatedOverNum,
  };
}
function changeInnings(state) {
  return {
    ...state,
    currentInnings: state.currentInnings + 1,
  };
}

export function MatchProvider({ children }) {
  const [state, dispatch] = useReducer(matchReducer, initialMatchState);

  return (
    <MatchContext.Provider value={{ state, dispatch }}>
      {children}
    </MatchContext.Provider>
  );
}

export function useMatchContext() {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatchContext must be used within a MatchProvider");
  }
  return context;
}

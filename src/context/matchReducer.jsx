import React, {
  useReducer,
  useContext,
  createContext,
  useState,
  startTransition,
} from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const MatchContext = createContext();

const { getItem } = useLocalStorage("matchState");

const initialMatchState = {
  matchId: "",
  team1: "Team A",
  team2: "Team B",
  maxOvers: 3,
  currentInnings: 0,
  tossCaller:'',
  tossWinner:null,
  battingTeam: '',
  bolwingTeam: '',
  runs: [0, 0],
  wickets: [0, 0],
  ball: {
    overId: "",
    type: "",
    run: 0,
    wicket: null,
    byes: false,
  },
  over: {
    overId: "",
    bowlerName: "Jin Yan",
    balls: [],
  },
  overNum: [0, 0],
  ballNum: [0, 0],
  overs: [],
  players: {
    team1: ["Rohit Sharma", "Virat Kohli", "KL Rahul", "Shubman Gill", "Hardik Pandya", "Jasprit Bumrah", "Ravichandran Ashwin", "Ravindra Jadeja", "Mohammad Shami", "Suryakumar Yadav", "Rishabh Pant"],
    team2: ["Brandon Macullam", "Krish Gayle", "AB Devilliars"],
  },
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
    case "ADD_IN_OVER":
      return addBallIntoOver(state);

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
      return addWickets(state, action.payload);

    case "BYES":
      const updatedBallByes = [...state.ball];
      updatedBallByes.byes = action.payload;
      return {
        ...state,
        ball: updatedBallByes,
      };
    case "INSERT_PLAYER_INTO":
      return insertPlayerIntoTeam(state, action.playerName, action.team, action.index);
    case "REMOVE_PLAYER_AT":
      return removePlayerAt(state, action.id, action.teamName);
    case "SET_BOLWER_NAME":
      return{
        ...state,
        over: {...state.over, bowlerName:action.payload}
      }
    case "SET_TOSS_WINNER":
      return{
        ...state,
        tossWinner: action.payload
      }
    case "SET_BATTING_TEAM":
      return{
        ...state,
        battingTeam: action.payload
      }
    case "SET_BOLWING_TEAM":
      return{
        ...state,
        bolwingTeam: action.payload
      }
    default:
      return state;
  }
}
function insertPlayerIntoTeam(state, playerName, teamName, index = undefined) {
  const updatedTeam = [...state.players[teamName]];

  console.log('inside the matchReducer', playerName, index)

  index>=0
    ? updatedTeam.splice(index, 0, playerName) // if index is provided (start index, delete index, element to insert)
    : updatedTeam.push(playerName);

  return {
    ...state,
    players: { ...state.players, [teamName]: updatedTeam },
  };
}

function removePlayerAt(state, id, teamName) {
  const updatedTeam = [...state.players[teamName]];
  updatedTeam.splice(id, 1);
  console.log(updatedTeam);
  return {
    ...state,
    players: { ...state.players, [teamName]: updatedTeam },
  };
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

function addWickets(state, wicketType) {
  const updatedBallWicket = { ...state.ball, wicket: wicketType };

  const updatedWickets = [...state.wickets];
  updatedWickets[state.currentInnings] += 1;

  console.log(updatedWickets);
  if (updatedWickets[state.currentInnings] >= 10) {
    return changeInnings({
      ...state,
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
  const insertIntoOver = { ...state.over };
  const updatedBallNum = [...state.ballNum];
  const updatedOverNum = [...state.overNum];
  // when ballType is extra
  const updatedRun = [...state.runs];

  console.log(ballType, ballType == "legal");
  if (ballType == "legal") {
    const curBallNum = state.ballNum[state.currentInnings];
    const curOverNum = state.overNum[state.currentInnings];
    console.log("CUR BALL NUM: ", curBallNum);
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
  } else {
    updatedRun[state.currentInnings] += 1;
  }
  // else when ball is not a legal delivery
  return {
    ...state,
    runs: updatedRun,
    ball: updatedBallType,
    ballNum: updatedBallNum,
    overNum: updatedOverNum,
  };
}

function addBallIntoOver(state) {
  const updatedBalls = [...state.over.balls, state.ball];
  const updatedOver = { ...state.over, balls: updatedBalls };

  // TO DO manage the over change and push of over into overs;
  if (
    (state.ballNum[state.currentInnings] == 0 &&
      state.overNum[state.currentInnings] > 0) ||
    state.overNum == state.maxOvers
  ) {
    const updatedOvers = [...state.overs, updatedOver];
    return {
      ...state,
      ball: { ...initialMatchState.ball, overId: state.ball.overId },
      over: { ...state.over, balls: [] },
      overs: updatedOvers,
    };
  }

  console.log(updatedBalls);
  return {
    ...state,
    ball: { ...initialMatchState.ball, overId: state.ball.overId },
    over: updatedOver,
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

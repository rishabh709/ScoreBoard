import React, {useReducer, useContext, createContext} from "react"
import useLocalStorage from "../hooks/useLocalStorage";

const MatchContext = createContext();

const {getItem} = useLocalStorage('matchState');

const initialMatchState = {
    matchId: "",
    team1: "Team A",
    team2: "Team B",
    currentInnings: 0,
    maxOvers: 3,
    curOver: [0, 0],
    curBall: [0, 0],
    runs: [0, 0],
    wickets: [0, 0],
    overs: [],
    result:'',
}

function matchReducer(state, action) {
    // console.log("State of Match",state)
    switch(action.type){
        case 'team1':
            return{
                ...state,
                team1: action.payload,
            }
        case 'team2':
            return{
                ...state,
                team2: action.payload,
            }
        case 'CHANGE_INNING':
            return{
                ...state,
                currentInnings: state.currentInnings+1,
            }
        case 'maxOvers':
            return{
                ...state,
                maxOvers: action.payload,
            }
        case 'addRuns':
            const update = [...state.runs];
            update[state.currentInnings] += action.payload;  
            return{
                ...state,
                runs: update ,
            }
        case 'ADD_WICKET':
            const updatedWickets = [...state.wickets];
            updatedWickets[state.currentInnings] += 1;
            return{
                ...state,
                wickets: updatedWickets,
            }
        case 'INSERT_IN_OVERS':
            return{
                ...state,
                overs: [...state.overs, action.payload]
            }
        case 'ballUpdate':
            const updatedCurBall = [...state.curBall];
            updatedCurBall[state.currentInnings] = action.payload;            
            return{
                ...state,
                curBall: updatedCurBall,
            }
        case 'overIncrement':            
            const updatedCurOver = [...state.curOver];
            updatedCurOver[state.currentInnings] += 1;
            return{
                ...state,
                curOver: updatedCurOver,
            }
        
        case 'SET_MATCH_STATE':
            return action.payload

        case 'RESET_STATE':
            return initialMatchState

        default:
            return state;
    }
}

export function MatchProvider({children}){
    const [state, dispatch] = useReducer(matchReducer, initialMatchState);
    
    return(
        <MatchContext.Provider value={{state, dispatch}}>
            {children}
        </MatchContext.Provider>
    );
}

export function useMatchContext(){
    const context = useContext(MatchContext)
    if (!context) {
        throw new Error('useMatchContext must be used within a MatchProvider');
    }
    return context;
}
import React, {useReducer, useContext, createContext} from "react"

const MatchContext = createContext();
const initialMatchState = {
    matchId: "",
    team1: "Team A",
    team2: "Team B",
    currentInnings: 0,
    maxOvers: 20,
    runs: [0, 0],
    wickets: [0, 0],
    overs: [],
}

function matchReducer(state, action) {
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
        case 'currentInnings':
            return{
                ...state,
                currentInnings: action.payload,
            }
        case 'maxOvers':
            return{
                ...state,
                maxOvers: action.payload,
            }
        case 'addRuns':
            const updatedRuns = state.runs;
            console.log("runs::::", state.runs, updatedRuns, action.payload);
            updatedRuns[state.currentInnings] += action.payload;
            return{
                ...state,
                runs: updatedRuns,
            }
        case 'wickets':
            updatedWickets = state.wickets;
            updatedWickets[state.currentInnings] += action.payload;
            return{
                ...state,
                wickets: updatedWickets,
            }
        case 'overs':
            return{
                ...state,
                overs: [...state.overs, action.payload]
            }
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
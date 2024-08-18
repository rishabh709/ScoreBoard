import React, { useState } from 'react'

export const Context = React.createContext();
export const ContextProvider = ({children})=>{
    const[currentBall, setCurrentBall] = useState({
        ballId: '',
        ballNumber: 0,
        overId: '',
        run: 0,
        type: null,
        wicket: 0,
        legbyes: false
    });
    
    const[currentOver, setCurrentOver ] = useState({
        overNumber: 0,
        overId: "",
        bolwerName: "",
        balls: [],
        inning: 1,
    });
    const[match, setMatch ] = useState({
        matchId: "",
        team1: "",
        team2: "",
        currentInnings: 0,
        maxOvers: 20,
        runs: [0, 0],
        wickets: [0, 0],
        overs: [],
    });

    const [overComplete, setOverComplete] = useState(false);

    return(
        <Context.Provider value={{
            match, setMatch,
            currentOver, setCurrentOver,
            currentBall, setCurrentBall,
            overComplete, setOverComplete,
            }}>
            {children}
        </Context.Provider>
    )
}
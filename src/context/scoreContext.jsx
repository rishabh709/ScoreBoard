import React, { useState } from 'react'

export const Context = React.createContext();
export const ContextProvider = ({children})=>{
    const[currentBall, setCurrentBall] = useState({
        ballId: '',
        overId: '',
        run: 0,
        wicket: 0,
        type: null,
        legbyes: false
    });
    
    const[currentOver, setCurrentOver ] = useState({
        overNumber: 1,
        overId: "",
        bolwerName: "",
        balls: [],
    });
    const[match, setMatch ] = useState({
        matchId: "",
        team1: "",
        team2: "",
        maxOver: 20,
        runs: 10,
        wickets:0,
        overs: []
    })

    return(
        <Context.Provider value={{
            match, setMatch,
            currentOver, setCurrentOver,
            currentBall, setCurrentBall
            }}>
            {children}
        </Context.Provider>
    )
}
import React, { useReducer, useContext, createContext} from "react";


const BallContext = createContext();
const intialBallsState = {
    ballId: '',
    ballNumber: 0,
    overId: '',
    run: 0,
    type: null,
    wicket: 0,
    legbyes: false}

function ballReducer(state, action){
    switch (action.type){
        case 'ballIncrement':
            return {
                ...state,
                ballNumber: state.ballNumber+1,
            }
        case 'run':
            return {
                ...state,
                run: action.payload,
            };
        case 'type':
            return{
                ...state,
                type: action.payload,
            };
        case 'out':
            return{
                ... state,
                wicket: action.payload,
            };
        case 'legbyes':
            return{
                ...state,
                legbyes: action.payload,
            }
        default:
            return state;
    }
}

export function BallProvider({children}){
    const [state, dispatch] = useReducer(ballReducer, intialBallsState);

    return(
        <BallContext.Provider value={{state, dispatch}}>
            {children}
        </BallContext.Provider>
    );
}

export function useBallContext(){
    const context = useContext(BallContext)
    if (!context) {
        throw new Error('useBallContext must be used within a BallProvider');
    }
    return context;
}
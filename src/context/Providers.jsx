import { BallProvider } from "./ballsReducer"
import { MatchProvider } from "./matchReducer"
import { OverProvider } from "./overReducer"

export const AppProviders = ({children}) =>{
// function AppProviders(children){
return(
    <BallProvider>
        <MatchProvider>
            <OverProvider>
                {children}
            </OverProvider>
        </MatchProvider>
    </BallProvider>
);
}
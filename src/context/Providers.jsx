import { MatchProvider } from "./matchReducer";

export const AppProviders = ({ children }) => {
  // function AppProviders(children){
  return <MatchProvider>{children}</MatchProvider>;
};

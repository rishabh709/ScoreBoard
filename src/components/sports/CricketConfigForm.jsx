import React, { useEffect, useRef, useState } from "react";
import ModalPanelLayout from "../../layout/componentLayout/ModalPanelLayout";
import FormInput from "../common/FormInput";
import ToggleButton from "../common/ToggleButton";
import Logo from "../common/Logo";
import Teaminfo from "../cricket/form/Teaminfo";
import Teamup from "./Teamup";
import CoinFlip from "./toss/CoinFlip";
import { CgEnter } from "react-icons/cg";
import { useMatchContext } from "../../context/matchReducer";
import ChoosingAfterToss from "./toss/ChoosingAfterToss";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SelectBatterAndBolwer from "../cricket/form/SelectBatterAndBolwer";
function CricketConfigForm({referPage}) {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const [currentTab, setCurrentTab] = useState(0);
  const wrapperRef = useRef();

  const navigateto = useNavigate();

  const [prevTab, setPrevTab] = useState(currentTab);
  const tabDirection = currentTab > prevTab ? 1 : -1;

  // try to avoid it...
  useEffect(() => {
    setPrevTab(currentTab);
  }, [currentTab]);

  const onNext = () => {
    const currentTabValidate = tabs[currentTab].validate();
    console.log("Carrent valid: ", currentTabValidate);
    if(currentTabValidate==true){
      currentTab == Object.keys(tabs).length - 1
        ? navigateto(referPage)
        : setCurrentTab(currentTab + 1);
    } 
  };
  const onBack = () => {
    currentTab == 0 ? "" : setCurrentTab(currentTab - 1);
  };

  const [isHeads, setIsHeads] = useState(true);
  const tossOptions = ["Heads", "Tails"];

  const [isCoinFlipped, setIsCoinFlipped] = useState(false);

  const handleTossToggle = () => {
    const newIsHeads = !isHeads;
    setIsHeads(newIsHeads);

    matchDispatch({
      type: "SET_TOSS_PICKS",
      payload: {
        team1Pick: tossOptions[newIsHeads ? 0 : 1].toLowerCase(),
        team2Pick: tossOptions[newIsHeads ? 1 : 0].toLowerCase(),
      },
    });
    console.log("isHeads", newIsHeads);
    console.log(
      "MATCHREDUCER ISSUE: ",
      tossOptions[isHeads ? 0 : 1].toLowerCase(),
      tossOptions[isHeads ? 1 : 0].toLowerCase()
    );
  };

  const winHandler = (team) => {
    matchDispatch({type:"SET_TOSS_WINNER", payload: team})
  }

  const pickedSide = (picked) => {
    console.log("Im inside the pickside function:: we will be seeing the futurea;;;; ", picked);
    if(picked=='batting'){
      if(matchState.tossWinner='team1'){
        // HOW DO YOU KNOW THAT team2 will be always loosing
        matchDispatch({type:"SET_BATTING_TEAM", payload:'team1'})
        matchDispatch({type:"SET_BOLWING_TEAM", payload:'team2'})
      } else{
        matchDispatch({type:"SET_BATTING_TEAM", payload:'team2'})
        matchDispatch({type:"SET_BOLWING_TEAM", payload:'team1'})
      }
    
      // you have to check in which format the bolwing team name is mentioned so that the opposite one will get the bolwing or the opposite
    } else{
      if(matchState.tossWinner='team1'){
        matchDispatch({type:"SET_BOLWING_TEAM", payload:'team1'})
        matchDispatch({type:"SET_BATTING_TEAM", payload:'team2'})
      } else{
        matchDispatch({type:"SET_BOLWING_TEAM", payload:'team2'})
        matchDispatch({type:"SET_BATTING_TEAM", payload:'team1'})
      }
    }

  }
  const setBatting = (battingTeam) => {
    matchDispatch({type:"SET_BATTING_TEAM", payload:battingTeam})
  }
  const setBolwing = (bolwingTeam) => {
    matchDispatch({type:"SET_BOLWING_TEAM", payload:bolwingTeam})
  }

  const teamLogos = import.meta.glob("/src/assets/team-icons/TeamIcons/*.svg", {
    eager: true,
    import: "default",
  });
  const [team1Logo, setTeam1Logo] = useState(null);
  const [team2Logo, setTeam2Logo] = useState(null);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");

  const [overs, setOvers] = useState(null);

  const tabs = {
    0: { component: <Teaminfo />, alignItems: "center", title:"Enter Team Name & Over", validate: ()=>{
      if(matchState.team1=='' || matchState.team2=='') return false;
      if(matchState.maxOvers==undefined || matchState.maxOvers<=0) return false;
      return true;
    }},
    1: { component: <Teamup />, alignItems: "flex-start", title:"Enter Players", validate:()=>{
      if(matchState.players.team1.length==0 || matchState.players.team2.length==0) return false;
      return true;
    }},
    2: {
      component: (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            boxSizing: "border-box",
            flexFlow: "wrap",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent:'space-between',
                width: "100%",
                flex:'1',
              }}
            >
              <h3>{matchState.team1}</h3>
              <ToggleButton
                options={tossOptions}
                isToggled={isHeads}
                onToggle={handleTossToggle}
                disabled={isCoinFlipped}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                justifyContent:'space-between',
                width: "100%",
                flex:'1',
              }}
            >
              <h3>{matchState.team2}</h3>
              <ToggleButton
                options={tossOptions}
                isToggled={!isHeads}
                onToggle={handleTossToggle}
                disabled={isCoinFlipped}
              />
            </div>
          </div>
          <CoinFlip TeamsTossPicks={matchState.tossPicked} winHandler={winHandler} setIsCoinFlipped={setIsCoinFlipped}/>
        </div>
      ),
      alignItems: "center",
      title:"Toss",
      validate:()=>{
        if(matchState.tossWinner=='' || matchState.tossWinner==undefined) return false;
        return true;
      },
    },
    3: {
      component: <ChoosingAfterToss chooser={matchState[matchState.tossWinner]} pickedSide={pickedSide}/>,
      alignItems: "center",
      title:"Choose Batting or Fielding",
      validate:()=>{
        if(matchState.battingTeam=='' || matchState.bolwingTeam=='') return false;
        return true;
      },
    },
    4: {
      component: < SelectBatterAndBolwer />,
      alignItems: "center",
      title: "Select Openers and Bolwer",
      validate:()=>{if(matchState.current_batter.onStrike=='' || matchState.current_batter.nonStrik == '') return false
        if(matchState.over.bowlerName == '') return false;
        return true;
      },
    },
  };

  const team1LogoSelect = (logoPath) => {
    setTeam1Logo(logoPath);
  };
  const team2LogoSelect = (logoPath) => {
    setTeam2Logo(logoPath);
  };

  return (
    <ModalPanelLayout
      heading="Cricket Match"
      tabs={tabs}
      onNext={onNext}
      onBack={onBack}
      currentTab={currentTab}
      setCurrentTab={setCurrentTab}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative", // Enable stacking for AnimatePresence children
          overflow: "hidden",
          display:'flex',
          flexDirection: 'column'
        }}
      >
        {
          (tabs[currentTab].title=="")? 
          ""
          :
          <div style={{ textAlign:'center', color:'var(--secordary-dark-color)', fontWeight:'bold'}}>
            {tabs[currentTab].title}
          </div>
        }
        <motion.div
          key={currentTab}
          initial={{ x: 100 * tabDirection, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100 * tabDirection, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            flexGrow: '1',
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: tabs[currentTab].alignItems,
            // position: "absolute", // Needed to overlap tabs during transition
          }}
        >
          {tabs[currentTab].component}
        </motion.div>
      </div>
    </ModalPanelLayout>
  );
}

export default CricketConfigForm;

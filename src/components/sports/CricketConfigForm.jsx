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

function CricketConfigForm() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const [currentTab, setCurrentTab] = useState(0);
  const wrapperRef = useRef();

  const [prevTab, setPrevTab] = useState(currentTab);
  const tabDirection = currentTab > prevTab ? 1 : -1;

  // try to avoid it...
  useEffect(() => {
    setPrevTab(currentTab);
  }, [currentTab]);

  const onNext = () => {
    setCurrentTab(currentTab + 1);
  };
  const onBack = () => {
    setCurrentTab(currentTab - 1);
  };

  const [isHeads, setIsHeads] = useState(true);
  const tossOptions = ["Heads", "Tails"];
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
    0: { component: <Teaminfo />, alignItems: "center" },
    1: { component: <Teamup />, alignItems: "flex-start" },
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
                width: "100%",
              }}
            >
              <h3>{matchState.team1}</h3>
              <ToggleButton
                options={tossOptions}
                isToggled={isHeads}
                onToggle={handleTossToggle}
              />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                width: "100%",
              }}
            >
              <h3>{matchState.team2}</h3>
              <ToggleButton
                options={tossOptions}
                isToggled={!isHeads}
                onToggle={handleTossToggle}
              />
            </div>
          </div>
          <CoinFlip TeamsTossPicks={matchState.tossPicked} />
        </div>
      ),
      alignItems: "center",
    },
    3: {
      component: <ChoosingAfterToss />,
      alignItems: "center",
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
        }}
      >
        <motion.div
          key={currentTab}
          initial={{ x: 100 * tabDirection, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100 * tabDirection, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: tabs[currentTab].alignItems,
            overflow: "hidden",
            // position: "absolute", // Needed to overlap tabs during transition
            top: 0,
            left: 0,
          }}
        >
          {tabs[currentTab].component}
        </motion.div>
      </div>
    </ModalPanelLayout>
  );
}

export default CricketConfigForm;

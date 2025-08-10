import React, { useRef, useState } from "react";
import ModalPanelLayout from "../../layout/componentLayout/ModalPanelLayout";
import FormInput from "../common/FormInput";
import ToggleButton from "../common/ToggleButton";
import Logo from "../common/Logo";
import Teaminfo from "../cricket/form/Teaminfo";
import Teamup from "./Teamup";
import CoinFlip from "./toss/CoinFlip";
import { CgEnter } from "react-icons/cg";
import { useMatchContext } from "../../context/matchReducer";

function CricketConfigForm() {
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();

  const [currentTab, setCurrentTab] = useState(0);
  const wrapperRef = useRef();

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
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <h3>Team 1</h3>
              <ToggleButton
                options={tossOptions}
                isToggled={isHeads}
                onToggle={handleTossToggle}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <h3>Team 2</h3>
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
          display: "flex",
          justifyContent: "center",
          alignItems: tabs[currentTab].alignItems,
        }}
      >
        {tabs[currentTab].component}
      </div>
    </ModalPanelLayout>
  );
}

export default CricketConfigForm;

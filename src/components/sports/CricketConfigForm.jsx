import React, { useRef, useState } from "react";
import ModalPanelLayout from "../../layout/componentLayout/ModalPanelLayout";
import FormInput from "../common/FormInput";
import ToggleButton from "../common/ToggleButton";
import Logo from "../common/Logo";
import Teaminfo from "../cricket/form/Teaminfo";
import Teamup from "./Teamup";
import TossPick from "../cricket/form/TossPick";

function CricketConfigForm() {
  const [currentTab, setCurrentTab] = useState(0);
  const wrapperRef = useRef();

  const onNext = () => {
    setCurrentTab(currentTab + 1);
  };
  const onBack = () => {
    setCurrentTab(currentTab - 1);
  };

  const [isHeads, setIsHeads] = useState(true);
  const handleTossToggle = () => setIsHeads((prev) => !prev);

  const teamLogos = import.meta.glob("/src/assets/team-icons/TeamIcons/*.svg", {
    eager: true,
    import: "default",
  });
  const [team1Logo, setTeam1Logo] = useState(null);
  const [team2Logo, setTeam2Logo] = useState(null);
  const [team1Name, setTeam1Name] = useState("");
  const [team2Name, setTeam2Name] = useState("");

  const [overs, setOvers] = useState(null);

  const tabs1 = [
    <Teaminfo />,
    <ToggleButton
      options={["Heads", "Tails"]}
      isToggled={isHeads}
      onToggle={handleTossToggle}
    />,
    <Teamup />,
  ];
  const tabs = {
    0: { component: <Teaminfo />, alignItems: "center" },
    1: { component: <Teamup />, alignItems: "flex-start" },
    2: {
      component: (
        <TossPick
          options={["Heads", "Tails"]}
          isToggled={isHeads}
          onToggle={handleTossToggle}
        />
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

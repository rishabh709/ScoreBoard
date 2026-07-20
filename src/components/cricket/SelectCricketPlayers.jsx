import React, { useState } from "react";
import ModalPanelLayout from "../../layout/componentLayout/ModalPanelLayout";
import ModalPanelSkeleton from "../../layout/componentLayout/ModalPanelSkeleton";
import SelectPlayer from "../common/SelectPlayer";
import classes from "../../layout/componentLayout/ModalPanelLayout.module.css";
import { useMatchContext } from "../../context/matchReducer";
import Backdrop from "../common/Backdrop";

function SelectCricketPlayers( {setSelectedPlayerIndex} ) {
  const { state: matchState } = useMatchContext();
  const [isVisible, setIsVisible] = useState(true);

  const onNext = () => {
    setIsVisible(false);
  };
  const onBack = () => {
    setIsVisible(false);
  };
  const onConfirm = (playerIndex) => {
    setSelectedPlayerIndex(playerIndex);
  }

  if (!isVisible) return "";
  return (
    <ModalPanelSkeleton heading={"Select Batter"} onBack={onBack}>
      <SelectPlayer
        playerList={matchState.players[matchState.battingTeam]}
        onConfirm={onBack}
      ></SelectPlayer>
    </ModalPanelSkeleton>
  );
}

export default SelectCricketPlayers;

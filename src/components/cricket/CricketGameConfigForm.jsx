import React from "react";
import ModalFormLayout from "../../layout/componentLayout/ModalFormLayout";
import Teamup from "../sports/Teamup";
import Toss from "../sports/toss/Toss";
import TossDecision from "../sports/toss/TossDecision";

function CricketGameConfigForm() {
  const formPages = [
    [
      { type: "text", field: "team1", place: "Team 1" },
      { type: "text", field: "team2", place: "Team 2" },
    ],

    [{ type: "number", field: "maxOvers", place: "Max Overs" }],

    [{ isModule: true, module: Teamup }],
    [{ isModule: true, module: Toss }],
    [{ isModule: true, module: TossDecision }],
  ];
  // [{ isModule: true, module: <SelectPlayer />}]

  const child = (
    <>
      <div>Enter name</div>
      <input type="text" name="Name" id="" />
      <input type="text" name="Name" id="" />
    </>
  );

  return <ModalFormLayout title="Cricket" body={child} formPages={formPages} />;
}

export default CricketGameConfigForm;

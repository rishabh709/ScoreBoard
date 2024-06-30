import React, { useContext } from "react";
import classes from "./OversSummary.module.css";
import { Context } from "../../context/scoreContext";
import OverBar from "./OverBar";

function OversSummary() {
  const { match } = useContext(Context);
  return (
    <>
        {match.overs.map((over) => {
          {
            return <OverBar over={over} />
          }
        })}
    </>
  );
}

export default OversSummary;

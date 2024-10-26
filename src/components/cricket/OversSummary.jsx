import React, { useContext } from "react";
import classes from "./OversSummary.module.css";
import OverBox from "./OverBox";

function OversSummary() {
  const { match } = useContext(Context);
  return (
    <div className={classes.container}>
        {match.overs.map((over) => {
          {
            return <OverBox over={over} />
          }
        })}
    </div>
  );
}

export default OversSummary;

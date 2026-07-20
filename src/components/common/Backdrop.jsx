import React from "react";

function Backdrop(props) {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: "2",
        // backdrop max z index is 5;
        top: 0,
        left: 0,
      }}
      onClick={props.onClick}
    />
  );
}

export default Backdrop;

import React from "react";

function Backdrop(props) {
  return (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: "1",
        top: 0,
        left: 0,
      }}
      onClick={props.onClick}
    />
  );
}

export default Backdrop;

import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navigation/NavigationBar";

function MainLayout() {
  return (
    <div style={{height:'100dvh', display:'flex', flexDirection:'column'}}>
    <NavigationBar />
      <Outlet />
    </div>
  );
}

export default MainLayout;

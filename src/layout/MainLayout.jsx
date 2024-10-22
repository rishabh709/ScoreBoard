import React from "react";
import { Outlet } from "react-router-dom";
import NavigationBar from "../components/navigation/NavigationBar";

function MainLayout() {
  return (
    <>
    <NavigationBar />
      <Outlet />
    </>
  );
}

export default MainLayout;

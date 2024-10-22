import React, { useContext, useEffect, useState } from "react";
import AllSportsCards from "../components/HomePageItems/AllSportsCards";
import HeroSection from "../components/HomePageItems/HeroSection";
import useLocalStorage from "../hooks/useLocalStorage";
import Backdrop from "../components/common/Backdrop";
import { useNavigate } from "react-router-dom";
import { useMatchContext } from "../context/matchReducer";
import DialogBox from "../components/common/DialogBox";

function HomePage() {
  const [isDialogOpen, setIsDialogOpen ] = useState(false);
  const { getItem, deleteItem } = useLocalStorage("matchState");
  const { state: matchState, dispatch: matchDispatch } = useMatchContext();
  const navigate = useNavigate()

  useEffect(() => {
    if (getItem() !== undefined) {
      setIsDialogOpen(true);
    }
  }, []);

  //for closing backdrop
  const closeDialogBox = () => setIsDialogOpen(false);

  const onOkay = () => {
    matchDispatch({type:'SET_MATCH_STATE', payload:getItem()});
    navigate('/cricket-match');
    deleteItem();
    setIsDialogOpen(false);
  };
  const onCancel = () => {
    deleteItem();
    matchDispatch({type: 'RESET_STATE'})
    setIsDialogOpen(false);
  };

  return (
    <div>
      {isDialogOpen && (
        <>
          <DialogBox message={"Resume cricket match?"} onOkay={onOkay} onCancel={onCancel} />
        </>
      )}
      <HeroSection />
      <AllSportsCards />
    </div>
  );
}

export default HomePage;

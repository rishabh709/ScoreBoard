import React, { useState } from "react";
import classes from "./SelectProfileIcon.module.css";
import DropdownMenu from "./DropdownMenu";

function SelectProfileIcon() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const ProfileMenuHandler = () => {
    setIsMenuVisible((prev) => !prev);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.icon} onClick={ProfileMenuHandler}>
      </div>
        {isMenuVisible ? (
          <DropdownMenu>
            <div>Photo1</div>
            <div>Photo2</div>
            <div>Photo3</div>
          </DropdownMenu>
        ) : (
          ""
        )}
    </div>
  );
}

export default SelectProfileIcon;

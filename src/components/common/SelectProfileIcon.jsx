import React, { useState } from "react";
import classes from "./SelectProfileIcon.module.css";
import Dropdown2dMenu from "./Dropdown2dMenu";

function SelectProfileIcon() {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const profileMenuHandler = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const profileImageHandler = (icon) => {
    setProfileImage(icon);
    setIsMenuVisible(false);
  };

  const icons = import.meta.glob("/src/assets/team-icons/TeamIcons/*.svg", {
    eager: true,
    import: "default",
  });

  return (
    <div className={classes.wrapper}>
      {profileImage !== null ? (
        <img
          src={profileImage}
          className={classes.icon}
          onClick={profileMenuHandler}
          alt="profileImage"
        />
      ) : (
        <div
          className={classes.icon}
          onClick={profileMenuHandler}
          style={{ backgroundColor: "red" }}
        />
      )}
      
      {isMenuVisible ? (
        <Dropdown2dMenu>
          {Object.entries(icons).map(([path, icon]) => {
            const name = path.split("/").pop().replace(".svg", "");
            return (
              <img
                src={icon}
                alt={name}
                onClick={() => profileImageHandler(icon)}
              />
            );
          })}
        </Dropdown2dMenu>
      ) : (
        ""
      )}
    </div>
  );
}

export default SelectProfileIcon;

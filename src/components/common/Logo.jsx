import React, { useState } from "react";
import classes from "./SelectProfileIcon.module.css";
import Dropdown2dMenu from "./Dropdown2dMenu";
import { autoUpdate, flip, offset, shift, useFloating } from "@floating-ui/react-dom";

function Logo({ logos, profileImage, logoSelectionHandler }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const menuVisibilityHandler = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const handleLogoSelect = (icon) => {
    logoSelectionHandler(icon);
    setIsMenuVisible(false);
  };

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    middleware: [offset(8), flip(), shift()],
    whileElementsMounted: autoUpdate,
    open: isMenuVisible,
    onOpenChange: setIsMenuVisible,
  });

  return (
    <div className={classes.wrapper}>
      {profileImage !== null ? (
        <img
          src={profileImage}
          className={classes.icon}
          onClick={menuVisibilityHandler}
          alt="profileImage"
          ref={refs.setReference}
        />
      ) : (
        <div
          className={classes.icon}
          onClick={menuVisibilityHandler}
          style={{ backgroundColor: "#d3d3d3" }}
          ref={refs.setReference}
        />
      )}

      {isMenuVisible && (
        <Dropdown2dMenu ref={refs.setFloating} style={floatingStyles}>
          {Object.entries(logos).map(([path, icon]) => {
            const name = path.split("/").pop().replace(".svg", "");
            return (
              <img
                key={path}
                src={icon}
                alt={name}
                onClick={() => handleLogoSelect(icon)}
              />
            );
          })}
        </Dropdown2dMenu>
      )}
    </div>
  );
}

export default Logo;

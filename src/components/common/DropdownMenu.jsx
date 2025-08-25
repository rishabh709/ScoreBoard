import React, { useRef, useState, useEffect } from "react";
import classes from "./DropdownMenu.module.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function DropdownMenu({
  children,
  defaultValue,
  selectedOption,
  setSelectedOption,
  options,
}) {
  const [isDropDownOpen1, setIsDropDownOpen1] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropDownOpen1(false);
      }
    }

    if (isDropDownOpen1) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen1]);

  // yet to implement the setting the selected option

  const ddMenu = (
    <div className={classes.menuWrapper} ref={dropdownRef}>
      <div className={classes.menu}>
        {children != null
          ? children
          : options.map((items, i) => <div key={i}>{items}</div>)}
      </div>
    </div>
  );

  return (
    <div style={{ width: "max-content" }}>
      <div
        className={classes.container}
        onClick={() => setIsDropDownOpen1((prev) => !prev)}
      >
        <div className={classes.nameTag}>
          {defaultValue}
          {isDropDownOpen1 ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      {isDropDownOpen1 && ddMenu}
    </div>
  );
}

export default DropdownMenu;

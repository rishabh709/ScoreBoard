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
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownParentRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) && !dropdownParentRef.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    }

    if (isDropDownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropDownOpen]);

  // yet to implement the setting the selected option

  const ddMenu = (
    <div className={classes.menuWrapper} ref={dropdownRef}>
      <div className={classes.menu}>
        {children != null
          ? children
          : options.map((items, i) => <div key={i} onClick={()=>{setSelectedOption(items); setIsDropDownOpen(false);}}>{items}</div>)}
      </div>
    </div>
  );

  return (
    <div style={{ width: "max-content" }}>
      <div
        className={classes.container}
        onClick={() => setIsDropDownOpen((prev) => !prev)}
        ref={dropdownParentRef}
      >
        <div className={classes.nameTag}>
          {defaultValue==''?"Select": defaultValue}
          {isDropDownOpen ? <FaChevronDown /> : <FaChevronUp />}
        </div>
      </div>
      {isDropDownOpen && ddMenu}
    </div>
  );
}

export default DropdownMenu;

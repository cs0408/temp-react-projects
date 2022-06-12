import React from "react";
import { NavLink } from "react-router-dom";

const Tabs = () => {
  const tabs = [
    {
      type: "Add new field on button click - 1",
      link: "/add-new-field-on-button-click-1",
    },
    {
      type: "Add new field on button click - 2",
      link: "/add-new-field-on-button-click-2",
    },
  ];
  return (
    <div>
      <ul style={{ listStyleType: "none" }}>
        {tabs.map((tab) => {
          return (
            <li key={tab.link}>
              <NavLink to={tab.link}>{tab.type}</NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tabs;

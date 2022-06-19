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
    {
      type: "Analytics Dashboard - 1",
      link: "/analytics-dashboard-1",
    },
    {
      type: "Payment Template - 1",
      link: "/payment-template-1",
    },
    {
      type: "Payment Template - 2",
      link: "/payment-template-2",
    },
    {
      type: "Payment Template - 3",
      link: "/payment-template-3",
    },
    {
      type: "Shopify Components",
      link: "/shopify-project",
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

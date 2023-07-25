import React from "react";
import { Link } from "react-router-dom";
import classes from "./SidebarItem.module.css";

function SidebarItem({ page, isActive }) {
  return (
    <Link
      className={`${classes.sidbar_item} ${isActive ? classes.active : ""} `}
      to={page.path}
    >
      {page.name}
    </Link>
  );
}

export default SidebarItem;

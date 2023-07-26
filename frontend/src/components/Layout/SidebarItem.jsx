import React from "react";
import { Link } from "react-router-dom";
import classes from "./SidebarItem.module.css";

function SidebarItem({ page, isActive }) {
  return (
    <Link
      className={`${classes.sidbar_item} ${isActive ? classes.active : ""} `}
      to={page.path}
    >
      <span className={classes.page_name}>{page.name}</span>
    </Link>
  );
}

export default SidebarItem;

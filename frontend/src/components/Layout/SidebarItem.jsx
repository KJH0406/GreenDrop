import React from "react";
import { Link } from "react-router-dom";
import classes from "./SidebarItem.module.css";
import line1Img from "../../assets/line (1).png";
import line2Img from "../../assets/line (2).png";

function SidebarItem({ page, isActive }) {
  return (
    <Link
      className={`${classes.sidbar_item} ${isActive ? classes.active : ""} `}
      to={page.path}
    >
      <span className={classes.line_img}>
        <img src={isActive ? line2Img : line1Img} alt="" />
      </span>
      <span className={classes.page_name}>{page.name}</span>
    </Link>
  );
}

export default SidebarItem;

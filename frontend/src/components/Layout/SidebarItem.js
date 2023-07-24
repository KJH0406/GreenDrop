import React from "react";
import { Link } from "react-router-dom";

function SidebarItem({ page }) {
  return (
    <div className="sidebar-item">
      <Link to={page.path}>{page.name}</Link>
    </div>
  );
}

export default SidebarItem;

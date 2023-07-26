// import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import classes from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";

function Sidebar(props) {
  const location = useLocation();
  const pageList = props.pageList;

  return (
    <div className={classes.sidebar}>
      {pageList.map((page, index) => {
        return (
          <div key={index}>
            <SidebarItem
              page={page}
              isActive={`/${page.path}` === location.pathname} // Compare the path with the current location
            />
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

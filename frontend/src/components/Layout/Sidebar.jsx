// import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import classes from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";

function Sidebar(props) {
  const location = useLocation();
  let currentLocation = location.pathname;
  let temp = null;
  if (currentLocation.indexOf("/", 1) !== -1) {
    temp = currentLocation.split("/");
    currentLocation = `/${temp[1]}`;
  }

  const pageList = props.pageList;

  return (
    <div className={classes.sidebar}>
      {pageList.map((page, index) => {
        return (
          <div key={index}>
            <SidebarItem
              page={page}
              isActive={`/${page.path}` === currentLocation} // Compare the path with the current location
            />
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;

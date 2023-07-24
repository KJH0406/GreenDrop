// import { Link } from "react-router-dom";

import SidebarItem from "./SidebarItem";
import classes from "./Sidebar.module.css";
import { useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const pageList = [
    { path: "", name: "서비스 소개" },
    { path: "home", name: "홈" },
    { path: "board", name: "밸런스 게임 게시판" },
    { path: "greenStory", name: "그린 스토리" },
    { path: "guide", name: "분리수거 가이드" },
    { path: "location", name: "수거함 위치" },
    { path: "admin", name: "관리자 페이지" },
    { path: "device", name: "디바이스" },
  ];

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

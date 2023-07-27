import { useState } from "react";
import classes from "./Header.module.css";
import hamburgerImg from "../../assets/hamburger.png";
import closeImg from "../../assets/close.png";
import Sidebar from "./Sidebar";
function Header() {
  // 사이드 바  활성화 여부
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // 이미지 변환 여부
  const imageSrc = isSidebarOpen ? closeImg : hamburgerImg;

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // 사이드 바 메뉴 리스트
  const pageList = [
    { path: "", name: "서비스 소개" },
    { path: "home", name: "홈" },
    { path: "board", name: "밸런스 게임 게시판" },
    { path: "greenStory", name: "그린 스토리" },
    { path: "guide", name: "분리수거 가이드" },
    { path: "location", name: "수거함 위치" },
    { path: "status", name: "수거 현황" },
    { path: "admin", name: "관리자 페이지" },
    { path: "device", name: "디바이스" },
  ];

  return (
    <div className={classes.container}>
      <header className={classes.header}>
        <div className={classes.title}>
          <span className={classes.first_word}>Green</span>
          <span className={classes.second_word}>Drop</span>
        </div>
        <img
          className={isSidebarOpen ? classes.close_img : classes.hamburger_img}
          src={imageSrc}
          alt=""
          onClick={toggleSidebar}
        />
      </header>
      <div className={classes.sidbar}>
        {isSidebarOpen ? <Sidebar pageList={pageList} /> : <></>}
      </div>
    </div>
  );
}

export default Header;

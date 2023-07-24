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

  return (
    <div>
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

      {isSidebarOpen ? <Sidebar className={classes.sidbar} /> : <></>}
    </div>
  );
}

export default Header;

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import classes from "./Header.module.css";
import hamburgerImg from "../../assets/hamburger.png";
import closeImg from "../../assets/close.png";
import Sidebar from "./Sidebar";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  // 사이드 바  활성화 여부
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // 이미지 변환 여부
  const imageSrc = isSidebarOpen ? closeImg : hamburgerImg;

  const sidebarRef = useRef(null); // useRef를 사용하여 사이드바를 참조합니다.

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  // 오버레이 렌더링 함수
  const renderOverlay = () => {
    return isSidebarOpen ? (
      <div className={classes.overlay} onClick={toggleSidebar} />
    ) : null;
  };
  // 외부 클릭 시 사이드바 닫기 함수
  const handleOutsideClick = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  };

  useEffect(() => {
    // 사이드바가 열려있을 때 이벤트 리스너 추가
    if (isSidebarOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      // 사이드바가 닫혔을 때 이벤트 리스너 제거
      document.removeEventListener("click", handleOutsideClick);
    }

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const goIntro = () => {
    if ("/" === location.pathname) {
      window.scrollTo(0, 0);
      return;
    }
    navigate("/");
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
        <div className={classes.title} onClick={goIntro}>
          <span className={classes.first_word}>Green</span>
          <span className={classes.second_word}>Drop</span>
        </div>
        <img
          ref={sidebarRef}
          className={isSidebarOpen ? classes.close_img : classes.hamburger_img}
          src={imageSrc}
          alt=""
          onClick={toggleSidebar}
        />
      </header>
      {isSidebarOpen ? (
        <div className={classes.sidbar}>
          <Sidebar pageList={pageList} />
        </div>
      ) : (
        ""
      )}
      {renderOverlay()}
    </div>
  );
}

export default Header;

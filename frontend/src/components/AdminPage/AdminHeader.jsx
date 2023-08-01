import { Link, useNavigate } from "react-router-dom";
import classes from "./AdminHeader.module.css";

function AdminHeader() {
  const navigate = useNavigate();

  const isSuper = true;
  // 작업을 위해서 임시 주석처리
  // const token = localStorage.getItem("loggedInUser");
  // const isSuper = JSON.parse(token).role === "SUPER";
  // 헤더 리스트
  const pageList = [
    { path: "", name: "홈" },
    { path: "adminBoard", name: "밸런스 게임 게시판 관리" },
    { path: "adminCategories", name: "카테고리 관리" },
  ];

  const onLogout = (event) => {
    window.localStorage.removeItem("loggedInUser");
    return navigate("/login");
  };
  return (
    <div className={classes.admin_header_container}>
      <div className={classes.logo}>
        <h1>Green Drop</h1>
      </div>
      <div className={classes.page_list}>
        {pageList.map((page, index) => (
          <Link to={page.path} key={index} className={classes.page_item}>
            {page.name}
          </Link>
        ))}
        {isSuper ? (
          <Link to="accountManagement" className={classes.page_item}>
            관리자 계정 관리
          </Link>
        ) : (
          <div className={classes.page_item}>비밀번호 변경하기</div>
        )}
        <button className={classes.logout_button} onClick={onLogout}>
          로그아웃
        </button>
      </div>
    </div>
  );
}

export default AdminHeader;

import { Link } from "react-router-dom";
import classes from "./AdminHeader.module.css";

function AdminHeader() {
  // 헤더 리스트
  const pageList = [
    { path: "", name: "홈" },
    { path: "adminBoard", name: "밸런스 게임 게시판 관리" },
    { path: "adminCategories", name: "카테고리 관리" },
    { path: "accountManagement", name: "관리자 계정 관리" },
  ];

  return (
    <div className={classes.admin_header_container}>
      <div className={classes.logo}>
        <h1>사이트 로고</h1>
      </div>
      <div className={classes.page_list}>
        {pageList.map((page, index) => (
          <Link to={page.path} key={index} className={classes.page_item}>
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminHeader;

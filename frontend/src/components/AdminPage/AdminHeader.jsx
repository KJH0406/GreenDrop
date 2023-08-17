import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./AdminHeader.module.css";
import axios from "axios";

const api = "https://i9b103.p.ssafy.io/api/";

function AdminHeader() {
  const navigate = useNavigate();
  const token = localStorage.getItem("loggedInUser");
  const isSuper = JSON.parse(token).role === "SUPER";

  // 비밀변호 변경 로직
  const [showModal, setShowModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handlePasswordChange = () => {
    const userId = JSON.parse(token).id;

    // Create the data object to send in the PATCH request
    const data = {
      id: userId,
      password: currentPassword,
      newPassword: newPassword,
    };

    // Send the PATCH request to the API
    axios
      .patch(`${api}manager/change/password`, data)
      .then((response) => {
        // Handle the response here (if needed)
        alert("비밀번호가 변경되었습니다.");
      })
      .catch((error) => {
        // Handle error if the password change fails
        alert("비밀번호를 확인해주세요");
      });
    // 비밀번호 변경 후 모달 닫기
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  // 변경안하고 닫아도 초기화 되도록 수정
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentPassword("");
    setNewPassword("");
  };

  // 헤더 리스트
  const pageList = [
    { path: "", name: "홈" },
    { path: "adminBoard", name: "밸런스 게임 관리" },
    { path: "adminGameHistory", name: "지난 밸런스 게임" },
    { path: "adminCategories", name: "카테고리 관리" },
  ];

  const onLogout = (event) => {
    window.localStorage.removeItem("loggedInUser");
    return navigate("/login");
  };
  return (
    <div className={classes.admin_header_container}>
      <div className={classes.logo}>
        <Link to="/admin">
          <h1>
            <span className={classes.first_word}>Green</span> Drop
          </h1>
        </Link>
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
          <div className={classes.page_item} onClick={() => setShowModal(true)}>
            비밀번호 변경하기
          </div>
        )}
        <button className={classes.logout_button} onClick={onLogout}>
          로그아웃
        </button>
      </div>
      {/* 비밀번호 변경하기 모달 */}
      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modal_content}>
            <h2>비밀번호 변경하기</h2>
            <label>
              아이디:
              <input type="text" value={JSON.parse(token).id} disabled />
            </label>
            <label>
              현재 비밀번호:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
            <label>
              새로운 비밀번호:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <div className={classes.modal_buttons}>
              <button onClick={handlePasswordChange}>변경</button>
              <button onClick={handleCloseModal}>취소</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminHeader;

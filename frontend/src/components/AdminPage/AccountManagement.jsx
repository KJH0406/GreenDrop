import { useState } from "react";
import classes from "./AccountManagement.module.css";
import { Navigate } from "react-router-dom";

function AccountManagement() {
  const token = localStorage.getItem("loggedInUser");
  const isSuper = JSON.parse(token).role === "SUPER";
  const [selectedAccountId, setSelectedAccountId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newAccountId, setNewAccountId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  if (!isSuper) {
    alert("최고 관리자만 접근 가능한 기능입니다.");
    return <Navigate to="/admin" />;
  }

  // 서버에 관리자 리스트를 불러오는 요청 GET
  // get 받아서 List 관리하면됨!
  const managerList = [
    { id: "ssafy", date: "2020-01-01" },
    { id: "ssafy1", date: "2020-01-01" },
    { id: "ssafy1123213213123233123213123221", date: "2020-01-01" },
  ];

  const handleDelete = (id) => {
    // 서버에 해당 id를 삭제하는 요청 POST, 마찬가지로 삭제되면 바로 삭제된 형태로 보이게해야함
    console.log(`Delete account with id: ${id}`);
  };

  const handleCreateAccount = () => {
    // 서버에 새로운 계정 정보를 생성하는 요청 DELETE
    // 아이디와 비밀번호는 newAccountId, newPassword 담아서 보내기만하면됨.
    // 그리고 GET요청 한번 더 실행시켜서 추가된 관리자 바로 볼 수 있게함 (아마 리스트 부분을 useEffect 사용해서 구현해야할듯)
    // 중복체크 해야하나?
    console.log("Create new account:", newAccountId, newPassword);
    // 모달 닫기
    setShowModal(false);
    // 입력값 초기화
    setNewAccountId("");
    setNewPassword("");
  };

  return (
    <div className={classes.account_management_container}>
      <div className={classes.account_management_header}>
        <h1>관리자 목록</h1>
        <div className={classes.account_management_header_button}>
          <button
            onClick={() => setShowModal(true)}
            className={classes.create_account_button}
          >
            관리자 계정 생성
          </button>
        </div>
      </div>
      <div className={classes.account_list}>
        <div className={classes.account_list_header}>
          <p className={classes.account_id}>아이디</p>
          <p className={classes.account_date}>생성 날짜</p>
          <p>비고</p>
        </div>

        {managerList.map((account) => (
          <div
            key={account.id}
            className={`${classes.account_box} ${
              selectedAccountId === account.id ? classes.selected_account : ""
            }`}
            onClick={() => setSelectedAccountId(account.id)}
          >
            <p className={classes.account_id}>{account.id}</p>
            <p className={classes.account_date}>{account.date}</p>
            <button
              className={classes.delete_button}
              onClick={() => handleDelete(account.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className={classes.modal}>
          <div className={classes.modal_content}>
            <h2>관리자 계정 생성</h2>
            <label>
              ID:
              <input
                type="text"
                value={newAccountId}
                onChange={(e) => setNewAccountId(e.target.value)}
              />
            </label>
            <label>
              비밀번호:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
            <button onClick={handleCreateAccount}>생성하기</button>
            <button onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountManagement;

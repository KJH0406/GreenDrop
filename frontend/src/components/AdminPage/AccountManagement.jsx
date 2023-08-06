import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AccountManagement.module.css";
import { Navigate } from "react-router-dom";

const api = "https://i9b103.p.ssafy.io/api/";
const managerPerPage = 10; // 한 페이지에 보여줄 관리자 계정 수

function AccountManagement() {
  // 로그인한 사용자의 토큰 가져오기
  const userInfo = localStorage.getItem("loggedInUser");
  const isSuper = JSON.parse(userInfo).role === "SUPER";
  const token = JSON.parse(userInfo).token;

  // 관리자 리스트를 담을 상태 변수 선언
  const [managerList, setManagerList] = useState([]);

  // 선택된 계정의 ID를 담을 상태 변수 선언
  const [selectedAccountId, setSelectedAccountId] = useState(null);

  // 모달의 보이기/감추기 상태 변수 선언
  const [showModal, setShowModal] = useState(false);

  // 새로운 계정 정보를 담을 상태 변수 선언
  const [newAccountId, setNewAccountId] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // 현재 페이지를 담을 상태 변수 선언
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 해당하는 관리자 계정들을 반환하는 함수
  const getCurrentManagerList = () => {
    const indexOfLastManager = currentPage * managerPerPage;
    const indexOfFirstManager = indexOfLastManager - managerPerPage;
    return managerList.slice(indexOfFirstManager, indexOfLastManager);
  };

  // Axios 인터셉터를 사용하여 토큰을 모든 요청 헤더에 담아 보내기
  useEffect(() => {
    if (!isSuper) {
      alert("최고 관리자만 접근 가능한 기능입니다.");
      return <Navigate to="/admin" />;
    }
  }, [isSuper]);

  // 컴포넌트가 처음 마운트될 때, 관리자 리스트를 서버에서 가져오도록 useEffect 사용
  useEffect(() => {
    axios
      .get(`${api}manager/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const modifiedManagerList = response.data.map((account) => ({
          ...account,
          createdDate: new Date(account.createdDate).toLocaleDateString(),
        }));
        setManagerList(modifiedManagerList);
      })
      .catch((error) => {
        console.error("관리자 리스트를 불러오는데 실패했습니다.", error);
      });
  }, [isSuper, token]);

  const handleDelete = (managerSeq) => {
    axios
      .delete(`${api}manager/delete`, {
        data: { managerSeq },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setManagerList((prevList) =>
          prevList.filter((account) => account.managerSeq !== managerSeq)
        );
      })
      .catch((error) => {
        console.error("계정 삭제 중 오류가 발생했습니다.", error);
      });
  };

  const handleCreateAccount = () => {
    axios
      .post(
        `${api}manager/regist`,
        {
          id: newAccountId,
          password: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        axios
          .get(`${api}manager/list`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const modifiedManagerList = response.data.map((account) => ({
              ...account,
              createdDate: new Date(account.createdDate).toLocaleDateString(),
            }));
            setManagerList(modifiedManagerList);
          })
          .catch((error) => {
            console.error("관리자 리스트를 불러오는데 실패했습니다.", error);
          });
      })

      .catch((error) => {
        console.error("계정 생성 중 오류가 발생했습니다.", error);
      });

    setShowModal(false);
    setNewAccountId("");
    setNewPassword("");
  };

  const totalPages = Math.ceil(managerList.length / managerPerPage);

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

        {getCurrentManagerList().map((account, idx) => (
          <div
            key={idx}
            className={`${classes.account_box} ${
              selectedAccountId === account.id ? classes.selected_account : ""
            }`}
            onClick={() => setSelectedAccountId(account.managerSeq)}
          >
            <p className={classes.account_id}>{account.id}</p>
            <p className={classes.account_date}>{account.createdDate}</p>
            <button
              className={classes.delete_button}
              onClick={() => handleDelete(account.managerSeq)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>

      <div className={classes.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={currentPage === index + 1 ? classes.active : ""}
          >
            {index + 1}
          </button>
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

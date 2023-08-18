import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AccountManagement.module.css";
import { Navigate } from "react-router-dom";

const api = "https://i9b103.p.ssafy.io/api/";
const managerPerPage = 10; // 한 페이지에 보여줄 관리자 계정 수

function AccountManagement() {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

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

  const [showModifyModal, setShowModifyModal] = useState(false);

  //하위 관리자 비밀번호 수정을 위한 상태 변수 선언
  const [userId, setUserId] = useState("");
  const [modifyPassword, setModifyPassword] = useState(null);

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
        const modifiedManagerList = response.data
          .filter((account) => account.role !== "SUPER")
          .map((account) => ({
            ...account,
            createdDate: formatDate(new Date(account.createdDate)),
          }));
        setManagerList(modifiedManagerList);
      })
      .catch((error) => {
        console.error("관리자 리스트를 불러오는데 실패했습니다.", error);
      });
  }, [isSuper, token]);

  const handleDelete = (managerSeq) => {
    if (window.confirm("삭제하시겠습니까?")) {
      axios
        .delete(`${api}manager/delete`, {
          data: { managerSeq },
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          setManagerList((prevList) =>
            prevList.filter((account) => account.managerSeq !== managerSeq),
          );
          alert("삭제되었습니다.");
        })
        .catch((error) => {
          alert("삭제에 실패했습니다.");
        });
    } else {
      alert("삭제를 취소했습니다.");
    }
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
        },
      )
      .then((response) => {
        axios
          .get(`${api}manager/list`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((response) => {
            const modifiedManagerList = response.data.map((account) => ({
              ...account,
              createdDate: formatDate(new Date(account.createdDate)),
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

  const handlePasswordChange = () => {
    // Create the data object to send in the PATCH request
    const data = {
      id: userId,
      password: modifyPassword,
    };
    if (window.confirm) {
      // Send the PATCH request to the API
      axios
        .patch(`${api}manager/change/super`, data)
        .then((response) => {
          // Handle the response here (if needed)
          alert("수정이 완료됐습니다.");
        })
        .catch((error) => {
          // Handle error if the password change fails
          alert("수정에 실패했습니다.");
        });
    } else {
      alert("수정을 취소했습니다.");
    }
    // 비밀번호 변경 후 모달 닫기
    setShowModifyModal(false);
    setModifyPassword(null);
  };

  const handleCloseModal = () => {
    setShowModifyModal(false);
    setModifyPassword(null);
  };

  return (
    <div
      className={classes.account_management_container}
      onClick={() => {
        setShowModal(false);
      }}
    >
      <div className={classes.account_management_header}>
        <h1>관리자 목록</h1>
        <div className={classes.account_management_header_button}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowModal(true);
            }}
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
          <p className={classes.etc}>비고</p>
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

            <p className={classes.etc}>
              <button
                className={classes.modify_button}
                onClick={() => {
                  setUserId(account.id);
                  setShowModifyModal(true);
                }}
              >
                수정
              </button>
              <button
                className={classes.delete_button}
                onClick={() => handleDelete(account.managerSeq)}
              >
                삭제
              </button>
            </p>
          </div>
        ))}
      </div>
      <div className={classes.page_area}>
        <div className={classes.pagination}>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={classes.page_btn}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      {showModal && (
        <div
          className={classes.modal}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
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
      {showModifyModal && (
        <div className={classes.modal}>
          <div className={classes.modal_content}>
            <h2>비밀번호 변경하기</h2>
            <label>
              아이디:
              {/* <input type="text" value={userId} disabled /> */}
              <p>{userId}</p>
            </label>
            <label>
              새로운 비밀번호:
              <input
                type="password"
                value={modifyPassword || ""}
                onChange={(e) => setModifyPassword(e.target.value)}
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

export default AccountManagement;

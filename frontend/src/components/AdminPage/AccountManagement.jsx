import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AccountManagement.module.css";
import { Navigate } from "react-router-dom";

const api = "http://i9b103.p.ssafy.io:8000/api/";

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

  // Axios 인터셉터를 사용하여 토큰을 모든 요청 헤더에 담아 보내기
  useEffect(() => {
    // 로그인한 사용자가 최고 관리자가 아닌 경우, 경고창 띄우고 '/admin' 페이지로 리다이렉트
    if (!isSuper) {
      alert("최고 관리자만 접근 가능한 기능입니다.");
      // 리다이렉트를 위해 `Navigate` 컴포넌트를 반환
      return <Navigate to="/admin" />;
    }

    // // Axios 인터셉터 등록
    // const axiosInterceptor = axios.interceptors.request.use((config) => {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   return config;
    // });

    // // Axios 인터셉터 해제 함수 등록
    // return () => {
    //   axios.interceptors.request.eject(axiosInterceptor);
    // };

    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 컴포넌트가 처음 마운트될 때, 관리자 리스트를 서버에서 가져오도록 useEffect 사용
  useEffect(() => {
    // 로그인한 사용자가 최고 관리자가 아닌 경우, 경고창 띄우고 '/admin' 페이지로 리다이렉트
    if (!isSuper) {
      alert("최고 관리자만 접근 가능한 기능입니다.");
      // 리다이렉트를 위해 `Navigate` 컴포넌트를 반환
      return <Navigate to="/admin" />;
    }

    // Axios를 사용하여 서버에서 관리자 리스트를 가져옴
    axios
      .get(`${api}manager/list`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // 서버 응답에서 관리자 리스트 추출하여 상태 변수에 저장
        setManagerList(response.data);
      })
      .catch((error) => {
        console.log(token);
        console.error("관리자 리스트를 불러오는데 실패했습니다.", error);
      });
  }, [isSuper]); // 컴포넌트가 처음 마운트될 때와 isSuper 값이 변경될 때 실행

  // 서버에 해당 id를 삭제하는 요청을 보내는 함수
  const handleDelete = (id) => {
    axios
      .post("/api/delete-account", { id })
      .then(() => {
        // 삭제 성공 시, 관리자 리스트에서 해당 계정 삭제
        setManagerList((prevList) =>
          prevList.filter((account) => account.id !== id)
        );
      })
      .catch((error) => {
        console.error("계정 삭제 중 오류가 발생했습니다.", error);
      });
  };

  // 새로운 계정 정보를 생성하는 함수
  const handleCreateAccount = () => {
    // 새로운 계정 정보를 서버에 보내는 요청을 보냄
    axios
      .post("http://i9b103.p.ssafy.io:8000/api/manager/regist", {
        id: newAccountId,
        password: newPassword,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // 생성된 계정 정보를 서버에서 반환하면, 관리자 리스트에 추가
        console.log(response);
        setManagerList((prevList) => [
          ...prevList,
          { id: response.data.id, date: response.data.date },
        ]);
      })
      .catch((error) => {
        console.error("계정 생성 중 오류가 발생했습니다.", error);
      });

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

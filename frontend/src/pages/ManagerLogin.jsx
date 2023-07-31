// components/Login.js

import React, { useState } from "react";
import axios from "axios";

const MangerLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(" 192.168.31.143:8080/manager/login", {
        username,
        password,
      });

      // 로그인 성공 처리
      console.log("로그인 성공:", response.data);
    } catch (error) {
      // 로그인 실패 처리
      console.error("로그인 실패:", error);
    }
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>사용자명:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default MangerLogin;

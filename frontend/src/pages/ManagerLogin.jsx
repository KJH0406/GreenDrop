import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import classes from "./ManagerLogin.module.css";

const MangerLogin = () => {
  const navigate = useNavigate();
  const [id, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:9000/manager/login", {
        id,
        password,
      });

      // 로그인 성공 처리
      console.log("로그인 성공:", response.data);
      localStorage.setItem("loggedInUser", JSON.stringify(response.data));
      navigate("/admin");
    } catch (error) {
      // 로그인 실패 처리
      alert("등록되지 않은 관리자입니다.");
    }
  };

  return (
    <div className={classes.login_container}>
      <div className={classes.login_form}>
        <h2 className={classes.login_title}>관리자 로그인</h2>
        <form onSubmit={handleLogin}>
          <div className={classes.form_group}>
            <label htmlFor="username" className={classes.form_label}>
              사용자명:
            </label>
            <input
              type="text"
              id="username"
              value={id}
              onChange={(e) => setUsername(e.target.value)}
              className={classes.form_input}
            />
          </div>
          <div className={classes.form_group}>
            <label htmlFor="password" className={classes.form_label}>
              비밀번호:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={classes.form_input}
            />
          </div>
          <button type="submit" className={classes.login_button}>
            로그인
          </button>
        </form>
      </div>
    </div>
  );
};

export default MangerLogin;

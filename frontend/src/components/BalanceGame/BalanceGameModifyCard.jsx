import { useState } from "react";
import classes from "../BalanceGame/BalanceGameModifyCard.module.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function BalanceGameModifyCard({ isModify, isConfirmed, setIsConfirmed }) {
  console.log("modify/isModify: ", isModify.flag, isModify.boardSeq);

  // const page = [{ path: "modify", name: "밸런스 게임 게시판 글 작성" }];
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("비밀번호를 입력해주세요");
  const navigate = useNavigate();

  const handleCardPassword = () => {
    const passwordJson = {
      password: password,
    };
    console.log(isModify.boardSeq);
    axios
      .post(
        "http://i9b103.p.ssafy.io:8000/board/modify/" + isModify.boardSeq,
        JSON.stringify(passwordJson),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        },
      )
      .then((response) => {
        console.log(response);
        console.log("일치", password);
        setMessage("비밀번호가 일치합니다.");

        navigate("modify", { state: { boardSeq: isModify.boardSeq } });
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 404) {
          // 400 에러가 발생한 경우
          console.error("Error 404: Bad Request");
          setMessage("비밀번호가 일치하지 않습니다.");
        } else if (error.response && error.response.status === 403) {
          console.error("비밀번호를 입력해주세요");
          setMessage("비밀번호를 입력해주세요.");
        } else if (error.response && error.response.status === 400) {
          console.error("본인 IP와 글 작성자 IP와 다릅니다");
          setMessage("본인 IP와 글 작성자 IP와 다릅니다");
        } else {
          console.error("Error sending data:", error);
          // 기타 다른 에러가 발생한 경우 처리할 작업을 추가할 수 있습니다.
        }
      });
  };

  return (
    <>
      <div className={classes.row_info}>
        <div className={classes.row_title}>작성자 확인</div>
        본인이 작성한 게시물만 수정할 수 있습니다.
      </div>

      <div className={classes.row_password_input}>
        <input
          type="password"
          className={classes.input_tag}
          placeholder="비밀번호를 입력하세요"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <div
        className={
          message !== "비밀번호가 일치합니다."
            ? `${classes.row_message} ${classes.row_error_message}`
            : `${classes.row_message} `
        }
      >
        {message}
      </div>
      {/*Link 말고 버튼태그에 onclick과 navigate 달아서 수정 페이지 이동하기 */}
      {/* 테스트는 나중에.. */}
      <button
        className={classes.confirm_btn}
        onClick={() => {
          handleCardPassword();
        }}
      >
        수정하기
      </button>
    </>
  );
}
export default BalanceGameModifyCard;

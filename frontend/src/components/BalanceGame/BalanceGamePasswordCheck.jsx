import { useState } from "react";
import classes from "../BalanceGame/BalanceGamePasswordCheck.module.css";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function BalanceGamePasswordCheck(props) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("비밀번호를 입력해주세요");
  const navigate = useNavigate();

  const handleBoardPasswordCheckModify = () => {
    const passwordJson = {
      password: password,
    };
    axios
      .post(
        "http://i9b103.p.ssafy.io:8000/api/board/modify/" + props.boardSeq,
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

        //페이지 이동을 할지 말지를 결정해야함
        navigate("modify", { state: { boardSeq: props.boardSeq } });
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
      })
      .finally(() => {
        props.setShowCheckModal("");
      });
  };

  const hadleBoardPasswordCheckDelete = () => {
    const passwordJson = {
      password: password,
    };
    axios
      .post(
        "http://i9b103.p.ssafy.io:8000/board/modify/" + props.boardSeq,
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

        props.handleBoardDelete(props.boardSeq);
        props.setShowCheckModal("");
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
          setMessage(
            "본인 IP와 글 작성자 IP와 다르거나 비밀번호가 일치하지 않습니다",
          );
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
        {props.title}
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
      {props.category === "board" && props.type === "delete" ? (
        <button
          className={classes.confirm_btn}
          onClick={() => {
            // 게시글 삭제 함수
            // 현재는 비밀번호 확인 없이 삭제함
            hadleBoardPasswordCheckDelete();
          }}
        >
          {props.action}
        </button>
      ) : props.category === "board" && props.type === "modify" ? (
        <button
          className={classes.confirm_btn}
          onClick={() => {
            handleBoardPasswordCheckModify();
          }}
        >
          {props.action}
        </button>
      ) : props.category === "comment" && props.type === "delete" ? (
        <button
          className={classes.confirm_btn}
          onClick={() => {
            // 댓글 삭제 함수
            //나중에 비밀번호 체크 비동기 통신 들어가야 함
            // handleCommentDelete();
            props.handleCommentDelete(props.commentSeq);
          }}
        >
          {props.action}
        </button>
      ) : (
        <></>
      )}
    </>
  );
}
export default BalanceGamePasswordCheck;

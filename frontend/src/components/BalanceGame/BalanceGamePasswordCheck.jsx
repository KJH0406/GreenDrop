import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "../BalanceGame/BalanceGamePasswordCheck.module.css";
function BalanceGamePasswordCheck(props) {
  const api = "https://i9b103.p.ssafy.io/api";

  //글 수정을 위한 비밀번호 체크
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleBoardPasswordCheckModify = () => {
    const passwordJson = {
      password: password,
    };
    axios
      .post(
        `${api}/board/check/${props.boardSeq}`,
        JSON.stringify(passwordJson),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        },
      )
      .then((response) => {
        setMessage("비밀번호가 일치합니다.");
        navigate("modify", { state: { boardSeq: props.boardSeq } });
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === 2
        ) {
          setMessage("비밀번호가 틀렸습니다.");
        }
      });
  };

  //글 삭제를 위한 비밀번호 체크
  const hadleBoardPasswordCheckDelete = () => {
    const passwordJson = {
      password: password,
    };
    axios
      .post(
        `${api}/board/check/${props.boardSeq}`,
        JSON.stringify(passwordJson),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        },
      )
      .then((response) => {
        setMessage("비밀번호가 일치합니다.");
        props.handleBoardDelete(props.boardSeq);
        props.setShowCheckModal("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === 2
        ) {
          setMessage("비밀번호가 틀렸습니다.");
        }
      });
  };

  //댓글 삭제를 위한 비밀번호 체크
  const hadleCommentPasswordCheckDelete = () => {
    const passwordJson = {
      password: password,
    };
    axios
      .post(
        `${api}/comment/check/${props.commentSeq}`,
        JSON.stringify(passwordJson),
        {
          headers: {
            "Content-Type": `application/json`,
          },
        },
      )
      .then((response) => {
        setMessage("비밀번호가 일치합니다.");
        props.handleCommentDelete(props.commentSeq);
        props.setShowCheckModal("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === 2
        ) {
          setMessage("비밀번호가 틀렸습니다.");
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
          inputMode="numeric"
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
      {props.category === "board" && props.type === "delete" ? (
        <button
          style={{ backgroundColor: "red" }}
          className={classes.confirm_btn}
          onClick={() => {
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
          style={{ backgroundColor: "red" }}
          className={classes.confirm_btn}
          onClick={() => {
            hadleCommentPasswordCheckDelete();
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

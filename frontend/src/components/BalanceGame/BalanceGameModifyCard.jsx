import classes from "../BalanceGame/BalanceGameModifyCard.module.css";
import { Link } from "react-router-dom";
function BalanceGameModifyCard({ isClicked, isConfirmed, setIsConfirmed }) {
  const page = [{ path: "modify", name: "밸런스 게임 게시판 글 작성" }];
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
        />
      </div>
      <div className={`${classes.row_message} ${classes.row_error_message}`}>
        비밀번호가 일치하지 않습니다.
      </div>

      <Link
        className={classes.confirm_btn}
        to={{
          pathname: page[0].path,
          search: `?boardSeq=${isClicked.boardSeq}`,
        }}
        onClick={() => {
          setIsConfirmed(true);
        }}
      >
        수정하기
      </Link>
    </>
  );
}
export default BalanceGameModifyCard;

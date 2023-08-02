import classes from "../BalanceGame/BalanceGameCommentDelete.module.css";

function BalanceGameCommentDelete() {
  return (
    <>
      <div className={classes.row_info}>
        <div className={classes.row_title}>작성자 확인</div>
        본인이 작성한 댓글만 삭제할 수 있습니다.
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
      <input
        type="button"
        className={classes.confirm_btn}
        value="삭제하기"
        onClick={() => {}}
      />
    </>
  );
}
export default BalanceGameCommentDelete;

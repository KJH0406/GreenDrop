import classes from "../BalanceGame/BalanceGameConfirm.module.css";
function BalanceGameConfirm({ isModify, setIsModify, ment }) {
  console.log("confirm/isModify: ", isModify.flag, isModify.boardSeq);

  console.log(ment);
  // ment[1](삭제)일 때만 delete 요청 보내서 삭제 성공 실패 보여주기
  return (
    <>
      <div className={classes.row_title}> {ment} 완료되었습니다.</div>
      <input
        type="button"
        value="확인"
        className={classes.confirm_btn}
        onClick={() => {
          if (isModify.flag) {
            const newModify = { flag: false, boardSeq: "" };
            setIsModify(newModify);
          }
        }}
      />
    </>
  );
}
export default BalanceGameConfirm;

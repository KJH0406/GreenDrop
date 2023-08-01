import classes from "../BalanceGame/BalanceGameConfirm.module.css";
function BalanceGameConfirm({ isClicked, setIsClicked, ment }) {
  console.log(ment);
  return (
    <>
      <div className={classes.row_title}> {ment} 완료되었습니다.</div>
      <input
        type="button"
        value="확인"
        className={classes.confirm_btn}
        onClick={() => {
          if (isClicked.flag) {
            const newModify = { flag: false, boardSeq: "" };
            setIsClicked(newModify);
          }
        }}
      />
    </>
  );
}
export default BalanceGameConfirm;

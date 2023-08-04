import classes from "../BalanceGame/BalanceGameConfirm.module.css";
function BalanceGameConfirm(props) {
  return (
    <>
      <div className={classes.row_title}> {props.confirmTitle} </div>
      <input
        type="button"
        value="확인"
        className={classes.confirm_btn}
        onClick={() => {
          props.setShowCheckModal("");
          props.setConfirmModalData("");
          props.setConfirm(false);
        }}
      />
    </>
  );
}
export default BalanceGameConfirm;

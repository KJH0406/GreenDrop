import classes from "./BalanceGameCheckModal.module.css";

import BalanceGameConfirm from "./BalanceGameConfirm";
import BalanceGamePasswordCheck from "./BalanceGamePasswordCheck";
function BalanceGameCheckModal(props) {
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        //모달 close
        props.setShowCheckModal("");
        props.setConfirmModalData("");
        props.setConfirm(false);
      }}
    >
      <div
        className={classes.check_outer_box}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.component_container}>
          {!props.confirm ? (
            <BalanceGamePasswordCheck
              boardSeq={props.boardSeq}
              commentSeq={props.commentSeq}
              title={props.title}
              category={props.category}
              type={props.type}
              action={props.action}
              setShowCheckModal={props.setShowCheckModal}
              setConfirm={props.setConfirm}
              setConfirmModalData={props.setConfirmModalData}
              handleBoardDelete={props.handleBoardDelete}
              handleCommentDelete={props.handleCommentDelete}
            />
          ) : (
            <BalanceGameConfirm
              confirmTitle={props.confirmTitle}
              confirmCategory={props.confirmCategory}
              confirmType={props.confirmType}
              confirmAction={props.confirmAction}
              setShowCheckModal={props.setShowCheckModal}
              setConfirmModalData={props.setConfirmModalData}
              setConfirm={props.setConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default BalanceGameCheckModal;

import classes from "./BalanceGameCheckModal.module.css";
import BalanceGameModifyCard from "./BalanceGameModifyCard";
import BalanceGameConfirm from "./BalanceGameConfirm";
import BalanceGameCommentDelete from "./BalanceGameCommentDelete";
import closeImg from "../../assets/close_green.png";

import { useState } from "react";
function BalanceGameCheckModal({ isModify, setIsModify }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ment] = useState(["삭제가", "수정이"]);
  console.log("보드 시퀀스", isModify.boardSeq);
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        if (isModify.flag) {
          const newModify = { flag: false, boardSeq: "" };
          setIsModify(newModify);
        }
      }}
    >
      <div
        className={classes.check_outer_box}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={classes.row_close}>
          <img
            className={classes.close_img}
            src={closeImg}
            alt=""
            onClick={() => {
              const newModify = { flag: false, boardSeq: "" };
              setIsModify(newModify);
            }}
          />
        </div>
        <div className={classes.component_container}>
          {!isModify.flag && !isModify.boardSeq && !isConfirmed ? (
            <BalanceGameCommentDelete setIsConfirmed={setIsConfirmed} />
          ) : !isModify.flag && !isModify.boardSeq && isConfirmed ? (
            <BalanceGameConfirm
              isModify={isModify}
              setIsModify={setIsModify}
              ment={ment[0]}
            />
          ) : !isModify.flag && isModify.boardSeq ? (
            <BalanceGameConfirm
              isModify={isModify}
              setIsModify={setIsModify}
              ment={ment[1]}
            />
          ) : isModify.boardSeq ? (
            <BalanceGameModifyCard
              isModify={isModify}
              setIsModify={setIsModify}
              isConfirmed={isConfirmed}
              setIsConfirmed={setIsConfirmed}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default BalanceGameCheckModal;

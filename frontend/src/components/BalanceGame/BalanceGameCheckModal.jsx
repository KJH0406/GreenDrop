import classes from "./BalanceGameCheckModal.module.css";
import BalanceGameModifyCard from "./BalanceGameModifyCard";
import BalanceGameConfirm from "./BalanceGameConfirm";
import BalanceGameCommentDelete from "./BalanceGameCommentDelete";
import closeImg from "../../assets/close_green.png";

import { useState } from "react";
function BalanceGameCheckModal({ isClicked, setIsClicked }) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [ment] = useState(["삭제가", "수정이"]);
  console.log("보드 시퀀스", isClicked.boardSeq);
  return (
    <div
      className={classes.backdrop}
      onClick={() => {
        if (isClicked.flag) {
          const newModify = { flag: false, boardSeq: "" };
          setIsClicked(newModify);
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
              setIsClicked(newModify);
            }}
          />
        </div>
        <div className={classes.component_container}>
          {!isClicked.boardSeq && !isConfirmed ? (
            <BalanceGameCommentDelete setIsConfirmed={setIsConfirmed} />
          ) : !isClicked.boardSeq && isConfirmed ? (
            <BalanceGameConfirm
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              ment={ment[0]}
            />
          ) : isClicked.boardSeq ? (
            <BalanceGameModifyCard
              isClicked={isClicked}
              setIsClicked={setIsClicked}
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

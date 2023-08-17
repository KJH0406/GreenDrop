import classes from "./BalanceGameCardSidebarList.module.css";

function BalanceGameCardSidebarList(props) {
  return (
    <div className={classes.card_sidebar}>
      <div
        className={classes.sidbar_item}
        onClick={() => {
          props.setShowCheckModal({
            boardSeq: props.boardSeq,
            title: "본인이 작성한 게시글만 수정할 수 있습니다.",
            category: "board",
            type: "modify",
            action: "수정하기",
          });
        }}
      >
        수정
      </div>
      <div
        className={classes.sidbar_item}
        onClick={() => {
          props.setShowCheckModal({
            boardSeq: props.boardSeq,
            title: "본인이 작성한 게시글만 삭제할 수 있습니다.",
            category: "board",
            type: "delete",
            action: "삭제하기",
          });
          console.log(props.boardSeq);
        }}
      >
        삭제
      </div>
    </div>
  );
}
export default BalanceGameCardSidebarList;

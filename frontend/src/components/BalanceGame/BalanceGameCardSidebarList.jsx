import classes from "./BalanceGameCardSidebarList.module.css";
function BalanceGameCardSidebarList({ boardSeq, setIsModify, setIsConfirmed }) {
  // const page = [{ path: "modify", name: "밸런스 게임 게시판 글 작성" }];
  console.log(boardSeq);
  return (
    <div className={classes.card_sidebar}>
      <div
        className={classes.sidbar_item}
        onClick={() => {
          const newModify = { flag: true, boardSeq: boardSeq };
          setIsModify(newModify);
        }}
      >
        수정
      </div>
      <div
        className={classes.sidbar_item}
        onClick={() => {
          const deleteBoard = { flag: false, boardSeq: boardSeq };
          setIsModify(deleteBoard);
        }}
      >
        삭제
      </div>
    </div>
  );
}
export default BalanceGameCardSidebarList;

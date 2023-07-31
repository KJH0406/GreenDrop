import classes from "./BalanceGameCardSidebarList.module.css"
import { Link } from "react-router-dom"
function BalanceGameCardSidebarList({ boardSeq }) {
  const page = [{ path: "modify", name: "밸런스 게임 게시판 글 작성" }]
  console.log(boardSeq)
  return (
    <div className={classes.card_sidebar}>
      <Link
        className={`${classes.sidbar_item} ${classes.modify_link}`}
        to={{ pathname: page[0].path, search: `?boardSeq=${boardSeq}` }}
      >
        수정
      </Link>
      <div className={classes.sidbar_item}>삭제</div>
    </div>
  )
}
export default BalanceGameCardSidebarList

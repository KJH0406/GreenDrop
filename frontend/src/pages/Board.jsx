import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import search from "../assets/search.png"
import star from "../assets/star.png"
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList"
import BalanceGameCommentModal from "../components/BalanceGame/BalanceGameCommentModal"
import BalanceGameList from "../components/BalanceGame/BalanceGameList"
import classes from "./Board.module.css"
function BoardPage() {
  const page = [{ path: "write", name: "밸런스 게임 게시판 글 작성" }]
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment
  })

  return (
    <div className={classes.container}>
      {isOpenComment.isOpenComment ? <BalanceGameCommentModal /> : <></>}
      <div className={classes.outer_box}>
        {/* <h1>Green Balance Game</h1> */}
        <div className={classes.title}>
          <h2>Green &nbsp;</h2>
          <h2 className={classes.second_word}>Balance Game</h2>
        </div>
        <div className={classes.row} id={classes.search}>
          <span className={classes.search_area}>
            <input type="text" className={classes.search_input} />
            <input
              type="image"
              src={search}
              alt="search"
              className={classes.search_btn}
              onClick={() => {}}
            />
          </span>
        </div>
        <div className={classes.row}>
          <Link className={classes.regist_btn} to={page[0].path}>
            밸런스 게임 등록하기
          </Link>
        </div>
        <div className={classes.category_row}>
          <div className={classes.left_align}>
            추천 카테고리 <img src={star} alt="star"></img>
          </div>

          <BalanceGameCategoryList />
        </div>
        {/* 글 리스트만 컴포넌트로  */}
        {/* 검색시 게임 리스트 state만 바꿔주면 아랑서 화면 출력될 듯(다시 전체 글로는 어떻게 돌아가지?) */}
        <BalanceGameList />
      </div>
    </div>
  )
}

export default BoardPage

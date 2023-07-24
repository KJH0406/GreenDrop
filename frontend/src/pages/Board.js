import classes from "./Board.module.css"
import BalanceGameList from "../components//BalanceGame/BalanceGameList"
function BoardPage() {
  return (
    <div className={classes.outer_box}>
      <h1>Green Balance Game</h1>
      <div className={classes.row} id={classes.search}>
        <input type="text" className="" />
        <button>검색</button>
      </div>
      <div className={classes.row}>
        <button>밸런스 게임 등록하기</button>
      </div>
      <div className={classes.row}>
        <div className={classes.left_align}>추천 카테고리</div>
        <div className={classes.recommend}>
          스포츠 인기순스포츠 인기순스포츠 인기순스포츠 인기순스포츠
          인기순스포츠 인기순스포츠 인기순스포츠 인기순스포츠 인기순스포츠
          인기순스포츠 인기순스포츠 인기순스포츠 인기순
        </div>
      </div>
      {/* 글 리스트만 컴포넌트로  */}
      {/* 검색시 게임 리스트 state만 바꿔주면 아랑서 화면 출력될 듯(다시 전체 글로는 어떻게 돌아가지?) */}
      <BalanceGameList />
    </div>
  )
}

export default BoardPage

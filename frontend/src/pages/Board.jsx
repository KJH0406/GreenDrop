import classes from "./Board.module.css";
import BalanceGameList from "../components/BalanceGame/BalanceGameList";
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList";
import search from "../assets/search.png";
import star from "../assets/star.png";
function BoardPage() {
  return (
    <div className={classes.outer_box}>
      {/* <h1>Green Balance Game</h1> */}
      <div className={classes.title}>
        <h2 className={classes.first_word}>Green</h2>
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
        <button className={classes.regist_btn}>밸런스 게임 등록하기</button>
      </div>
      <div className={classes.row}>
        <div className={classes.left_align}>
          추천 카테고리 <img src={star} alt="star"></img>
        </div>
        <BalanceGameCategoryList />
      </div>
      {/* 글 리스트만 컴포넌트로  */}
      {/* 검색시 게임 리스트 state만 바꿔주면 아랑서 화면 출력될 듯(다시 전체 글로는 어떻게 돌아가지?) */}
      <BalanceGameList />
    </div>
  );
}

export default BoardPage;

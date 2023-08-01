import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import search from "../assets/search.png";
import star from "../assets/star.png";
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList";
import BalanceGameCommentModal from "../components/BalanceGame/BalanceGameCommentModal";
import BalanceGameList from "../components/BalanceGame/BalanceGameList";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import classes from "./Board.module.css";
function BoardPage() {
  const page = [{ path: "write", name: "밸런스 게임 게시판 글 작성" }];
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });
  const cardList = useSelector((state) => {
    return state.balanceGameList;
  });
  const sidebarArr = new Array(cardList.length);
  sidebarArr.fill(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarArr);
  const [isClicked, setIsClicked] = useState({ flag: false, boardSeq: "" });
  console.log(isClicked);
  return (
    <div
      className={classes.container}
      onClick={() => {
        if (isSidebarOpen) {
          setIsSidebarOpen(sidebarArr);
        }
      }}
    >
      {isClicked.flag ? (
        <BalanceGameCheckModal
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      ) : (
        <></>
      )}
      {isOpenComment.isOpenComment ? (
        <BalanceGameCommentModal
          boardSeq={isOpenComment.boardSeq}
          isClicked={isClicked}
        />
      ) : (
        <></>
      )}
      <div className={classes.outer_box}>
        {/* <h1>Green Balance Game</h1> */}
        <Link className={classes.title} to={"/board"}>
          <h2>Green &nbsp;</h2>
          <h2 className={classes.second_word}>Balance Game</h2>
        </Link>
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
        <BalanceGameList
          cardList={cardList}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          isClicked={isClicked}
          setIsClicked={setIsClicked}
        />
      </div>
    </div>
  );
}

export default BoardPage;

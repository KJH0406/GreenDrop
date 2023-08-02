import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import search from "../assets/search.png";
import star from "../assets/star.png";
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import BalanceGameCommentModal from "../components/BalanceGame/BalanceGameCommentModal";
import BalanceGameList from "../components/BalanceGame/BalanceGameList";
import { getBoardList, searchBoard } from "../store";
import classes from "./Board.module.css";
import axios from "axios";

function BoardPage() {
  const dispatch = useDispatch();
  const page = [{ path: "write", name: "밸런스 게임 게시판 글 작성" }];
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });

  useEffect(() => {
    axios
      .get("http://i9b103.p.ssafy.io:8000/board/list?page=2")
      .then((response) => {
        // console.log("응답", response);
        const fetchedCardList = [...response.data.content];
        // console.log("패치 된 카드 리스트", fetchedCardList);
        dispatch(getBoardList(fetchedCardList));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch]); // Call the API only once when the component mounts
  const cardList = useSelector((state) => state.balanceGameList); // Get cardList from the Redux store
  const [searchWord, setSearchWord] = useState("");
  // console.log("스토어에서 받아온 데이터", cardList);

  const sidebarArr = new Array(cardList.length);
  sidebarArr.fill(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarArr);
  const [isModify, setIsModify] = useState({ flag: false, boardSeq: "" });
  return (
    <div
      className={classes.container}
      onClick={() => {
        if (isSidebarOpen) {
          setIsSidebarOpen(sidebarArr);
        }
      }}
    >
      {isModify.flag ? (
        <BalanceGameCheckModal isModify={isModify} setIsModify={setIsModify} />
      ) : (
        <></>
      )}
      {isOpenComment.isOpenComment ? (
        <BalanceGameCommentModal boardSeq={isOpenComment.boardSeq} />
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
            <input
              type="text"
              className={classes.search_input}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
            <img
              src={search}
              alt="search"
              className={classes.search_btn}
              onClick={() => {
                axios
                  .get(
                    "http://i9b103.p.ssafy.io:8000/board/search?question=" +
                      searchWord,
                  )
                  .then((response) => {
                    // console.log(response);
                    const fetchedData = [...response.data.content];
                    dispatch(searchBoard(fetchedData));
                  });
              }}
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
          isModify={isModify}
          setIsModify={setIsModify}
        />
      </div>
    </div>
  );
}

export default BoardPage;

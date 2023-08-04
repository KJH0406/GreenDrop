import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import search from "../assets/search.png";
import star from "../assets/star.png";
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import axios from "axios";
import BalanceGameCommentModal from "../components/BalanceGame/BalanceGameCommentModal";
import BalanceGameList from "../components/BalanceGame/BalanceGameList";
import { getBoardList, getCategoryList, searchBoard } from "../store";
import classes from "./Board.module.css";

function BoardPage() {
  const dispatch = useDispatch();
  const page = [{ path: "write", name: "밸런스 게임 게시판 글 작성" }];

  const [showCheckModal, setShowCheckModal] = useState("");
  const [confirmModalData, setConfirmModalData] = useState("");
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });
  const [update, setUpdate] = useState(0);

  useEffect(() => {
    axios
      .get("http://i9b103.p.ssafy.io:8000/api/board/list?page=1")
      .then((response) => {
        // console.log("응답", response);
        const fetchedCardList = [...response.data.content];
        // console.log("패치 된 카드 리스트", fetchedCardList);
        dispatch(getBoardList(fetchedCardList));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch, update]); // Call the API only once when the component mounts

  useEffect(() => {
    axios
      .get("http://i9b103.p.ssafy.io:8000/api/category/list")
      .then((response) => {
        console.log(response.data);
        const fetchedCategories = [...response.data];
        dispatch(getCategoryList(fetchedCategories));
      });
  }, [dispatch]);

  const cardList = useSelector((state) => state.balanceGameList); // Get cardList from the Redux store
  const [searchWord, setSearchWord] = useState("");
  // console.log("스토어에서 받아온 데이터", cardList);
  const [confirm, setConfirm] = useState(false);
  const sidebarArr = new Array(cardList.length);

  sidebarArr.fill(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarArr);
  const [selectedBoardSeq, setSelectedBoardSeq] = useState("");

  const categories = useSelector((state) => {
    return state.categories;
  });

  function handleBoardDelete(boardNo) {
    axios
      .patch("http://i9b103.p.ssafy.io:8000/api/board/delete/" + boardNo)
      .then(() => {
        setUpdate(update + 1);
      })
      .catch((error) => {
        console.error("글 삭제 실패");
        setConfirm(true);
        // setShowCheckModal이거를 null이 아니게 바꿔줘야함
        setShowCheckModal(true);

        setConfirmModalData({
          confirmTitle: "글 삭제 실패",
          confirmCategory: "board",
          confirmType: "delete",
          confirmAction: "실패",
        });
      });
  }

  function handleCommentDelete(commentNum) {
    axios
      .patch("http://i9b103.p.ssafy.io:8000/api/comment/delete/" + commentNum)
      .then(() => {
        setUpdate(update + 1);
      })
      .catch((error) => {
        console.error("댓글 삭제 실패");
        // setConfirm(true);

        setShowCheckModal({
          title: "댓글 삭제 실패",
          category: "comment",
          type: "delete",
          action: "실패",
        });
      });
  }

  function handleBoardSearch() {
    axios
      .get(
        "http://i9b103.p.ssafy.io:8000/api/board/search?question=" + searchWord,
      )
      .then((response) => {
        // console.log(response);
        const fetchedData = [...response.data.content];
        dispatch(searchBoard(fetchedData));
      });
  }
  function handleLikeCount(boardNo) {
    axios
      .patch("http://i9b103.p.ssafy.io:8000/api/board/like/" + boardNo)
      .then(() => {
        console.log("좋아요");
        setUpdate(update + 1);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function selectedCategory(category) {
    axios
      .get(
        "http://i9b103.p.ssafy.io:8000/api/board/select?category=" + category,
      )
      .then((response) => {
        const fetchedCardList = [...response.data.content];
        // console.log("패치 된 카드 리스트", fetchedCardList);
        dispatch(getBoardList(fetchedCardList));
      })
      .catch((error) => {
        console.error(error);
      });
  }
  const categoryArr = new Array(categories.length);
  categoryArr.fill(false);
  const [isCategorySelected, setIsCategorySelected] = useState(categoryArr);

  return (
    <div
      className={classes.container}
      onClick={() => {
        if (isSidebarOpen) {
          setIsSidebarOpen(sidebarArr);
        }
      }}
    >
      {/* 게시판에서 체크 모달 띄우는 위치 */}
      {showCheckModal ? (
        <BalanceGameCheckModal
          boardSeq={showCheckModal.boardSeq}
          commentSeq={showCheckModal.commentSeq}
          title={showCheckModal.title}
          category={showCheckModal.category}
          type={showCheckModal.type}
          action={showCheckModal.action}
          setShowCheckModal={setShowCheckModal}
          confirmTitle={confirmModalData.confirmTitle}
          confirmCategory={confirmModalData.confirmCategory}
          confirmType={confirmModalData.confirmType}
          confirmAction={confirmModalData.confirmAction}
          setConfirmModalData={setConfirmModalData}
          confirm={confirm}
          setConfirm={setConfirm}
          handleBoardDelete={handleBoardDelete}
          handleCommentDelete={handleCommentDelete}
        />
      ) : (
        <></>
      )}
      {isOpenComment.isOpenComment ? (
        <BalanceGameCommentModal
          boardSeq={selectedBoardSeq}
          setShowCheckModal={setShowCheckModal}
          setConfirm={setConfirm}
          setConfirmModalData={setConfirmModalData}
          update={update}
          setUpdate={setUpdate}
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
                setIsCategorySelected(categoryArr);
                handleBoardSearch();

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

          <BalanceGameCategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            isCategorySelected={isCategorySelected}
            setIsCategorySelected={setIsCategorySelected}
          />
        </div>
        {/* 글 리스트만 컴포넌트로  */}
        {/* 검색시 게임 리스트 state만 바꿔주면 아랑서 화면 출력될 듯(다시 전체 글로는 어떻게 돌아가지?) */}
        <BalanceGameList
          setSelectedBoardSeq={setSelectedBoardSeq}
          cardList={cardList}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          setShowCheckModal={setShowCheckModal}
          handleLikeCount={handleLikeCount}
        />
      </div>
    </div>
  );
}

export default BoardPage;

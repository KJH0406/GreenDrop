import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import search from "../assets/search.png";
import star from "../assets/star.png";
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import axios from "axios";
import BalanceGameCommentModal from "../components/BalanceGame/BalanceGameCommentModal";
import BalanceGameList from "../components/BalanceGame/BalanceGameList";
import { getBoardList, getCategoryList, searchBoard } from "../store";
import classes from "./Board.module.css";

import deviceImg from "../assets/device (1).png";

// 지난 결과
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function BoardPage() {
  // 지난 밸런스 게임 결과
  const [pastResult, setPastResult] = useState([]);

  // 슬라이드
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    touchThreshold: 1000,
    arrows: false,
  };

  useEffect(() => {
    axios
      .get("https://i9b103.p.ssafy.io/api/game/list")
      .then((response) => {
        // console.log(response.data);
        setPastResult(response.data);
        // console.log(pastResult);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  console.log(pastResult);

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
      .get("https://i9b103.p.ssafy.io/api/board/list")
      .then((response) => {
        // console.log("응답", response);
        const fetchedCardList = [...response.data];
        // console.log("패치 된 카드 리스트", fetchedCardList);
        dispatch(getBoardList(fetchedCardList));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch, update]); // Call the API only once when the component mounts

  useEffect(() => {
    axios

      .get("https://i9b103.p.ssafy.io/api/category/list")
      .then((response) => {
        // console.log(...response.data);
        const fetchedCategories = [...response.data];
        dispatch(getCategoryList(fetchedCategories));
      });
  }, [dispatch]);

  const cardList = useSelector((state) => state.balanceGameList); // Get cardList from the Redux store
  // const [searchWord, setSearchWord] = useState("");
  // console.log("스토어에서 받아온 데이터", cardList);
  const [confirm, setConfirm] = useState(false);
  const sidebarArr = new Array(cardList.length);

  sidebarArr.fill(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarArr);
  const [selectedBoardSeq, setSelectedBoardSeq] = useState("");

  const [selectedCategoryItem, setSelectedCategoryItem] = useState("");

  const categories = useSelector((state) => {
    return state.categories;
  });

  function handleBoardDelete(boardNo) {
    axios
      .patch("https://i9b103.p.ssafy.io/api/board/delete/" + boardNo)
      .then(() => {
        getOrderedBoardList();
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
  const [commentUpdate, setCommentUpdate] = useState(0);

  function handleCommentDelete(commentNum) {
    axios
      .patch("https://i9b103.p.ssafy.io/api/comment/delete/" + commentNum)
      .then(() => {
        setCommentUpdate(commentUpdate + 1);
        getOrderedBoardList();
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
  // 검색 함수
  // function handleBoardSearch() {
  //   axios

  //     .get("https://i9b103.p.ssafy.io/api/board/search?question=" + searchWord)
  //     .then((response) => {
  //       // console.log(response);
  //       const fetchedData = [...response.data];
  //       dispatch(searchBoard(fetchedData));
  //     });
  // }

  // 검색시 엔터로 검색 가능하게 하던 함수
  // const handleOnKey = (e) => {
  //   if (e.key === "Enter") {
  //     handleBoardSearch(); // Enter 입력이 되면 클릭 이벤트 실행
  //   }
  // };

  function handleLikeCount(boardNo) {
    axios
      .patch("https://i9b103.p.ssafy.io/api/board/like/" + boardNo)
      .then(() => {
        // console.log("좋아요");
        getOrderedBoardList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function getOrderedBoardList() {
    if (selectedCategoryItem) {
      axios
        .get(
          "https://i9b103.p.ssafy.io/api/board/select?category=" +
            selectedCategoryItem
        )
        .then((response) => {
          const fetchedCardList = [...response.data];
          // console.log("패치 된 카드 리스트", fetchedCardList);
          dispatch(getBoardList(fetchedCardList));
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (isLikeSelected) {
      axios
        .get("https://i9b103.p.ssafy.io/api/board/like/list")
        .then((response) => {
          const fetchedData = [...response.data];
          dispatch(searchBoard(fetchedData));
          // console.log(fetchedData);
        });
    } else {
      setUpdate(update + 1);
    }
  }

  const categoryArr = new Array(categories.length);
  categoryArr.fill(false);
  const [isCategorySelected, setIsCategorySelected] = useState(categoryArr);

  function selectedCategory(category, isSelected) {
    if (!isSelected) {
      setSelectedCategoryItem(category);
      axios
        .get("https://i9b103.p.ssafy.io/api/board/select?category=" + category)
        .then((response) => {
          const fetchedCardList = [...response.data];
          // console.log("패치 된 카드 리스트", fetchedCardList);
          dispatch(getBoardList(fetchedCardList));
          // console.log(fetchedCardList);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUpdate(update + 1);
      setSelectedCategoryItem(null);
    }
  }

  const [isLikeSelected, setIsLikeSelected] = useState(false);
  function likeList(isLikeList) {
    if (isLikeList) {
      axios
        .get("https://i9b103.p.ssafy.io/api/board/like/list")
        .then((response) => {
          const fetchedCardList = [...response.data];
          dispatch(searchBoard(fetchedCardList));
          // console.log(fetchedCardList);
        });
    } else {
      setUpdate(update + 1);
    }
  }

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
          getOrderedBoardList={getOrderedBoardList}
          selectedCategoryItem={selectedCategoryItem}
          isLikeSelected={isLikeSelected}
          commentUpdate={commentUpdate}
          setCommentUpdate={setCommentUpdate}
        />
      ) : (
        <></>
      )}
      <div className={classes.outer_box}>
        {/* <h1>Green Balance Game</h1> */}
        <Link className={classes.title} to={"/board"}>
          <h2 className={classes.second_word}>
            <img
              className={classes.second_word_img}
              src={deviceImg}
              alt=""
            ></img>
            밸런스 게임
          </h2>
        </Link>
        <h3 className={classes.past_results_title}>
          지난 밸런스 게임 결과!
          <br />{" "}
          <span style={{ fontSize: "0.8rem", color: "salmon" }}>
            옆으로 넘겨보세요! 👉
          </span>
        </h3>
        <Slider {...settings} className={classes.slider}>
          {pastResult.map((result, idx) => (
            <div key={idx}>
              <div key={idx} className={classes.past_results}>
                <div className={classes.past_results_slide}>
                  <h4 className={classes.past_results_question}>
                    {result.question}
                  </h4>
                  <div className={classes.past_results_box}>
                    <div
                      style={{ backgroundColor: "#02b2a7" }}
                      className={classes.past_results_box_item}
                    >
                      {parseInt(result.leftCount) >
                      parseInt(result.rightCount) ? (
                        <div className={classes.result_king}></div>
                      ) : parseInt(result.leftCount) ===
                        parseInt(result.rightCount) ? (
                        <div className={classes.result_tie}></div>
                      ) : (
                        <div className={classes.result_nan}></div>
                      )}
                      <div className={classes.past_results_box_answer}>
                        {result.leftAnswer}
                      </div>
                      <div className={classes.past_results_box_bottom}>
                        <div className={classes.past_results_box_percent}>
                        {parseInt(result.leftCount) + parseInt(result.rightCount) !== 0
                            ? ((parseInt(result.leftCount) /
                                (parseInt(result.leftCount) +
                                  parseInt(result.rightCount))) *
                              100).toFixed(1)
                            : 0}%
                        </div>
                        <div className={classes.past_results_box_count}>
                          {result.leftCount}표
                        </div>
                      </div>
                    </div>
                    <div
                      style={{ backgroundColor: "#fe2f73" }}
                      className={classes.past_results_box_item}
                    >
                      {parseInt(result.leftCount) <
                      parseInt(result.rightCount) ? (
                        <div className={classes.result_king}></div>
                      ) : parseInt(result.leftCount) ===
                        parseInt(result.rightCount) ? (
                        <div className={classes.result_tie}></div>
                      ) : (
                        <div className={classes.result_nan}></div>
                      )}
                      <div className={classes.past_results_box_answer}>
                        {result.rightAnswer}
                      </div>
                      <div className={classes.past_results_box_bottom}>
                        <div className={classes.past_results_box_percent}>
                          {parseInt(result.leftCount) + parseInt(result.rightCount) !==
                          0
                            ? ((parseInt(result.rightCount) /
                                (parseInt(result.leftCount) +
                                  parseInt(result.rightCount))) *
                              100).toFixed(1)
                            : 0}%
                        </div>
                        <div className={classes.past_results_box_count}>
                          {result.rightCount}표
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

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
            setIsLikeSelected={setIsLikeSelected}
            setSelectedCategoryItem={setSelectedCategoryItem}
            isLikeSelected={isLikeSelected}
            likeList={likeList}
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

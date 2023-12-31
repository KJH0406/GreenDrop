import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import star from "../assets/star.png";
import BalanceGameCategoryList from "../components/BalanceGame/BalanceGameCategoryList";
import BalanceGameCheckModal from "../components/BalanceGame/BalanceGameCheckModal";
import BalanceGameCommentModal from "../components/BalanceGame/BalanceGameCommentModal";
import BalanceGameList from "../components/BalanceGame/BalanceGameList";
import { getBoardList, getCategoryList, searchBoard } from "../store";
import classes from "./Board.module.css";

import deviceImg from "../assets/device (1).png";

// 지난 결과
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Arrow from "../assets/arrow.gif";

function BoardPage() {
  const api = "https://i9b103.p.ssafy.io/api";
  const page = [{ path: "write", name: "밸런스 게임 게시판 글 작성" }];

  //게시글 리스트
  const cardList = useSelector((state) => state.balanceGameList);
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(true);

  useEffect(() => {
    axios
      .get(`${api}/board/list`)
      .then((response) => {
        const fetchedCardList = [...response.data];
        dispatch(getBoardList(fetchedCardList));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [dispatch, update]);

  //카테고리 리스트
  const categories = useSelector((state) => {
    return state.categories;
  });
  const categoryArr = new Array(categories.length);
  categoryArr.fill(false);
  const [isCategorySelected, setIsCategorySelected] = useState(categoryArr);

  useEffect(() => {
    axios.get(`${api}/category/list`).then((response) => {
      const fetchedCategories = [...response.data];
      dispatch(getCategoryList(fetchedCategories));
    });
  }, [dispatch]);

  //작성자 확인 모달
  const [showCheckModal, setShowCheckModal] = useState("");
  const [confirmModalData, setConfirmModalData] = useState("");
  const [confirm, setConfirm] = useState(false);

  //댓글 모달
  const [selectedBoardSeq, setSelectedBoardSeq] = useState("");
  const isOpenComment = useSelector((state) => {
    return state.isOpenComment;
  });

  //사이드바 모달
  const sidebarArr = new Array(cardList.length);
  sidebarArr.fill(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarArr);

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

  // downImg
  const resultRef = useRef();

  useEffect(() => {
    axios
      .get(`${api}/game/list`)
      .then((response) => {
        setPastResult(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //글 삭제
  function handleBoardDelete(boardNo) {
    axios
      .patch(`${api}/board/delete/${boardNo}`)
      .then(() => {
        getOrderedBoardList();
      })
      .catch((error) => {
        console.error("글 삭제 실패");
        setConfirm(true);
        setShowCheckModal(true);
        setConfirmModalData({
          confirmTitle: "글 삭제 실패",
          confirmCategory: "board",
          confirmType: "delete",
          confirmAction: "실패",
        });
      });
  }

  //댓글 삭제
  const [commentUpdate, setCommentUpdate] = useState(true);

  function handleCommentDelete(commentNum) {
    axios
      .patch(`${api}/comment/delete/${commentNum}`)
      .then(() => {
        setCommentUpdate(!commentUpdate);
        getOrderedBoardList();
      })
      .catch((error) => {
        console.error("댓글 삭제 실패");
        setShowCheckModal({
          title: "댓글 삭제 실패",
          category: "comment",
          type: "delete",
          action: "실패",
        });
      });
  }

  //좋아요 누를 시 기존 글 정렬 방식대로 정렬
  function handleLikeCount(boardNo) {
    axios
      .patch(`${api}/board/like/${boardNo}`)
      .then(() => {
        getOrderedBoardList();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  //기존 정렬 방식 유지
  const [selectedCategoryItem, setSelectedCategoryItem] = useState("");

  function getOrderedBoardList() {
    if (selectedCategoryItem) {
      axios
        .get(`${api}/board/select?category=${selectedCategoryItem}`)
        .then((response) => {
          const fetchedCardList = [...response.data];
          dispatch(getBoardList(fetchedCardList));
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (isLikeSelected) {
      axios.get(`${api}/board/like/list`).then((response) => {
        const fetchedData = [...response.data];
        dispatch(searchBoard(fetchedData));
      });
    } else {
      setUpdate(!update);
    }
  }

  //카테고리 글 정렬
  function selectedCategory(category, isSelected) {
    if (!isSelected) {
      setSelectedCategoryItem(category);
      axios
        .get(`${api}/board/select?category=${category}`)
        .then((response) => {
          const fetchedCardList = [...response.data];
          dispatch(getBoardList(fetchedCardList));
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setUpdate(!update);
      setSelectedCategoryItem(null);
    }
  }

  //좋아요 순 글 정렬
  const [isLikeSelected, setIsLikeSelected] = useState(false);

  function likeList(isLikeList) {
    if (isLikeList) {
      axios.get(`${api}/board/like/list`).then((response) => {
        const fetchedCardList = [...response.data];
        dispatch(searchBoard(fetchedCardList));
      });
    } else {
      setUpdate(!update);
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
          commentUpdate={commentUpdate}
          setCommentUpdate={setCommentUpdate}
        />
      ) : (
        <></>
      )}
      <div className={classes.outer_box}>
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
          <img src={star} alt="star"></img> 지난 밸런스 게임 결과!{" "}
          <img src={star} alt="star"></img>
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
                          {parseInt(result.leftCount) +
                            parseInt(result.rightCount) !==
                          0
                            ? (
                                (parseInt(result.leftCount) /
                                  (parseInt(result.leftCount) +
                                    parseInt(result.rightCount))) *
                                100
                              ).toFixed(1)
                            : 0}
                          %
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
                          {parseInt(result.leftCount) +
                            parseInt(result.rightCount) !==
                          0
                            ? (
                                (parseInt(result.rightCount) /
                                  (parseInt(result.leftCount) +
                                    parseInt(result.rightCount))) *
                                100
                              ).toFixed(1)
                            : 0}
                          %
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
        <img
          onClick={() => {
            resultRef.current.scrollIntoView({ behavior: "smooth" });
          }}
          className={classes.down_img}
          src={Arrow}
          alt=""
        />

        <div className={classes.category_row}>
          <div className={classes.left_align} ref={resultRef}>
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
        <div className={classes.row}>
          <Link className={classes.regist_btn} to={page[0].path}>
            밸런스 게임 등록하기
          </Link>
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
